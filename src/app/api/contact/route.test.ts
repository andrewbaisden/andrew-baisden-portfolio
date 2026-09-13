import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendContactEmail } from '@/lib/send-contact-email';
import { GET, POST } from './route';

vi.mock('@/lib/send-contact-email', () => ({
  sendContactEmail: vi.fn().mockResolvedValue(undefined),
}));

const validPayload = {
  name: 'Andrew Baisden',
  email: 'hello@example.com',
  reason: 'job',
  message: 'I would like to talk about a role on the platform team.',
};

function postRequest(body: unknown, ip: string) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);

  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: payload,
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.mocked(sendContactEmail).mockReset();
    vi.mocked(sendContactEmail).mockResolvedValue(undefined);
  });

  it('returns 400 for invalid JSON', async () => {
    const response = await POST(postRequest('{', '203.0.113.1'));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Invalid form submission',
    });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('returns 400 for an invalid body', async () => {
    const response = await POST(
      postRequest({ ...validPayload, email: 'nope' }, '203.0.113.2'),
    );
    expect(response.status).toBe(400);
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('short-circuits honeypot submissions without sending mail', async () => {
    const response = await POST(
      postRequest(
        { ...validPayload, website: 'https://spam.test' },
        '203.0.113.3',
      ),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('sends mail and returns success for a valid payload', async () => {
    const response = await POST(postRequest(validPayload, '203.0.113.4'));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendContactEmail).toHaveBeenCalledWith(validPayload);
  });

  it('returns 500 when delivery fails', async () => {
    vi.mocked(sendContactEmail).mockRejectedValueOnce(new Error('boom'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const response = await POST(postRequest(validPayload, '203.0.113.5'));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Unable to send message right now',
    });
    errorSpy.mockRestore();
  });

  it('returns 429 after five posts from the same IP', async () => {
    const ip = '203.0.113.9';
    for (let i = 0; i < 5; i += 1) {
      const response = await POST(postRequest(validPayload, ip));
      expect(response.status).toBe(200);
    }

    const limited = await POST(postRequest(validPayload, ip));
    expect(limited.status).toBe(429);
    await expect(limited.json()).resolves.toEqual({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  });
});

describe('GET /api/contact', () => {
  it('returns 405', async () => {
    const response = GET();
    expect(response.status).toBe(405);
  });
});
