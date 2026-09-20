export const GITHUB_USERNAME = 'andrewbaisden';

export type GitHubRepository = {
  id: string;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
};

/** Prefer short name for own repos; show owner/name for contributed pins. */
export function getRepositoryDisplayName(
  repository: GitHubRepository,
  username: string = GITHUB_USERNAME,
): string {
  const [owner] = repository.nameWithOwner.split('/');
  return owner === username ? repository.name : repository.nameWithOwner;
}
