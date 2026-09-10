import { ServerClient } from 'postmark';
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
  const token = process.env.POSTMARK_SERVER_TOKEN;

  if (!token) {
    throw new Error('Missing POSTMARK_SERVER_TOKEN');
  }

  const reasonLabel = getReasonLabel(values.reason as ContactReason);
  const client = new ServerClient(token);

  await client.sendEmail({
    From: 'Portfolio <website@andrewbaisden.com>',
    To: 'info@andrewbaisden.com',
    ReplyTo: values.email,
    Subject: `[Portfolio] ${reasonLabel} — ${values.name}`,
    TextBody: buildTextBody({
      name: values.name,
      email: values.email,
      reasonLabel,
      message: values.message,
    }),
    HtmlBody: buildHtmlBody({
      name: values.name,
      email: values.email,
      reasonLabel,
      message: values.message,
    }),
    Tag: 'portfolio-contact',
    MessageStream: 'outbound',
  });
}
