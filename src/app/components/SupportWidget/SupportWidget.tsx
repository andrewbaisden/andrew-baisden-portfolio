'use client';

import {
  HttpSupportSubmissionClient,
  SupportWidget as IssueRelaySupportWidget,
} from '@issuerelay/widget';
import { useTheme } from '@/app/context/ThemeContext';
import { supportWidgetConfig } from '@/lib/support-widget-config';

const submissionClient = new HttpSupportSubmissionClient({
  apiBaseUrl: supportWidgetConfig.apiBaseUrl,
});

/**
 * Questions, bug reports, and feature ideas go to IssueRelay, where they
 * are triaged privately; visitors' contact details are never published.
 */
const SupportWidget = () => {
  const { activeTheme } = useTheme();
  return (
    <IssueRelaySupportWidget
      projectKey={supportWidgetConfig.projectKey}
      submissionClient={submissionClient}
      theme={activeTheme === 'dark' ? 'dark' : 'light'}
      position="bottom-right"
      title="How can I help?"
    />
  );
};

export default SupportWidget;
