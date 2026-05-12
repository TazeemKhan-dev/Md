"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { ArrowUp } from "lucide-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { TocContext } from "./RepoShell";

/* ---------- Types ---------- */
type Heading = {
  id: string;
  anchor: string;
  text: string;
  level: number;
};

/* ---------- Utils ---------- */
function slugify(text: string) {
  const slug = text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // CSS-safe: IDs cannot start with number
  return /^[0-9]/.test(slug) ? `h-${slug}` : slug;
}


function extractText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children?.props?.children) return extractText(children.props.children);
  return "";
}

/* ---------- Extract headings ---------- */
function extractHeadings(markdown: string): Heading[] {
  let counter = 0;
  const tree: any = unified().use(remarkParse).parse(markdown);
  const headings: Heading[] = [];

  function visit(node: any) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const text = node.children
        .map((n: any) =>
          n.type === "text" || n.type === "inlineCode" ? n.value : ""
        )
        .join("");

      const base = slugify(text);
      headings.push({
        id: `${base}-${counter++}`,
        anchor: base,
        text,
        level: node.depth,
      });
    }
    if (node.children) node.children.forEach(visit);
  }

  visit(tree);
  return headings;
}

export function CodeBlock({ inline, className, children }: any) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");

  if (inline) {
    return (
      <code className="px-1 rounded bg-[var(--ui-active)] text-[0.85em]">
        {children}
      </code>
    );
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <code className={className} data-code-block>
      <button onClick={handleCopy} className="copy-btn" aria-label="Copy code">
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </code>
  );
}
function hashContent(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}


/* ---------- Markdown Viewer ---------- */
export default function MarkdownViewer({
   content,
  containerRef,
  activeScrollRef,
  hideTopButton = false,
  scrollId = "single",
}: {
  content: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  activeScrollRef?: React.RefObject<HTMLDivElement | null>;
  hideTopButton?: boolean;
  scrollId?: "single" | "left" | "right";
}) {
  const setHeadings = useContext(TocContext);
  const scrollRef = containerRef;

  const headings = useMemo(() => extractHeadings(content), [content]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setHeadings(headings);
  }, [headings, setHeadings]);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;

    const onScroll = () => setShowTop(el.scrollTop > 400);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;

    const contentHash = hashContent(content);
const key = `markdown-scroll-${scrollId}`;

    const onScroll = () => {
      const payload = {
        top: el.scrollTop,
        hash: contentHash,
      };
      localStorage.setItem(key, JSON.stringify(payload));
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, content, scrollId]);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;
   const key = `markdown-scroll-${scrollId}`;


    const saved = localStorage.getItem(key);
    const currentHash = hashContent(content);

    if (!saved) {
      el.scrollTo({ top: 0 });
      return;
    }

    try {
      const { top, hash } = JSON.parse(saved);

      if (hash === currentHash) {
        // same content → restore position
        requestAnimationFrame(() => {
          el.scrollTo({ top, behavior: "instant" as any });
          el.scrollTo({ top, behavior: "auto" });

        });
      } else {
        // content changed → reset
        el.scrollTo({ top: 0 });
        localStorage.setItem(
          key,
          JSON.stringify({ top: 0, hash: currentHash }),
        );
      }
    } catch {
      el.scrollTo({ top: 0 });
    }
  }, [scrollRef, content, scrollId]);

  return (
    <>
      <article
        className="markdown-body"
        style={{
          fontSize: `calc(1rem * var(--markdown-font-scale, 1))`,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h1({ children }) {
              const raw = extractText(children);
              const cleaned = raw.replace(/^q\d+\s*:\s*/i, "");
              return <h1 className="scroll-mt-14">{cleaned}</h1>;
            },
            h2({ children }) {
              const text = extractText(children);
              return (
                <h2 id={slugify(text)} className="scroll-mt-14" data-heading>
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              const text = extractText(children);
              return (
                <h3 id={slugify(text)} className="scroll-mt-14" data-heading>
                  {children}
                </h3>
              );
            },
            code: CodeBlock,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {showTop && !hideTopButton && (
        <button
          onClick={() =>
            scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
          title="Back to top"
          className="fixed bottom-6 right-6 z-[120] rounded-full p-2 shadow transition-colors"
          style={{
            backgroundColor: "var(--content-bg)",
            border: "1px solid var(--ui-border)",
            color: "var(--ui-text)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--ui-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--content-bg)")
          }
        >
          <ArrowUp size={16} />
        </button>
      )}
    </>
  );
}
