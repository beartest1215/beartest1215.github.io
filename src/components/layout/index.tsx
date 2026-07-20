import { Suspense } from "react";
import { Outlet } from "react-router";
import { AudioController } from "@/components/audio-controller";
import { Background } from "@/components/background";
import { LoadingPlaceholder } from "@/components/loading-placeholder";
import { Header } from "./header";
import { Footer } from "./footer";

/** 页面整体布局：顶部 sticky + 中间内容 + 底部页脚，均随文档流 */
function Layout() {
  return (
    <>
      <Background />
      {/* 全局音频控制器：在布局层维护唯一 audio 元素，状态来自 zustand store */}
      <AudioController />
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <Suspense fallback={<LoadingPlaceholder spinnerSize="size-12" />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export { Layout };
