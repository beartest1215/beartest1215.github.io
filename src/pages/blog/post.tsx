import { Suspense, use, useEffect, type ReactNode } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { MarkdownHooks, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { FileX } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LoadingPlaceholder } from "@/components/loading-placeholder";
import {
  BlogOutletContext,
  extractToc,
  loadPost,
  resolveImage,
  slugify,
  type BlogPost,
} from "@/lib/blog";

/**
 * 从 ReactNode 中递归提取纯文本
 * 用于给标题生成稳定的锚点 id（与 extractToc 中算法一致）
 */
function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeToText).join("");
  }
  if (typeof node === "object" && "props" in node) {
    return nodeToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/** 文章加载失败或不存在时的占位提示 */
function PostNotFound() {
  return (
    <Empty className="min-h-80">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileX />
        </EmptyMedia>
        <EmptyTitle>文章不存在</EmptyTitle>
        <EmptyDescription>
          请检查链接是否正确，或返回杂记列表查看其他文章。
        </EmptyDescription>
      </EmptyHeader>
      <Link to="/blog" className={buttonVariants()}>
        返回杂记
      </Link>
    </Empty>
  );
}

/** 文章主体内容，在 PostLoader 解析出 post 后渲染，负责同步目录到父级 Outlet context */
function PostContent({ post }: { post: BlogPost }) {
  const { setToc, setActiveId } = useOutletContext<BlogOutletContext>();

  // 文章内容加载，同步目录并监听标题位置
  useEffect(() => {
    setToc(extractToc(post.content));

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        "article h2[id], article h3[id], article h4[id]",
      ),
    );
    if (headings.length === 0) {
      setActiveId(null);
      return;
    }

    /** 当前处于触发区域内的标题 id 集合 */
    const visible = new Set<string>();

    // 使用 IntersectionObserver 跟踪当前可见章节，回调父级更新目录高亮
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }
        // 触发区域为空时保留上一次的激活项（用户正在阅读该章节的内容）
        if (visible.size === 0) {
          return;
        }
        // headings 按 DOM 顺序排列，find 返回最靠上的可见标题
        const topVisible = headings.find((h) => visible.has(h.id));
        if (topVisible) {
          setActiveId(topVisible.id);
        }
      },
      {
        // 触发区域：视口顶部 20%，标题进入此区域即视为正在阅读
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      },
    );

    headings.forEach((h) => observer.observe(h));

    // 卸载时清空目录与激活项，避免切换文章时残留旧数据
    return () => {
      observer.disconnect();
      setToc([]);
      setActiveId(null);
    };
  }, [post, setToc, setActiveId]);

  const components: Components = {
    a: ({ children, ...props }) => (
      <ExternalLink {...props}>{children}</ExternalLink>
    ),
    h2: ({ children, ...props }) => (
      <h2 id={slugify(nodeToText(children))} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={slugify(nodeToText(children))} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 id={slugify(nodeToText(children))} {...props}>
        {children}
      </h4>
    ),
    img: ({ src, alt, ...props }) => {
      const resolved = typeof src === "string" ? resolveImage(src, post.date.slice(0, 4)) : src;
      return <img src={resolved} alt={alt} {...props} />;
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-1 py-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-semibold md:text-3xl">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded bg-secondary px-1.5 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>
        {post.excerpt && <p className="mt-3 text-muted-foreground">{post.excerpt}</p>}
      </header>
      <div className="prose prose-sm md:prose-base max-w-none">
        <MarkdownHooks
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={components}
          fallback={<LoadingPlaceholder spinnerSize="size-6" className="py-8" />}
        >
          {post.content}
        </MarkdownHooks>
      </div>
    </article>
  );
}

/**
 * 文章加载器
 * 使用 React 19 的 use() Hook 挂起至 loadPost 解析完成
 * 同一 slug 的 promise 已在 lib/blog.ts 中缓存，重复访问直接复用
 */
function PostLoader({ slug }: { slug: string }) {
  const post = use(loadPost(slug));
  if (!post) {
    return <PostNotFound />;
  }
  return <PostContent post={post} />;
}

/** 文章详情页入口：负责读取 slug 并提供 Suspense 边界 */
function Post() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    return <PostNotFound />;
  }
  return (
    <Suspense fallback={<LoadingPlaceholder spinnerSize="size-8" />}>
      <PostLoader slug={slug} />
    </Suspense>
  );
}

export default Post;
