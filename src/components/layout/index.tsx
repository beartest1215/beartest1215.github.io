import { Suspense } from "react";
import { Outlet } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * 页面整体布局：顶部固定横条 + 中间内容区 + 底部页脚
 */
function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <Spinner className="size-16" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
