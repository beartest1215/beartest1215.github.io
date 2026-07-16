import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router";
import { useTheme } from "@/components/theme-provider";
import { Button, buttonVariants } from "@/components/ui/button";

/** GitHub 图标 */
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-3.5"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

/** 订阅系统深色模式偏好 */
function usePrefersDark() {
  return useSyncExternalStore(
    (onChange) => {
      darkMediaQuery.addEventListener("change", onChange);
      return () => darkMediaQuery.removeEventListener("change", onChange);
    },
    () => darkMediaQuery.matches,
  );
}

/** 深色/浅色主题切换按钮 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const systemDark = usePrefersDark();
  const isDark = theme === "system" ? systemDark : theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="切换主题"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}

/** 顶部固定横条 */
function Header() {
  const getNavLinkClassNames = ({ isActive }: { isActive: boolean }) => `text-lg transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 items-center justify-between px-6">
        <span className="font-semibold">BearBin</span>
        <nav className="flex gap-6">
          <NavLink
            to="/about"
            className={getNavLinkClassNames}
          >
            关于
          </NavLink>
          <NavLink
            to="/toys"
            className={getNavLinkClassNames}
          >
            玩具
          </NavLink>
          <NavLink
            to="/notes"
            className={getNavLinkClassNames}
          >
            杂记
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/BearBin1215/BearBin1215.github.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <GithubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { Header };
