"use client";

import { NotionPage, NotionTitleProperty } from "@/types/notion";
import { Badge } from "@heroui/react";
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

export default function BlogList({ posts }: BlogPostProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => {
        const title = getTitle(post.properties.제목);
        const tags = post.properties.태그.multi_select;
        const createdDate = formatDate(post.properties.작성일.date?.start);

        return (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="p-6 cursor-pointer"
          >
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
