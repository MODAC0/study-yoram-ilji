import PortfolioDetailClient from '@/components/portfolio/PortfolioDetailClient';
import {
  getPortfolioById,
  isDevelopmentPortfolio,
  portfolioProjects,
} from '@/data/portfolio';
import {
  generateBreadcrumbJsonLd,
  generatePortfolioJsonLd,
  siteConfig,
} from '@/lib/seo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getPortfolioById(id);

  if (!project) {
    return { title: '프로젝트를 찾을 수 없습니다' };
  }

  const skills = isDevelopmentPortfolio(project)
    ? project.techStack
    : project.tools;

  return {
    title: `${project.title} | 포트폴리오`,
    description: project.description,
    keywords: [
      project.title,
      '포트폴리오',
      project.category === 'development' ? '개발' : '디자인',
      ...skills.slice(0, 5),
    ],
    alternates: {
      canonical: `/portfolio/${id}`,
    },
    openGraph: {
      title: `${project.title} | 포트폴리오 | ${siteConfig.name}`,
      description: project.description,
      type: 'article',
      url: `${siteConfig.url}/portfolio/${id}`,
      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getPortfolioById(id);

  if (!project) {
    notFound();
  }

  const skills = isDevelopmentPortfolio(project)
    ? project.techStack
    : project.tools;

  const portfolioJsonLd = generatePortfolioJsonLd({
    title: project.title,
    description: project.description,
    image: project.thumbnail,
    url: `${siteConfig.url}/portfolio/${id}`,
    dateCreated: project.period,
    skills,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: '홈', url: siteConfig.url },
    { name: '포트폴리오', url: `${siteConfig.url}/portfolio` },
    { name: project.title, url: `${siteConfig.url}/portfolio/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PortfolioDetailClient project={project} />
    </>
  );
}
