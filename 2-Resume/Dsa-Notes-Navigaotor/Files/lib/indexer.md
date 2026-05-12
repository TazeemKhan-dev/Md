export type Node = {
  type: "folder" | "file";
  title: string;
  path: string;
  id?: number;
  children?: Node[];
};

export function buildIndex(tree: any[]): Node[] {
  const root: Node = {
    type: "folder",
    title: "Root",
    path: "",
    children: [],
  };

  const nodeMap = new Map<string, Node>();
  nodeMap.set("", root);

  for (const item of tree) {
    if (item.type !== "blob") continue;
    if (!item.path.endsWith(".md")) continue;

    const parts = item.path.split("/");

    // 🚫 SKIP ROOT-LEVEL FILES (IMPORTANT)
    if (parts.length === 1) continue;

    let currentPath = "";
    let parent = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (nodeMap.has(currentPath)) {
        parent = nodeMap.get(currentPath)!;
        continue;
      }

      if (isFile) {
        const fileMatch = part.match(/^(\d+)-(.+)\.md$/);

        const fileNode: Node = {
          type: "file",
          path: currentPath,
          id: fileMatch ? Number(fileMatch[1]) : undefined,
          title: (fileMatch ? fileMatch[2] : part.replace(".md", ""))
            .replace(/-/g, " "),
        };

        parent.children!.push(fileNode);
        nodeMap.set(currentPath, fileNode);
      } else {
        const folderMatch = part.match(/^(\d+)-(.+)/);

        const folderNode: Node = {
          type: "folder",
          path: currentPath,
          id: folderMatch ? Number(folderMatch[1]) : undefined,
          title: (folderMatch ? folderMatch[2] : part).replace(/-/g, " "),
          children: [], // ✅ ALWAYS PRESENT
        };

        parent.children!.push(folderNode);
        nodeMap.set(currentPath, folderNode);
        parent = folderNode;
      }
    }
  }

  sortTree(root);
  return root.children!;
}

function sortTree(node: Node) {
  if (!node.children) return;

  node.children.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1; // folders first
    }

    if (a.id == null && b.id == null) {
      return a.title.localeCompare(b.title);
    }
    if (a.id == null) return 1;
    if (b.id == null) return -1;
    return a.id - b.id;
  });

  for (const child of node.children) {
    if (child.type === "folder") {
      sortTree(child);
    }
  }
}
