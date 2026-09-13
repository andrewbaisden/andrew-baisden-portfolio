import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactForm from './ContactForm';

const validFill = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Name'), 'Andrew Baisden');
  await user.type(screen.getByLabelText('Email'), 'hello@example.com');
  await user.selectOptions(
    screen.getByLabelText('Reason for contacting'),
    'job',
  );
  await user.type(
    screen.getByLabelText('Message'),
    'I would like to talk about a role on the platform team.',
  );
};

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows validation messages for an empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Please enter your name'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your email address'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please select a reason for contacting'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please write at least 10 characters'),
    ).toBeInTheDocument();
  });

  it('submits a valid payload and shows the success state', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);
    await validFill(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByRole('status', { name: undefined }),
    ).toBeInTheDocument();
    expect(screen.getByText('✓ Message sent')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(fetchMock.mock.calls[0]?.[0]).toBe('/.netlify/functions/contact');
    expect(JSON.parse(String(init.body))).toMatchObject({
      name: 'Andrew Baisden',
      email: 'hello@example.com',
      reason: 'job',
    });
  });
});
