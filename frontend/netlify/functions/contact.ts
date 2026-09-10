import type { Handler, HandlerEvent } from '@netlify/functions';
import { contactSchema } from '../../src/lib/contact-schema';
import { sendContactEmail } from '../../src/lib/send-contact-email';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateBucket>();

function jsonResponse(
  statusCode: number,
  body: { success: boolean; error?: string },
) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

function getClientIp(event: HandlerEvent): string {
  const forwarded = event.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = event.headers['x-nf-client-connection-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp;
  }

  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {
      success: false,
      error: 'Method not allowed',
    });
  }

  const ip = getClientIp(event);
  if (isRateLimited(ip)) {
    return jsonResponse(429, {
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }

  let payload: unknown;

  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return jsonResponse(400, {
      success: false,
      error: 'Invalid form submission',
    });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonResponse(400, {
      success: false,
      error: 'Invalid form submission',
    });
  }

  const values = parsed.data;

  if (values.website && values.website.length > 0) {
    return jsonResponse(200, { success: true });
  }

  try {
    const { website: _website, ...emailValues } = values;
    await sendContactEmail(emailValues);
    return jsonResponse(200, { success: true });
  } catch {
    console.error('Failed to send contact email');
    return jsonResponse(500, {
      success: false,
      error: 'Unable to send message right now',
    });
  }
};
