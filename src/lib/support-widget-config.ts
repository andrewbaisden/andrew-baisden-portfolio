/**
 * IssueRelay support widget settings. Both values are public: the project
 * key identifies this site's project and grants no access, and the API is
 * the public ticket endpoint. Override them to point a local build at a
 * local IssueRelay platform.
 */
export const supportWidgetConfig = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_ISSUERELAY_API_URL ??
    'https://issuerelay-web.vercel.app',
  projectKey:
    process.env.NEXT_PUBLIC_ISSUERELAY_PROJECT_KEY ??
    'pk_NjcY2qluhQFMLa2OYhR23YCuytsIxOSx',
} as const;
