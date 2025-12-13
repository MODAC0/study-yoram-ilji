import { getBlogPosts } from "@/api/notion";
import BlogList from "@/components/BlogList";

// ISR: 60초마다 재검증하여 Notion 변경사항 반영
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <BlogList posts={posts} />
    </div>
  );
}
