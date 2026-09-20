import { getPinnedRepositories } from '@/lib/github';
import HomePage from './HomePage';

export default async function Page() {
  const pinnedRepositories = await getPinnedRepositories();

  return <HomePage pinnedRepositories={pinnedRepositories} />;
}
