import BlogSection from "@/components/home/BlogSection";
import BubbleModelScene from "@/components/home/BubbleModel/BubbleModelScene";
import ContactSection from "@/components/home/ContactSection";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";
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
      {/* 3D 배경 - fixed로 화면에 고정 */}
      <BubbleModelScene />

      <section className="w-full h-screen" aria-label="Text Section 1" />
      <section className="w-full h-screen" aria-label="Text Section 2" />
      <section className="w-full h-screen" aria-label="Text Section 3" />
      <section className="w-full h-screen" aria-label="Text Section 4" />

      {/* 섹션 3: 블로그 */}
      <section
        className="w-full min-h-screen flex items-center justify-center py-20"
        aria-label="Blog Section"
      >
        <BlogSection posts={posts} viewCounts={viewCounts} />
      </section>

      {/* 섹션 4: 포트폴리오 캐러셀 (구체로 변환) */}
      <section
        className="w-full min-h-screen flex items-center justify-center py-20 pointer-events-auto"
        aria-label="Portfolio Section"
      >
        <PortfolioCarousel />
      </section>

      {/* 섹션 5: Contact Us (구체가 왼쪽으로) */}
      <section
        className="w-full h-screen relative pointer-events-auto"
        aria-label="Contact Section"
      >
        <ContactSection />
      </section>
    </div>
  );
}
