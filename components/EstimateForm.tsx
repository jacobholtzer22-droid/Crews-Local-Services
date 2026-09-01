'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Check, Phone } from 'lucide-react'
import {
  HONEYPOT_FIELD,
  SERVICE_OPTIONS,
  estimateSchema,
  type EstimateValues,
} from '@/lib/estimate-schema'
import { submitEstimate } from '@/lib/submit-estimate'
import Link from 'next/link'
import { SITE, TEL_HREF } from '@/site.config'
import { cn } from '@/lib/cn'

const inputCls =
  'mt-2 min-h-[48px] w-full rounded border border-sawdust-dim bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blaze'

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function EstimateForm() {
  const [state, setState] = useState<'idle' | 'success' | 'failed'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EstimateValues>({
    resolver: zodResolver(estimateSchema),
    // Validate on blur, not on every keystroke, errors that appear while someone
    // is still typing their phone number are noise, not help.
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: 'Tree removal',
      message: '',
      smsConsent: false,
      [HONEYPOT_FIELD]: '',
    },
  })

  async function onSubmit(values: EstimateValues) {
    const result = await submitEstimate({
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      // Service is prepended to the message so the CRM payload shape stays
      // exactly what /api/contact already expects, no new field to support.
      message: `Service: ${values.service}\n\n${values.message}`,
      smsConsent: values.smsConsent,
      honeypot: (values as Record<string, unknown>)[HONEYPOT_FIELD] as string ?? '',
      honeypotField: HONEYPOT_FIELD,
    })

    if (result.ok) {
      setState('success')
      reset()
      return
    }
    // Every failure path lands the customer on the phone number. We do not
    // distinguish the causes to them, "not configured", "rejected" and "network"
    // all mean the same thing from their side: this did not go through, call.
    setState('failed')
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-moss/40 bg-moss/5 p-6" role="status">
        <Check className="h-8 w-8 text-moss" aria-hidden="true" />
        <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
          Got it, we&rsquo;ll be in touch
        </h2>
        <p className="prose-body mt-2 text-ink-soft">
          {SITE.owner} will get back to you to set up a time to come look at the tree. If you
          need us sooner, calling is always faster.
        </p>
        <a href={TEL_HREF} data-cta="call" className="btn-primary mt-5">
          <Phone className="h-5 w-5" aria-hidden="true" />
          {SITE.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 block font-display text-sm font-bold uppercase tracking-wide text-moss underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {state === 'failed' && (
        <div
          role="alert"
          className="flex gap-3 rounded border border-red-700/40 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">That didn&rsquo;t go through.</p>
            <p className="mt-1">
              Sorry, please call us instead so this doesn&rsquo;t get lost:{' '}
              <a
                href={TEL_HREF}
                data-cta="call"
                className="font-bold underline underline-offset-4"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Honeypot. Off-screen rather than display:none, some bots skip hidden
          fields. aria-hidden + tabIndex -1 keep it away from real users and
          screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(HONEYPOT_FIELD as keyof EstimateValues)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={cn(inputCls, errors.name && 'border-red-700')}
            {...register('name')}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <input
            id="phone"
            // type="tel" + inputMode so a phone shows the numeric keypad.
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(269) 555-0134"
            className={cn(inputCls, errors.phone && 'border-red-700')}
            // Formatting is layered ON TOP of register() rather than replacing its
            // value/onChange/ref wiring, hand-rolling those detaches the field
            // from react-hook-form and validation silently stops running.
            {...register('phone', {
              onChange: (e) => setValue('phone', formatPhone(e.target.value)),
            })}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          htmlFor="email"
          hint="Optional"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(inputCls, errors.email && 'border-red-700')}
            {...register('email')}
          />
        </Field>

        <Field label="What do you need?" htmlFor="service" required>
          <select id="service" className={inputCls} {...register('service')}>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="About the tree"
        htmlFor="message"
        required
        hint="What kind of tree, where it sits on the property, and what it is near: wires, a roof, a fence."
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={5}
          placeholder="Big maple in the back yard, leaning toward the garage. There are power lines running along the back fence."
          className={cn(inputCls, 'min-h-[9rem] resize-y', errors.message && 'border-red-700')}
          {...register('message')}
        />
      </Field>

      {/* SMS consent. UNCHECKED by default. The label is an explicit opt-in ("I agree
          to receive...") naming the sender, the frequency, the rates, the STOP/HELP
          keywords and the privacy policy, which is what TCPA and the carriers expect
          from a written consent record. The business name comes from SITE.name so it
          can never disagree with the header, the footer NAP or the schema.
          The CRM records this value but does not require it, so an unchecked box never
          costs the customer their estimate. */}
      <div className="rounded border border-sawdust-dim bg-white/60 p-4">
        <label htmlFor="smsConsent" className="flex cursor-pointer gap-3">
          <input
            id="smsConsent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-blaze"
            {...register('smsConsent')}
          />
          <span className="text-sm leading-relaxed text-ink-soft">
            I agree to receive text messages from {SITE.name} about my estimate request.
            Message frequency varies, message and data rates may apply. Reply STOP to cancel
            or HELP for help. See our{' '}
            {/* The link sits inside the <label>, so stopPropagation keeps a tap on it from
                toggling the checkbox the label is bound to. */}
            <Link
              href="/privacy"
              className="font-semibold text-moss underline underline-offset-4"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>
            . Optional: leaving this unchecked will not hold up your estimate.
          </span>
        </label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? 'Sending…' : 'Send my request'}
      </button>

      <p className="text-sm text-ink-muted">
        Rather talk it through?{' '}
        <a
          href={TEL_HREF}
          data-cta="call"
          className="font-semibold text-moss underline underline-offset-4"
        >
          Call {SITE.phoneDisplay}
        </a>
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Visible label, always, never placeholder-as-label. */}
      <label
        htmlFor={htmlFor}
        className="font-display text-sm font-bold uppercase tracking-wide text-ink"
      >
        {label}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {!required && hint && <span className="ml-2 font-sans normal-case text-ink-muted">{hint}</span>}
      </label>
      {required && hint && <p className="mt-1 text-sm text-ink-muted">{hint}</p>}
      {children}
      {/* Error below its own field, announced to screen readers. */}
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-semibold text-red-800">
          {error}
        </p>
      )}
    </div>
  )
}
