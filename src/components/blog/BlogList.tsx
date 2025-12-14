"use client";

import { NotionPage } from "@/types/notion.type";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BlogCard from "../common/BlogCard";

interface Props {
  posts: NotionPage[];
  viewCounts: Record<string, number>;
}
const ITEMS_PER_LOAD = 9;

export default function BlogList({ posts, viewCounts }: Props) {
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
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
            {
              "bg-point text-white": selectedCategory === null,
              "bg-light-400 dark:bg-dark-600 text-dark-600 dark:text-light-300 hover:bg-point-light dark:hover:bg-point-dark":
                selectedCategory !== null,
            }
          )}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
              {
                "bg-point text-white": selectedCategory === category,
                "bg-light-300 dark:bg-dark-700 text-dark-600 dark:text-light-300 hover:bg-point-light dark:hover:bg-point-dark":
                  selectedCategory !== category,
              }
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 필터 결과 카운트 */}
      <p className="text-sm text-dark-600 pb-6 border-b border-dark-400/30">
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
              <BlogCard post={post} viewCount={viewCounts[post.id]} />
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
          <p className="text-dark-300 dark:text-dark-500">
            해당 카테고리에 포스트가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
