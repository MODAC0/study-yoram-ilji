import BlogSection from "@/components/home/BlogSection";
import HeroSection from "@/components/home/HeroSection";
import { getAllViewCounts } from "@/lib/firebase-admin";
import { getBlogPosts } from "@/services/notion.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description:
    "개발과 프로젝트에 대한 기록을 담은 블로그입니다. 최신 포스트와 프로젝트를 확인하세요.",
};

export const revalidate = 60;

export default async function MainPage() {
  const [posts, viewCounts] = await Promise.all([
    getBlogPosts(),
    getAllViewCounts(),
  ]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <HeroSection />
      <BlogSection posts={posts} viewCounts={viewCounts} />
    </div>
  );
}
