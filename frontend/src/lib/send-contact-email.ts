import { Resend } from 'resend';
import {
  getReasonLabel,
  type ContactFormValues,
  type ContactReason,
} from './contact-schema';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildTextBody(input: {
  name: string;
  email: string;
  reasonLabel: string;
  message: string;
}): string {
  return [
    'New portfolio enquiry',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Reason: ${input.reasonLabel}`,
    '',
    'Message:',
    input.message,
  ].join('\n');
}

function buildHtmlBody(input: {
  name: string;
  email: string;
  reasonLabel: string;
  message: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #2f2f3a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New portfolio enquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin: 0 0 16px;"><strong>Reason:</strong> ${escapeHtml(input.reasonLabel)}</p>
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(input.message)}</p>
    </div>
  `.trim();
}

export async function sendContactEmail(
  values: Omit<ContactFormValues, 'website'>,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  const reasonLabel = getReasonLabel(values.reason as ContactReason);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: 'Portfolio <info@andrewbaisden.com>',
    to: ['info@andrewbaisden.com'],
    replyTo: values.email,
    subject: `[Portfolio] ${reasonLabel} — ${values.name}`,
    text: buildTextBody({
      name: values.name,
      email: values.email,
      reasonLabel,
      message: values.message,
    }),
    html: buildHtmlBody({
      name: values.name,
      email: values.email,
      reasonLabel,
      message: values.message,
    }),
    tags: [{ name: 'category', value: 'portfolio-contact' }],
  });

  if (error) {
    throw new Error(error.message || 'Resend email send failed');
  }
}
