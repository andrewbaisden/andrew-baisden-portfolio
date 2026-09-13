import { describe, expect, it } from 'vitest';
import { contactSchema, getReasonLabel } from '@/lib/contact-schema';

const validPayload = {
  name: 'Andrew Baisden',
  email: 'hello@example.com',
  reason: 'job' as const,
  message: 'I would like to talk about a role on the platform team.',
};

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const parsed = contactSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
  });

  it('accepts an omitted honeypot', () => {
    const parsed = contactSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.website).toBeUndefined();
    }
  });

  it('rejects a name that is too short', () => {
    const parsed = contactSchema.safeParse({ ...validPayload, name: 'A' });
    expect(parsed.success).toBe(false);
  });

  it('rejects a name that is too long', () => {
    const parsed = contactSchema.safeParse({
      ...validPayload,
      name: 'A'.repeat(101),
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const parsed = contactSchema.safeParse({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects an unknown reason', () => {
    const parsed = contactSchema.safeParse({
      ...validPayload,
      reason: 'spam',
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects a message under 10 characters', () => {
    const parsed = contactSchema.safeParse({
      ...validPayload,
      message: 'too short',
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects a message over 5000 characters', () => {
    const parsed = contactSchema.safeParse({
      ...validPayload,
      message: 'x'.repeat(5001),
    });
    expect(parsed.success).toBe(false);
  });

  it('maps reason values to labels', () => {
    expect(getReasonLabel('job')).toBe('Job opportunity');
    expect(getReasonLabel('freelance')).toBe('Freelance / project');
  });
});
