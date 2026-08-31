import { z } from 'zod'

/**
 * Honeypot field name.
 *
 * This is the Align and Acquire CRM's CURRENT honeypot (`lib/spam-constants.ts`
 * there). A non-empty value scores 1000 and auto-condemns the submission.
 *
 * The nonsense token is deliberate. The CRM's legacy honeypot was named `website`
 * and is still accepted at the same weight — but Chrome autofills a field called
 * `website`, which silently killed real leads. Never rename this to anything a
 * browser would recognise (`company`, `website`, `url`, `address`).
 */
export const HONEYPOT_FIELD = 'hp_7d3a_ref'

/** Dropdown values. Prepended to `message` so the CRM payload shape is unchanged. */
export const SERVICE_OPTIONS = [
  'Tree removal',
  'Tree trimming',
  'Stump grinding',
  'Storm damage cleanup',
  'Not sure / something else',
] as const

export const estimateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'That name is too long.'),
  // Required. The CRM only hard-requires `name`, but a tree estimate without a
  // phone number is a lead nobody can act on.
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Please enter a 10-digit phone number.'),
  // Optional: plenty of this audience does not use email, and demanding it costs
  // more real leads than the address is worth.
  email: z
    .union([z.string().trim().email('That email address does not look right.'), z.literal('')])
    .optional(),
  service: z.enum(SERVICE_OPTIONS),
  message: z
    .string()
    .trim()
    .min(10, 'A sentence or two about the tree helps us give you a useful answer.')
    .max(2000, 'That message is too long.'),
  /** Unchecked by default. Recorded, never required — see the note in the form. */
  smsConsent: z.boolean(),
  /** Honeypot. Must stay empty. */
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal('')),
})

export type EstimateValues = z.infer<typeof estimateSchema>
