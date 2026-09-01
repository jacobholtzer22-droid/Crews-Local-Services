import { SITE } from '@/site.config'

/**
 * Is this build launch-ready, or is it a look-and-see deploy?
 *
 * Two facts decide it, and neither is a code defect: the CRM tenant slug and the
 * real domain. Until both land the site is showable but not launchable.
 *
 * WHY THIS EXISTS: the client needs to see the site on a real URL before those
 * facts are available. Blocking that helps nobody. But a production deploy
 * carrying `https://TODO.example.com` in every canonical, OG URL and schema @id
 * is genuinely dangerous if a crawler reaches it: the wrong hostname gets
 * indexed and un-teaching Google is far more work than never telling it.
 *
 * So instead of blocking the deploy, a not-launch-ready build ships `noindex`
 * site-wide and a disallow-all robots.txt. It is fully viewable by anyone with
 * the link and invisible to search. Set SITE.url and SITE.businessSlug and both
 * revert automatically, with no other code change.
 */
export const IS_LAUNCH_READY =
  Boolean(SITE.businessSlug) && !SITE.url.includes('TODO')

/** Reasons, for the build log and the verify report. */
export function launchBlockers(): string[] {
  const out: string[] = []
  if (!SITE.businessSlug) out.push('SITE.businessSlug is empty (the estimate form cannot submit)')
  if (SITE.url.includes('TODO')) out.push('SITE.url is still the placeholder domain')
  return out
}
