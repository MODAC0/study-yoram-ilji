import { Metadata } from "next";

export const siteConfig = {
  name: "요람일지",
  description: "개발과 프로젝트에 대한 기록을 담은 블로그입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yoram-ilji.vercel.app",
  author: {
    name: "MODAC",
    url: "https://github.com/MODAC0",
  },
  locale: "ko_KR",
  themeColor: "#ff675b",
};

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string | null;
  noIndex?: boolean;
  pathname?: string;
}

export function generateSeoMetadata({
  title,
  description,
  image,
  noIndex = false,
  pathname = "",
}: GenerateMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${pathname}`;
  const ogImage = image || `${siteConfig.url}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  };
}

// 블로그 포스트용 JSON-LD 구조화 데이터 생성
export function generateArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  image,
  url,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string | null;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    image: image || undefined,
    url: url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
