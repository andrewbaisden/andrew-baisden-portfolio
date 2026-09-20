import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPinnedRepositories } from '@/lib/github';
import {
  type GitHubRepository,
  getRepositoryDisplayName,
} from '@/lib/github-shared';

const sampleRepository: GitHubRepository = {
  id: 'R_kgDOABC',
  name: 'homeguard3d',
  nameWithOwner: 'andrewbaisden/homeguard3d',
  description: 'Smart-home digital twin',
  url: 'https://github.com/andrewbaisden/homeguard3d',
  homepageUrl: null,
  stargazerCount: 2,
  forkCount: 0,
  primaryLanguage: {
    name: 'TypeScript',
    color: '#3178c6',
  },
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('getRepositoryDisplayName', () => {
  it('uses the short name for owned repositories', () => {
    expect(getRepositoryDisplayName(sampleRepository)).toBe('homeguard3d');
  });

  it('keeps owner/name for contributed pins', () => {
    expect(
      getRepositoryDisplayName({
        ...sampleRepository,
        name: 'React-Interview-Guide',
        nameWithOwner: 'PacktPublishing/React-Interview-Guide',
      }),
    ).toBe('PacktPublishing/React-Interview-Guide');
  });
});

describe('getPinnedRepositories', () => {
  it('returns an empty list when GITHUB_TOKEN is missing', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(getPinnedRepositories()).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns pinned repositories from GraphQL', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'github_pat_test');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          user: {
            pinnedItems: {
              nodes: [sampleRepository, null],
            },
          },
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getPinnedRepositories()).resolves.toEqual([sampleRepository]);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer github_pat_test',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }),
    );
  });

  it('returns an empty list when GitHub responds with errors', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'github_pat_test');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          errors: [{ message: 'Bad credentials' }],
        }),
      }),
    );

    await expect(getPinnedRepositories()).resolves.toEqual([]);
  });

  it('returns an empty list when the HTTP response is not ok', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'github_pat_test');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
      }),
    );

    await expect(getPinnedRepositories()).resolves.toEqual([]);
  });
});
