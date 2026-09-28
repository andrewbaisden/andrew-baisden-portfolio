import { HttpSupportSubmissionClient } from '@issuerelay/widget';
import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ThemeContextProvider, { useTheme } from '@/app/context/ThemeContext';
import SupportWidget from './SupportWidget';

const received: Array<Record<string, unknown>> = [];

vi.mock('@issuerelay/widget', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@issuerelay/widget')>()),
  SupportWidget: (props: Record<string, unknown>) => {
    received.push(props);
    return null;
  },
}));

let toggleTheme: (theme: string) => void = () => {};
function ThemeHandle() {
  const { setActiveTheme } = useTheme();
  toggleTheme = setActiveTheme;
  return null;
}

describe('SupportWidget', () => {
  afterEach(() => {
    received.length = 0;
    window.localStorage.clear();
  });

  it('renders the IssueRelay widget for this site and follows the site theme', () => {
    render(
      <ThemeContextProvider>
        <ThemeHandle />
        <SupportWidget />
      </ThemeContextProvider>,
    );
    const first = received.at(-1);
    expect(first).toMatchObject({
      projectKey: 'pk_NjcY2qluhQFMLa2OYhR23YCuytsIxOSx',
      position: 'bottom-right',
      theme: 'light',
      title: 'How can I help?',
    });
    expect(first?.submissionClient).toBeInstanceOf(HttpSupportSubmissionClient);

    act(() => toggleTheme('dark'));
    expect(received.at(-1)).toMatchObject({ theme: 'dark' });
  });
});
