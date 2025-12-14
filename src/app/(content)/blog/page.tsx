import BlogList from "@/components/blog/BlogList";
import { getAllViewCounts } from "@/lib/firebase-admin";
import { getBlogPosts } from "@/services/notion.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "개발, 기술, 프로젝트에 관한 글을 공유합니다. 다양한 카테고리의 포스트를 확인하세요.",
  openGraph: {
    title: "블로그",
    description: "개발, 기술, 프로젝트에 관한 글을 공유합니다.",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, viewCounts] = await Promise.all([
    getBlogPosts(),
    getAllViewCounts(),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <BlogList posts={posts} viewCounts={viewCounts} />
    </div>
  );
}
