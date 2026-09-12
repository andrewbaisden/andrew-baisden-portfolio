'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactReasons,
  contactSchema,
  type ContactFormValues,
} from '@/lib/contact-schema';

type FormStatus = 'idle' | 'success' | 'error';

export const ContactForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: undefined,
      message: '',
      website: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    setStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.success) {
        setStatus('error');
        setServerError(
          data?.error ||
            'Something went wrong while sending your message. Please try again or email me directly at info@andrewbaisden.com.',
        );
        return;
      }

      reset();
      setStatus('success');
    } catch {
      setStatus('error');
      setServerError(
        'Something went wrong while sending your message. Please try again or email me directly at info@andrewbaisden.com.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <p className="contact-success-title">✓ Message sent</p>
        <p className="contact-success-copy">
          Thanks for getting in touch. I&apos;ll get back to you as soon as I
          can.
        </p>
        <button
          type="button"
          className="contact-secondary-button"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="contact-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name ? (
          <p id="contact-name-error" className="contact-field-error" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email ? (
          <p
            id="contact-email-error"
            className="contact-field-error"
            role="alert"
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-reason">Reason for contacting</label>
        <select
          id="contact-reason"
          aria-invalid={errors.reason ? 'true' : 'false'}
          aria-describedby={errors.reason ? 'contact-reason-error' : undefined}
          defaultValue=""
          {...register('reason')}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {contactReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {errors.reason ? (
          <p
            id="contact-reason-error"
            className="contact-field-error"
            role="alert"
          >
            {errors.reason.message}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          {...register('message')}
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="contact-field-error"
            role="alert"
          >
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {status === 'error' && serverError ? (
        <p className="contact-form-error" role="alert">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send message →'}
      </button>
    </form>
  );
};

export default ContactForm;
