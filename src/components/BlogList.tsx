"use client";

import { NotionPage } from "@/types/notion";
import { getNotionBlogImageUrl, getNotionBlogTitle } from "@/utils/getResource";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  posts: NotionPage[];
}

export default function BlogList({ posts }: BlogPostProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => {
        console.log(post.properties.작성자);
        const title = getNotionBlogTitle(post);
        const createdDate = dayjs(post.properties.작성일.created_time).format(
          "YYYY년 MM월 DD일"
        );
        const coverImageUrl = getNotionBlogImageUrl(post);
        const category = post.properties.카테고리.select?.name;
        return (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="flex flex-col gap-4 cursor-pointer"
          >
            {coverImageUrl && (
              <figure className="relative w-full h-48 bg-gray-100">
                <Image
                  src={coverImageUrl}
                  alt={title}
                  fill
                  priority
                  className="rounded-xl transition-transform duration-300 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>
            )}
            <div className="flex flex-col gap-2">
              <p>{category}</p>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p>{createdDate}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
