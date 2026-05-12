import RepoShell from "@/components/RepoShell";
import { fetchRepoTree } from "@/lib/github";
import { buildIndex } from "@/lib/indexer";

export const dynamic = "force-dynamic";

export default async function Page() {
  const owner = "TazeemKhan-dev";
  const repo = "dsa-journal";

  const repoData = await fetchRepoTree(owner, repo);
  const index = buildIndex(repoData.tree);

  return (
    <RepoShell
      owner={owner}
      repo={repo}
      index={index}
      initialPath={null}
      apiBase="/api/journal"
    />
  );
}
