"use client";

import Image, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

interface RetryImageProps extends Omit<ImageProps, "onError"> {
  /** 최대 재시도 횟수 (기본값: 3) */
  maxRetries?: number;
  /** 재시도 간 지연 시간 ms (기본값: 1000) */
  retryDelay?: number;
  /** 로드 실패 시 보여줄 fallback */
  fallback?: React.ReactNode;
}

export default function RetryImage({
  src,
  alt,
  maxRetries = 3,
  retryDelay = 1000,
  fallback,
  ...props
}: RetryImageProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      // 지연 후 재시도
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setKey((prev) => prev + 1); // key 변경으로 Image 컴포넌트 리마운트
      }, retryDelay);
    } else {
      // 최대 재시도 초과 시 에러 상태로 전환
      setHasError(true);
    }
  }, [retryCount, maxRetries, retryDelay]);

  // 에러 상태일 때 fallback 표시
  if (hasError) {
    return (
      fallback ?? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-4xl">📝</span>
        </div>
      )
    );
  }

  // 재시도 시 캐시 우회를 위해 timestamp 추가
  const srcWithRetry =
    retryCount > 0 && typeof src === "string"
      ? `${src}${src.includes("?") ? "&" : "?"}retry=${retryCount}`
      : src;

  return (
    <Image
      key={key}
      src={srcWithRetry}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
