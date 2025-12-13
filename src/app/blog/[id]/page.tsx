import { getPost, getPostContent } from "@/api/notion";
import NotionBlock from "@/components/NotionBlock";
import { NotionPage } from "@/types/notion";
import { BlockObjectResponse } from "@notionhq/client";

// ISR: 60초마다 재검증하여 Notion 변경사항 반영
export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = (await getPost(id)) as NotionPage;
  const content = await getPostContent(id);
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">
        {post.properties.제목.title[0].plain_text}
      </h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>{post.properties.발행일.date?.start}</span>
        <span className="mx-2">·</span>
        <span>{post.properties.카테고리.select?.name}</span>
      </div>
      <article>
        {content.results.map((block) => (
          <NotionBlock key={block.id} block={block as BlockObjectResponse} />
        ))}
      </article>
    </div>
  );
}
