import { SITE } from '@/site.config'

/**
 * Submits a lead straight from the browser to the Align and Acquire CRM.
 *
 * WHY DIRECT, NOT VIA A SERVER ROUTE: the CRM sets `Access-Control-Allow-Origin: *`
 * and answers preflight, so a cross-origin POST works. Going direct also sidesteps
 * the failure that motivated the server-side pattern on the other client sites —
 * on Vercel a function freezes once it returns, so an un-awaited forward gets
 * killed in flight. The browser owns this request, so it cannot be frozen by us.
 *
 * The two protections from that proven server-side pattern are ported here:
 *
 *   1. A 200 IS NOT SUCCESS. The CRM answers 200 even for a submission it cannot
 *      attribute to a tenant. We require `"success":true` in the response body
 *      before telling the customer their message went through. Reporting a lost
 *      lead as sent is the single worst outcome this file can produce.
 *   2. RETRY, but only what a retry can fix — network throws and 5xx. A 4xx means
 *      the payload is wrong and will fail identically forever; a 200 without
 *      success:true is deterministic too. Retrying either just delays the error
 *      the customer needs to see.
 */

const CRM_ENDPOINT = 'https://www.alignandacquire.com/api/contact'
const MAX_ATTEMPTS = 3
/** Waits between attempts. Length must be MAX_ATTEMPTS - 1. */
const RETRY_DELAYS_MS = [400, 1000]
/** Per-attempt ceiling, so three hung attempts do not leave the button spinning. */
const ATTEMPT_TIMEOUT_MS = 8000

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'rejected' | 'network' }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export type EstimatePayload = {
  name: string
  phone: string
  email?: string
  /** Service label is already prepended by the caller. */
  message: string
  smsConsent: boolean
  honeypot: string
  honeypotField: string
}

export async function submitEstimate(payload: EstimatePayload): Promise<SubmitResult> {
  /**
   * HARD STOP when the CRM tenant slug is not configured.
   *
   * Without it the CRM has no business to attach the lead to: it returns 404, the
   * lead is never stored, and it fires its internal dropped-lead alert. Posting
   * anyway and showing a success screen would lose the customer silently, which is
   * exactly the failure mode this whole file exists to prevent. Better to fail
   * loudly and put the phone number in front of them.
   */
  if (!SITE.businessSlug) {
    console.error(
      '[estimate] SITE.businessSlug is empty — refusing to submit. Create the Business row in the Align and Acquire CRM and set the slug in site.config.ts.',
    )
    return { ok: false, reason: 'not-configured' }
  }

  const body = JSON.stringify({
    businessSlug: SITE.businessSlug,
    name: payload.name,
    phone: payload.phone,
    email: payload.email || undefined,
    message: payload.message,
    smsConsent: payload.smsConsent,
    [payload.honeypotField]: payload.honeypot,
  })

  let lastWasRetryable = false

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      })

      const text = await res.text().catch(() => '')

      // A 200 alone is not proof the lead landed — see the header comment.
      if (res.ok && text.includes('"success":true')) return { ok: true }

      lastWasRetryable = res.status >= 500
      console.error(`[estimate] attempt ${attempt}/${MAX_ATTEMPTS} not accepted`, {
        status: res.status,
        retryable: lastWasRetryable,
        body: text.slice(0, 300),
      })
    } catch (err) {
      // Includes the AbortSignal timeout, which we want treated as a network fault.
      lastWasRetryable = true
      console.error(`[estimate] attempt ${attempt}/${MAX_ATTEMPTS} threw`, err)
    }

    if (!lastWasRetryable) return { ok: false, reason: 'rejected' }

    const delay = RETRY_DELAYS_MS[attempt - 1]
    if (delay !== undefined) await sleep(delay)
  }

  return { ok: false, reason: 'network' }
}
