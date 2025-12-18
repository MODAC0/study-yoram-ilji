"use client";

import {
  isDesignPortfolio,
  isDevelopmentPortfolio,
  PortfolioProject,
} from "@/data/portfolio";
import DesignPortfolioDetail from "./DesignPortfolioDetail";
import DevelopmentPortfolioDetail from "./DevelopmentPortfolioDetail";

interface Props {
  project: PortfolioProject;
}

export default function PortfolioDetailClient({ project }: Props) {
  // 카테고리에 따라 다른 컴포넌트 렌더링
  if (isDesignPortfolio(project)) {
    return <DesignPortfolioDetail project={project} />;
  }

  if (isDevelopmentPortfolio(project)) {
    return <DevelopmentPortfolioDetail project={project} />;
  }

  return null;
}
