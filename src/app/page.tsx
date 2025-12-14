import { getBlogPosts } from "@/api/notion";
import HeroSection from "@/components/home/HeroSection";
import LastestBlogSection from "@/components/home/LastestBlogSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description:
    "개발과 프로젝트에 대한 기록을 담은 블로그입니다. 최신 포스트와 프로젝트를 확인하세요.",
};

export default async function MainPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <HeroSection />
      <LastestBlogSection posts={posts} />
    </div>
  );
}
