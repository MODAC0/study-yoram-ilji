import PortfolioListClient from "@/components/portfolio/PortfolioListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오 | 요람일지",
  description: "개발 및 디자인 프로젝트 경험과 작업물을 확인하세요.",
};

export default function PortfolioPage() {
  return <PortfolioListClient />;
}
