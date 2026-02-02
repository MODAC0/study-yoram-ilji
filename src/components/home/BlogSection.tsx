'use client';

import { NotionPage } from '@/types/notion.type';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogCard from '../common/BlogCard';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface Props {
  posts: NotionPage[];
  viewCounts: Record<string, number>;
}

export default function BlogSection({ posts, viewCounts }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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

  return (
    <div className="max-w-7xl w-full px-6 relative z-10 pointer-events-auto">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col gap-2">
          <Link href="/blog" className="group inline-flex items-center gap-2">
            <h2 className="text-3xl md:text-4xl font-bold group-hover:text-point transition-all duration-300">
              인기 블로그
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
          <p className="text-dark-400 dark:text-dark-500">
            조회수 기준 인기 포스트
          </p>
        </div>
      </div>

      {/* 스와이프 캐러셀 */}
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        initialSlide={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        speed={500}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="overflow-visible! py-4">
        {displayPosts.map((post, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={post.id}
              className="w-[280px]! sm:w-[320px]! md:w-[380px]! select-none">
              <div
                className={`transition-all duration-300 ${
                  isActive ? 'scale-100' : 'scale-95 opacity-70'
                }`}>
                <BlogCard post={post} viewCount={viewCounts[post.id]} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-8">
        {displayPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-6 bg-point'
                : 'w-1.5 bg-light-400 dark:bg-dark-600 hover:bg-point/50'
            }`}
            aria-label={`${index + 1}번 포스트로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
