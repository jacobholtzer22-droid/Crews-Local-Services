import type { MetadataRoute } from 'next'
import { abs } from '@/lib/schema'

/**
 * AI answer engines are named explicitly and allowed.
 *
 * Most of them already default to allowed, so this is belt-and-braces, but the
 * ones that matter here are the two-crawler setups where the training crawler and
 * the live-retrieval crawler are separate user agents (GPTBot vs OAI-SearchBot and
 * ChatGPT-User; ClaudeBot vs Claude-User; PerplexityBot vs Perplexity-User).
 * Blocking the training crawler while intending to stay citable in the answer is a
 * common accident. This business wants to be found, so everything is allowed.
 *
 * Google-Extended and Applebot-Extended are AI-training controls, not indexing
 * controls: allowing them has no bearing on normal Search ranking either way.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Amazonbot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: abs('/sitemap.xml'),
    host: abs('/'),
  }
}
