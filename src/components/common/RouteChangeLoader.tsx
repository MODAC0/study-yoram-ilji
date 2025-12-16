"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FullScreenLoader from "./FullScreenLoader";

function RouteChangeLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 첫 진입 시 로딩 애니메이션
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // 라우트 변경 감지
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // 링크 클릭 시 로딩 시작
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        // 내부 링크인 경우만 처리
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          // 현재 경로와 다른 경우만 로딩 표시
          if (href !== pathname) {
            setIsLoading(true);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return <FullScreenLoader isLoading={isInitialLoad || isLoading} />;
}

export default function RouteChangeLoader() {
  return (
    <Suspense fallback={null}>
      <RouteChangeLoaderContent />
    </Suspense>
  );
}
