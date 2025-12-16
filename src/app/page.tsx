import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import HeroSection from "@/components/home/HeroSection";
import { getAllViewCounts } from "@/lib/firebase-admin";
import { getBlogPosts } from "@/services/notion.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "요람일지",
  description:
    "프론트엔드 개발, 디자인, 프로젝트 경험을 담은 준희의 요람일지입니다. 최신 포스트와 프로젝트를 확인하세요.",
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
      <AboutSection />
      <BlogSection posts={posts} viewCounts={viewCounts} />
    </div>
  );
}
