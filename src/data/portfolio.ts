// 포트폴리오 카테고리 타입
export type PortfolioCategory = "development" | "design";

// 공통 포트폴리오 베이스 타입
interface PortfolioBase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  role: string;
  images: string[];
  color: string;
  thumbnail: string;
  category: PortfolioCategory;
}

// 개발 포트폴리오 타입
export interface DevelopmentPortfolio extends PortfolioBase {
  category: "development";
  team?: string;
  techStack: string[];
  features: string[];
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
  };
}

// 디자인 포트폴리오 타입
export interface DesignPortfolio extends PortfolioBase {
  category: "design";
  tools: string[]; // Figma, Photoshop 등
  type: string; // UI/UX, 그래픽, 브랜딩 등
}

// 통합 타입
export type PortfolioProject = DevelopmentPortfolio | DesignPortfolio;

// 타입 가드
export function isDevelopmentPortfolio(
  project: PortfolioProject
): project is DevelopmentPortfolio {
  return project.category === "development";
}

export function isDesignPortfolio(
  project: PortfolioProject
): project is DesignPortfolio {
  return project.category === "design";
}

export const portfolioProjects: PortfolioProject[] = [
  // 디자인 포트폴리오
  {
    id: "youandus",
    category: "design",
    title: "YOUANDUS",
    subtitle: "하이엔드 인테리어 큐레이션 브랜드 웹사이트",
    description:
      "30여 년의 노하우를 바탕으로 패브릭, 카펫, 바닥재, 벽 마감재, 주방, 가구에 이르기까지 하이엔드 공간을 위한 토탈 큐레이션 브랜드의 웹사이트 디자인입니다. 세련된 비주얼과 직관적인 네비게이션으로 브랜드 아이덴티티를 효과적으로 전달합니다.",
    period: "2024",
    role: "웹 디자인",
    type: "웹사이트 UI/UX",
    tools: ["Figma", "Adobe Photoshop"],
    images: Array.from(
      { length: 26 },
      (_, i) => `/portfolio/youandus/${i + 1}.webp`
    ),
    color: "#1C1C1C",
    thumbnail: "/portfolio/youandus/1.webp",
  },

  // 개발 포트폴리오 예시 (추후 추가용)
  {
    id: "example-dev",
    category: "development",
    title: "개발 프로젝트 예시",
    subtitle: "풀스택 웹 애플리케이션",
    description: "...",
    period: "2024.01 - 2024.06",
    role: "프론트엔드 개발",
    team: "3인",
    techStack: ["Next.js", "TypeScript", "Prisma"],
    features: ["기능1", "기능2"],
    links: { github: "https://github.com/...", live: "https://..." },
    images: [],
    color: "#4A90D9",
    thumbnail: "/portfolio/youandus/1.webp",
  },
];

export function getPortfolioById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.id === id);
}

export function getPortfoliosByCategory(
  category: PortfolioCategory
): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.category === category);
}

// 카테고리 라벨
export const categoryLabels: Record<PortfolioCategory, string> = {
  development: "개발",
  design: "디자인",
};
