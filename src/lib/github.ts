import { GITHUB_USERNAME, type GitHubRepository } from '@/lib/github-shared';

export type { GitHubRepository } from '@/lib/github-shared';
export {
  GITHUB_USERNAME,
  getRepositoryDisplayName,
} from '@/lib/github-shared';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

/** Refresh pinned repos at most once per hour. */
const REVALIDATE_SECONDS = 3600;

const pinnedReposQuery = `
  query GetPinnedRepositories($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            nameWithOwner
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

type PinnedRepositoriesResponse = {
  data?: {
    user: {
      pinnedItems: {
        nodes: Array<GitHubRepository | null>;
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

function isRepository(node: GitHubRepository | null): node is GitHubRepository {
  return (
    node !== null && typeof node.id === 'string' && typeof node.url === 'string'
  );
}

export async function getPinnedRepositories(
  username: string = GITHUB_USERNAME,
): Promise<GitHubRepository[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN is not set; skipping pinned repositories fetch');
    return [];
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: pinnedReposQuery,
        variables: { username },
      }),
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      console.error(
        `GitHub GraphQL request failed with status ${response.status}`,
      );
      return [];
    }

    const json = (await response.json()) as PinnedRepositoriesResponse;

    if (json.errors?.length) {
      console.error(
        'GitHub GraphQL error:',
        json.errors[0]?.message ?? 'Unknown error',
      );
      return [];
    }

    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    return nodes.filter(isRepository);
  } catch (error) {
    console.error('Failed to fetch pinned repositories', error);
    return [];
  }
}
