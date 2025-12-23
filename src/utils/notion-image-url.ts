/**
 * 노션 이미지 URL을 프록시 URL로 변환합니다.
 *
 * 노션의 S3 임시 URL은 약 1시간 후 만료되므로,
 * 프록시 API를 통해 항상 유효한 이미지를 제공합니다.
 */

/**
 * S3 임시 URL인지 확인합니다.
 */
export function isNotionS3Url(url: string): boolean {
  return url.includes("prod-files-secure.s3.us-west-2.amazonaws.com");
}

/**
 * 커버 이미지용 프록시 URL을 생성합니다.
 */
export function getCoverProxyUrl(pageId: string): string {
  return `/api/notion-image?type=cover&pageId=${pageId}`;
}

/**
 * 블록 이미지용 프록시 URL을 생성합니다.
 */
export function getBlockImageProxyUrl(pageId: string, blockId: string): string {
  return `/api/notion-image?type=block&pageId=${pageId}&blockId=${blockId}`;
}

/**
 * 노션 이미지 URL이 S3 임시 URL이면 프록시 URL로 변환하고,
 * 외부 영구 URL이면 그대로 반환합니다.
 */
export function getProxiedCoverUrl(
  originalUrl: string | null,
  pageId: string
): string | null {
  if (!originalUrl) return null;

  // S3 임시 URL인 경우 프록시 사용
  if (isNotionS3Url(originalUrl)) {
    return getCoverProxyUrl(pageId);
  }

  // 외부 영구 URL은 그대로 사용
  return originalUrl;
}
