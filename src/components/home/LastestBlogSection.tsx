"use client";

import { NotionPage } from "@/types/notion";
import { getNotionBlogImageUrl, getNotionBlogTitle } from "@/utils/getResource";
import dayjs from "dayjs";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 3;

interface Props {
  posts: NotionPage[];
  viewCounts: Record<string, number>;
}

export default function LastestBlogSection({ posts, viewCounts }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const displayPosts = useMemo(
    () =>
      posts
        // 조회수 내림차순 정렬 (조회수가 같으면 최신순)
        .sort((a, b) => {
          const viewsA = viewCounts[a.id] || 0;
          const viewsB = viewCounts[b.id] || 0;
          if (viewsB !== viewsA) return viewsB - viewsA;
          return dayjs(b.properties.작성일.created_time).diff(
            dayjs(a.properties.작성일.created_time)
          );
        })
        .slice(0, 6),
    [posts, viewCounts]
  );
  const totalPages = Math.ceil(displayPosts.length / ITEMS_PER_PAGE);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (info.offset.x > threshold && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const currentPosts = displayPosts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-2 text-start">
            <h2 className="text-3xl md:text-4xl font-bold">Latest Blog</h2>
            <p className="text-gray-500 dark:text-gray-400">
              최신 블로그 포스트를 확인하세요
            </p>
          </div>

          {/* 네비게이션 버튼 */}
          {totalPages > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 
                         disabled:opacity-30 disabled:cursor-not-allowed 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="이전 페이지"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 
                         disabled:opacity-30 disabled:cursor-not-allowed 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="다음 페이지"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 스와이프 가능한 카드 영역 */}
        <div className="overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 페이지 인디케이터 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "w-6 bg-point"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`페이지 ${index + 1}로 이동`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
