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
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setKey((prev) => prev + 1);
      }, retryDelay);
    } else {
      setHasError(true);
    }
  }, [retryCount, maxRetries, retryDelay]);

  if (hasError) {
    return (
      fallback ?? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-4xl">📝</span>
        </div>
      )
    );
  }

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
