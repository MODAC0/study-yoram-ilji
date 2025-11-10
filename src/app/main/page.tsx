import { getBlogPosts } from "@/api/notion";
import Table from "@/components/table";

export default async function MainPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold mb-4">안녕하세요, Yoram Ilji입니다.</h1>
      <p className="text-xl text-gray-700 mb-8">
        기술과 일상을 기록하는 공간입니다.
      </p>
      <Table posts={posts} />
    </div>
  );
}
