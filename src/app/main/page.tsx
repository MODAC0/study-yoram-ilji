import { getBlogPosts } from "@/api/notion";
import HeroSection from "@/components/home/HeroSection";
import LastestBlogSection from "@/components/home/LastestBlogSection";

export default async function MainPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <HeroSection />
      <LastestBlogSection posts={posts} />
    </div>
  );
}
