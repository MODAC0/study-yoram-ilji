import ViewCounter from "@/components/blog/ViewCounter";
import NotionBlock from "@/components/common/NotionBlock";
import {
  generateArticleJsonLd,
  generateSeoMetadata,
  siteConfig,
} from "@/lib/seo";
import { getBlogPosts, getPost, getPostContent } from "@/services/notion.api";
import { NotionPage } from "@/types/notion.type";
import { getNotionBlogImageUrl, getNotionBlogTitle } from "@/utils/getResource";
import { BlockObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import { Metadata } from "next";

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
    description: `${category ? `[${category}] ` : ""}${title}`,
    image: coverImage,
    pathname: `/blog/${id}`,
  });
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = (await getPost(id)) as NotionPage;
  const content = await getPostContent(id);

  const title = getNotionBlogTitle(post);
  const coverImage = getNotionBlogImageUrl(post);
  const publishedTime =
    post.properties.발행일.date?.start || post.last_edited_time;

  const jsonLd = generateArticleJsonLd({
    title,
    description: title,
    publishedTime,
    modifiedTime: post.last_edited_time,
    author: siteConfig.author.name,
    image: coverImage,
    url: `${siteConfig.url}/blog/${id}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">
          {post.properties.제목.title[0].plain_text}
        </h1>
        <div className="flex items-center mb-8 gap-2 text-dark-400">
          <span>
            발행일: {dayjs(post.created_time).format("YYYY년 MM월 DD일")}
          </span>
          <span>·</span>
          <span>
            수정일: {dayjs(post.last_edited_time).format("YYYY년 MM월 DD일")}
          </span>
          <span>·</span>
          <span>{post.properties.카테고리.select?.name}</span>
          <span>·</span>
          <ViewCounter postId={id} />
        </div>
        <article>
          {content.results.map((block) => (
            <NotionBlock key={block.id} block={block as BlockObjectResponse} />
          ))}
        </article>
      </div>
    </>
  );
}
