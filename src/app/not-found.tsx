"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // replace를 사용하여 뒤로가기 시 다시 404 페이지로 오지 않도록 처리
    router.replace("/");
  }, [router]);

  return null; // 화면에 아무것도 표시하지 않음
}
