import { getBlogPosts } from "@/api/notion";
import BubbleModelScene from "@/components/home/BubbleModel/BubbleModelScene";
import Table from "@/components/table";

export default async function MainPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4 w-full">
            <p className="text-xl text-gray-700">안녕하세요. 김준희입니다.</p>
            <h1 className="text-5xl font-bold mb-4 whitespace-nowrap">
              어떤 프로젝트가 궁금하신가요?
            </h1>
          </div>
        </div>
        <BubbleModelScene />
      </div>
      {/* <HeroScene /> */}

      <Table posts={posts} />
    </div>
  );
}
