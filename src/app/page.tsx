import BlogSection from '@/components/home/BlogSection';
import BubbleModelScene from '@/components/home/BubbleModelScene';
import ContactSection from '@/components/home/ContactSection';
import DesignPortfolioSection from '@/components/home/DesignPortfolioSection';
import DevelopmentHeroSection from '@/components/home/DevelopmentHeroSection';
import { getAllViewCounts } from '@/lib/firebase-admin';
import { getBlogPosts } from '@/services/notion.api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '요람일지',
  description:
    '프론트엔드 개발, 디자인, 프로젝트 경험을 담은 준희의 요람일지입니다. 최신 포스트와 프로젝트를 확인하세요.',
};

export const revalidate = 60;

export default async function MainPage() {
  const [posts, viewCounts] = await Promise.all([
    getBlogPosts(),
    getAllViewCounts(),
  ]);

  return (
    <div className="relative flex flex-col items-center justify-center text-center overflow-x-hidden overflow-y-hidden">
      {/* 섹션 0: 개발 포트폴리오 히어로 배너 */}
      <section
        className="w-full min-h-screen flex items-center justify-center py-20 pointer-events-auto"
        aria-label="Development Portfolio Section">
        <DevelopmentHeroSection />
      </section>

      {/* 섹션 1: 디자인 포트폴리오 */}
      <section
        className="w-full min-h-screen flex items-center justify-center py-20 pointer-events-auto"
        aria-label="Design Portfolio Section">
        <DesignPortfolioSection />
      </section>

      {/* 섹션 2: 블로그 */}
      <section
        className="w-full min-h-screen flex items-center justify-center py-20"
        aria-label="Blog Section">
        <BlogSection posts={posts} viewCounts={viewCounts} />
      </section>

      {/* 섹션 3: Contact */}
      <section
        className="w-full h-screen relative pointer-events-auto"
        aria-label="Contact Section">
        <ContactSection />
      </section>

      <BubbleModelScene />
    </div>
  );
}
