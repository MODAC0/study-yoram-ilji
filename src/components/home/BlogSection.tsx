'use client';

import { NotionPage } from '@/types/notion.type';
import dayjs from 'dayjs';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import BlogCard from '../common/BlogCard';

const ITEMS_PER_PAGE = 3;

interface Props {
  posts: NotionPage[];
  viewCounts: Record<string, number>;
}

export default function BlogSection({ posts, viewCounts }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const displayPosts = useMemo(
    () =>
      posts
        .sort((a, b) => {
          const viewsA = viewCounts[a.id] || 0;
          const viewsB = viewCounts[b.id] || 0;
          if (viewsB !== viewsA) return viewsB - viewsA;
          return dayjs(b.properties.발행일.last_edited_time).diff(
            dayjs(a.properties.발행일.last_edited_time),
          );
        })
        .slice(0, 6),
    [posts, viewCounts],
  );
  const totalPages = Math.ceil(displayPosts.length / ITEMS_PER_PAGE);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
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
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-7xl w-full px-6 relative z-10 pointer-events-auto">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-center flex-col gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <Link href="/blog" className="group inline-flex items-center gap-2">
            <h2 className="text-3xl md:text-4xl font-bold group-hover:text-point transition-all duration-300">
              최신 인기 블로그
            </h2>
            <svg
              className="w-6 h-6 text-dark-400 group-hover:text-point group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <p className="text-dark-300 dark:text-dark-500">
            최신 인기 블로그 포스트를 확인하세요
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
              aria-label="이전 페이지">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 
                         disabled:opacity-30 disabled:cursor-not-allowed 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="다음 페이지">
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
          className="cursor-grab active:cursor-grabbing">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  viewCount={viewCounts[post.id]}
                />
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
                  ? 'w-6 bg-point'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`페이지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
