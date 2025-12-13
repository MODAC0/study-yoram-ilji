import { getBlogPosts } from "@/api/notion";
import HeroSection from "@/components/home/HeroSection";
import Table from "@/components/table";

export default async function MainPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <HeroSection />
      <Table posts={posts} />
    </div>
  );
}
