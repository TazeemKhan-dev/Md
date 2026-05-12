type RepoMeta = {
  default_branch: string;
};

const GITHUB_API = "https://api.github.com";

/* -------------------------------------------------- */
/* Client-side Memoization Cache                      */
/* -------------------------------------------------- */
const markdownCache = new Map<string, Promise<string>>();

/* ------------------------- helpers ------------------------- */

class BlockedError extends Error {
  reason: string;

  constructor(reason: string) {
    super("BLOCKED");
    this.reason = reason;
  }
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function getSessionId(): string {
  if (typeof window === "undefined") {
    throw new Error("getSessionId called on server");
  }

  let id = localStorage.getItem("dev-session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("dev-session-id", id);
  }
  return id;
}

/* --------------------------------------------------
   Fetch repo tree + default branch (cached)
-------------------------------------------------- */
export async function fetchRepoTree(owner: string, repo: string) {
  const headers = getHeaders();

  const repoRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers,
    next: {
      revalidate: 3600,
      tags: [`tree:${owner}/${repo}`],
    },
  });

  if (!repoRes.ok) {
    throw new Error("FAILED_REPO_METADATA");
  }

  const repoData: RepoMeta = await repoRes.json();
  const defaultBranch = repoData.default_branch;

  const treeRes = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
    {
      headers,
      next: {
        revalidate: 3600,
        tags: [`tree:${owner}/${repo}`],
      },
    },
  );

  if (!treeRes.ok) {
    throw new Error("FAILED_REPO_TREE");
  }

  const treeData = await treeRes.json();

  return {
    tree: treeData.tree,
    defaultBranch,
  };
}

/* --------------------------------------------------
   Fetch raw markdown file (BLOCK-AWARE + MEMOIZED)
-------------------------------------------------- */
export async function fetchMarkdownFile(
  owner: string,
  repo: string,
  branch: string,
  path: string,
  apiBase = "/api/markdown", 
  forceRefresh = false       
) {
  const cacheKey = `${owner}:${repo}:${branch}:${path}`;

  // 1. If forcing, bypass and delete the existing promise
  if (forceRefresh) {
    markdownCache.delete(cacheKey);
  }

  // 2. Return existing promise if request is already in-flight
  if (markdownCache.has(cacheKey)) {
    return markdownCache.get(cacheKey)!;
  }

  const requestPromise = (async () => {
    const url =
      `${apiBase}?owner=${owner}` +
      `&repo=${repo}` +
      `&branch=${branch}` +
      `&path=${encodeURIComponent(path)}`;

    const token =
      localStorage.getItem("dev-token") ??
      process.env.NEXT_PUBLIC_PUBLIC_TOKEN;

    const sessionId = getSessionId();

    const res = await fetch(url, {
      headers: {
        ...(token ? { "x-dev-token": token } : {}),
        ...(sessionId ? { "x-session-id": sessionId } : {}),
      },
    });

    if (!res.ok) {
      // Clear cache on error so user can retry immediately
      markdownCache.delete(cacheKey);
      
      let payload: any = null;
      try { payload = await res.json(); } catch { }

      if (payload?.blocked && payload?.reason) {
        throw new BlockedError(payload.reason);
      }
      throw new Error(`FAILED_MARKDOWN_FETCH:${res.status}`);
    }

    const text = await res.text();
    
    // Auto-clear cache after 10s to keep data fresh 
    setTimeout(() => markdownCache.delete(cacheKey), 10000);
    
    return text;
  })();

  markdownCache.set(cacheKey, requestPromise);
  return requestPromise;
}

export { BlockedError };