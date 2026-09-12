import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { sendContactEmail } from '@/lib/send-contact-email';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateBucket>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
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

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid form submission' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid form submission' },
      { status: 400 },
    );
  }

  const values = parsed.data;

  if (values.website && values.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  try {
    const { website: _website, ...emailValues } = values;
    await sendContactEmail(emailValues);
    return NextResponse.json({ success: true });
  } catch {
    console.error('Failed to send contact email');
    return NextResponse.json(
      { success: false, error: 'Unable to send message right now' },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 },
  );
}
