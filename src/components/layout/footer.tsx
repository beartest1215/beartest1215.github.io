import { backgrounds } from "@/components/background";

/** 底部页脚（随页面滚动） */
function Footer() {
  /** 仅展示有来源链接的背景图 */
  const sources = backgrounds
    .map((bg, index) => ({ index: index + 1, source: bg.source }))
    .filter((item): item is { index: number; source: string } => Boolean(item.source));

  return (
    <footer className="border-t">
      <div className="mx-auto flex h-14 items-center justify-end gap-2 px-6 text-xs text-muted-foreground bg-background/24">
        <span>背景图源：</span>
        {sources.map((item, i) => (
          <span key={item.index} className="flex items-center gap-2">
            {i > 0 && <span>·</span>}
            <a
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {item.index}
            </a>
          </span>
        ))}
      </div>
    </footer>
  );
}

export { Footer };
