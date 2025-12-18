import PortfolioDetailClient from "@/components/portfolio/PortfolioDetailClient";
import { getPortfolioById, portfolioProjects } from "@/data/portfolio";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  return {
    title: `${project.title} | 포트폴리오`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getPortfolioById(id);

  if (!project) {
    notFound();
  }

  return <PortfolioDetailClient project={project} />;
}
