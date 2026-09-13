import { z } from 'zod';

export const contactReasons = [
  { value: 'job', label: 'Job opportunity' },
  { value: 'freelance', label: 'Freelance / project' },
  { value: 'collaboration', label: 'Technical collaboration' },
  { value: 'content', label: 'Content / partnership' },
  { value: 'other', label: 'Something else' },
] as const;

export type ContactReason = (typeof contactReasons)[number]['value'];

export const contactReasonValues = contactReasons.map(
  (reason) => reason.value,
) as [ContactReason, ...ContactReason[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address')
    .email('Please enter a valid email address'),
  reason: z.enum(contactReasonValues, {
    message: 'Please select a reason for contacting',
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters')
    .max(5000, 'Message is too long'),
  // Honeypot only — never shown. Server treats non-empty as spam.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function getReasonLabel(reason: ContactReason): string {
  return contactReasons.find((item) => item.value === reason)?.label ?? reason;
}
