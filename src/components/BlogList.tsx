"use client";

import { NotionPage, NotionTitleProperty } from "@/types/notion";
import { Badge } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  posts: NotionPage[];
}

const getTitle = (titleProp: NotionTitleProperty) => {
  return titleProp.title[0]?.plain_text || "제목 없음";
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getCoverImageUrl = (post: NotionPage): string | null => {
  const cover = post.cover;
  if (!cover) {
    return null;
  }

  if (cover.type === "file") {
    return cover.file.url;
  }
  if (cover.type === "external") {
    return cover.external.url;
  }
  return null;
};

export default function BlogList({ posts }: BlogPostProps) {
  console.log(posts);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => {
        const title = getTitle(post.properties.제목);
        const tags = post.properties.태그.multi_select;
        const createdDate = formatDate(post.properties.작성일.date?.start);
        const coverImageUrl = getCoverImageUrl(post);

        return (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="p-6 cursor-pointer"
          >
            {coverImageUrl && (
              <div className="relative w-full h-48 bg-gray-100">
         
                <Image
                  src={coverImageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 hover:scale-[1.03]"
                  priority={true} // 첫 번째 항목에만 적용하거나, 성능상 필요한 경우 조정
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-gray-600 mb-4">{createdDate}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag.id} color="primary" variant="solid">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
