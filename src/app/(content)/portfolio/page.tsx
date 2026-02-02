import PortfolioListClient from '@/components/portfolio/PortfolioListClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '포트폴리오 | 요람일지',
  description: '개발 및 디자인 프로젝트 경험과 작업물을 확인하세요.',
};

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto max-lg:px-5">
      <h1 className="text-4xl font-bold mb-8">포트폴리오</h1>
      <PortfolioListClient />
    </div>
  );
}
