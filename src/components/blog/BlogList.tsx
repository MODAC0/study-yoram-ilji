"use client";

import { NotionPage } from "@/types/notion";
import { getNotionBlogImageUrl, getNotionBlogTitle } from "@/utils/getResource";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface BlogPostProps {
  posts: NotionPage[];
}

const ITEMS_PER_LOAD = 9;

export default function BlogList({ posts }: BlogPostProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement>(null);

  // 고유 카테고리 추출
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach((post) => {
      const category = post.properties.카테고리.select?.name;
      if (category) categorySet.add(category);
    });
    return Array.from(categorySet).sort();
  }, [posts]);

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(
      (post) => post.properties.카테고리.select?.name === selectedCategory
    );
  }, [posts, selectedCategory]);

  const displayPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) =>
        Math.min(prev + ITEMS_PER_LOAD, filteredPosts.length)
      );
    }
  }, [hasMore, filteredPosts.length]);

  // 카테고리 변경 시 displayCount 초기화
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setDisplayCount(ITEMS_PER_LOAD);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loadMore]);

  return (
    <div className="flex flex-col gap-8">
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-point text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-point text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 필터 결과 카운트 */}
      <p className="text-sm text-secondary">
        {filteredPosts.length}개의 포스트
      </p>

      {/* 블로그 그리드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (index % ITEMS_PER_LOAD) * 0.05,
              }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 로딩 인디케이터 */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="flex gap-2">
            <span
              className="w-2 h-2 bg-point rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-point rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-point rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}

      {/* 포스트 없음 메시지 */}
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-4xl mb-4">📭</span>
          <p className="text-gray-500 dark:text-gray-400">
            해당 카테고리에 포스트가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}

function BlogCard({ post }: { post: NotionPage }) {
  const title = getNotionBlogTitle(post);
  const coverImageUrl = getNotionBlogImageUrl(post);
  const category = post.properties.카테고리.select?.name;
  const createdDate = dayjs(post.properties.작성일.created_time).format(
    "YYYY.MM.DD"
  );

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <motion.article className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden transition-shadow duration-300">
        {/* 이미지 영역 */}
        <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-gray-100 rounded-2xl to-gray-200 dark:from-gray-800 dark:to-gray-700">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}

          {/* 카테고리 태그 */}
          {category && (
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-black/70 
                             text-gray-800 dark:text-gray-200 rounded-full backdrop-blur-sm"
              >
                {category}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 flex flex-col text-start flex-1 p-4 z-10 bg-white/65 backdrop-blur-xs w-full">
            <h3
              className="font-semibold text-lg line-clamp-2 mb-2 text-primary
                        group-hover:text-point transition-all duration-300"
            >
              {title}
            </h3>
            <p className="text-sm text-secondary dark:text-secondary mt-auto">
              {createdDate}
            </p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
