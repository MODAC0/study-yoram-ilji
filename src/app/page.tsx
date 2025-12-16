import BlogSection from "@/components/home/BlogSection";
import BubbleModelScene from "@/components/home/BubbleModel/BubbleModelScene";
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
    <div className="relative flex flex-col items-center justify-center text-center">
      {/* 3D 배경 */}
      <BubbleModelScene />

      {/* 스크롤 섹션들 - 각 섹션마다 100vh 높이, snap-start로 스냅 */}
      <section className="w-full h-screen snap-start" aria-label="Section 1" />
      <section className="w-full h-screen snap-start" aria-label="Section 2" />
      <section className="w-full h-screen snap-start" aria-label="Section 3" />
      <section className="w-full h-screen snap-start" aria-label="Section 4" />

      {/* 블로그 섹션 */}
      <div className="w-full h-screen snap-start flex items-center justify-center">
        <BlogSection posts={posts} viewCounts={viewCounts} />
      </div>
    </div>
  );
}
