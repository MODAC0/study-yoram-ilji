import ViewCounter from '@/components/blog/ViewCounter';
import NotionBlock from '@/components/common/NotionBlock';
import {
  generateArticleJsonLd,
  generateSeoMetadata,
  siteConfig,
} from '@/lib/seo';
import { getBlogPosts, getPost, getPostContent } from '@/services/notion.api';
import { NotionPage } from '@/types/notion.type';
import { getNotionBlogImageUrl, getNotionBlogTitle } from '@/utils/getResource';
import { getProxiedCoverUrl } from '@/utils/notion-image-url';
import { BlockObjectResponse } from '@notionhq/client';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = (await getPost(id)) as NotionPage;
  const title = getNotionBlogTitle(post);
  const coverImage = getNotionBlogImageUrl(post);
  const category = post.properties.카테고리.select?.name;

  return generateSeoMetadata({
    title,
    description: `${category ? `[${category}] ` : ''}${title}`,
    image: coverImage,
    pathname: `/blog/${id}`,
  });
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = (await getPost(id)) as NotionPage;
  const content = await getPostContent(id);
  const category = post.properties.카테고리.select?.name;
  const title = getNotionBlogTitle(post);
  const originalCoverImage = getNotionBlogImageUrl(post);
  const coverImage = getProxiedCoverUrl(originalCoverImage, id);
  const publishedTime =
    post.properties.생성일.created_time ||
    post.properties.발행일.last_edited_time;

  const jsonLd = generateArticleJsonLd({
    title,
    description: title,
    publishedTime,
    modifiedTime: post.last_edited_time,
    author: siteConfig.author.name,
    image: coverImage,
    url: `${siteConfig.url}/blog/${id}`,
  });

  console.log(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative h-[calc(50vh)] overflow-hidden">
        {/* <div className="absolute inset-0 bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-transparent opacity-50" /> */}
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            unoptimized
          />
        )}
      </div>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="flex flex-col gap-2">
          {category && (
            <span className="w-fit text-xs font-medium rounded-full backdrop-blur-sm px-2 py-1 border-point-light border text-point-light">
              {category}
            </span>
          )}
          <h1 className="text-4xl font-bold mb-4">
            {post.properties.이름.title[0].plain_text}
          </h1>
        </div>
        <div className="flex items-center mb-8 gap-2 text-dark-400">
          <span>
            발행일: {dayjs(post.created_time).format('YYYY년 MM월 DD일')}
          </span>
          <span>·</span>
          <span>
            수정일: {dayjs(post.last_edited_time).format('YYYY년 MM월 DD일')}
          </span>
          <span>·</span>
          <ViewCounter postId={id} />
        </div>
        <article>
          {content.results.map((block) => (
            <NotionBlock
              key={block.id}
              block={block as BlockObjectResponse}
              pageId={id}
            />
          ))}
        </article>
      </div>
    </>
  );
}
