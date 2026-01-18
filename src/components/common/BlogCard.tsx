'use client';

import { NotionPage } from '@/types/notion.type';
import { getNotionBlogImageUrl, getNotionBlogTitle } from '@/utils/getResource';
import { getProxiedCoverUrl } from '@/utils/notion-image-url';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RetryImage from './RetryImage';

export default function BlogCard({
  post,
  viewCount,
}: {
  post: NotionPage;
  viewCount: number;
}) {
  const title = getNotionBlogTitle(post);
  const originalCoverUrl = getNotionBlogImageUrl(post);
  const coverImageUrl = getProxiedCoverUrl(originalCoverUrl, post.id);
  const category = post.properties.카테고리.select?.name;
  const createdDate = dayjs(post.properties.생성일.created_time).format(
    'YYYY.MM.DD',
  );

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <motion.article className="flex flex-col h-full overflow-hidden transition-shadow duration-300">
        {/* 이미지 영역 */}
        <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-gray-100 rounded-2xl to-gray-200 dark:from-gray-800 dark:to-gray-700">
          {coverImageUrl ? (
            <RetryImage
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
              }
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
                             text-gray-800 dark:text-gray-200 rounded-full backdrop-blur-sm">
                {category}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 flex flex-col text-start flex-1 p-4 z-10 bg-white/65 backdrop-blur-xs w-full">
            <h3
              className="font-semibold text-lg line-clamp-2 mb-2 text-dark-900
                        group-hover:text-point transition-all duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-dark-400 mt-auto">{createdDate}</p>
              <span className="text-sm text-dark-400 mt-auto">·</span>
              <span className="text-sm text-dark-400 mt-auto">
                {viewCount ?? 0} view
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
