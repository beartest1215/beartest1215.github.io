import { Fragment } from "react";
import { ExternalLink } from "@/components/external-link";
import { backgrounds } from "@/components/background";

/** 友情链接列表，新增友链在此追加 */
const friendLinks: { name: string; href: string }[] = [
  { name: "和久井まゆ", href: "https://splendidnova.github.io/" },
  { name: "GuoPC", href: "https://guopcingithub.github.io/" },
];

/** 底部页脚（随页面滚动） */
function Footer() {
  /** 仅展示有来源链接的背景图 */
  const sources = backgrounds
    .map((bg, index) => ({ index: index + 1, source: bg.source }))
    .filter((item): item is { index: number; source: string } => Boolean(item.source));

  return (
    <footer className="border-t">
      <div className="mx-auto flex h-14 items-center justify-between gap-2 px-6 text-xs text-muted-foreground bg-background/24">
        {/* 左侧：友情链接 */}
        <div className="flex items-center gap-4">
          <span>友情链接</span>
          <div className="flex items-center gap-2">
            {friendLinks.map((link, i) => (
              <Fragment key={link.name}>
                {i > 0 && <span>·</span>}
                <ExternalLink
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.name}
                </ExternalLink>
              </Fragment>
            ))}
          </div>
        </div>
        {/* 右侧：背景图源 */}
        <div className="flex items-center gap-4">
          <span>背景图源</span>
          <div className="flex items-center gap-2">
            {sources.map((item, i) => (
              <Fragment key={item.index}>
                {i > 0 && <span>·</span>}
                <ExternalLink
                  href={item.source}
                  className="transition-colors hover:text-foreground"
                >
                  {item.index}
                </ExternalLink>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
