"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// 포트폴리오 목업 데이터
const portfolioItems = [
  {
    id: 1,
    title: "Spelling Bee",
    description: "Learn spelling through fun word games and challenges",
    image: "/images/portfolio/yoram-ilji.png",
    color: "#E8D5C4",
  },
  {
    id: 2,
    title: "Video Marketer",
    description: "Create engaging marketing videos with AI assistance",
    image: "/images/portfolio/ai-chat.png",
    color: "#1C3A4F",
  },
  {
    id: 3,
    title: "Blog Post Writer",
    description: "Generate high-quality blog content effortlessly",
    image: "/images/portfolio/dashboard.png",
    color: "#A8B87C",
  },
  {
    id: 4,
    title: "Book Recs",
    description:
      "Get book recommendations and discover your next favorite read",
    image: "/images/portfolio/ecommerce.png",
    color: "#6B6B6B",
  },
  {
    id: 5,
    title: "Business Profiler",
    description: "Create professional business profiles instantly",
    image: "/images/portfolio/business.png",
    color: "#F5D5D5",
  },
  {
    id: 6,
    title: "City Builder",
    description: "Design and build your dream city from scratch",
    image: "/images/portfolio/city.png",
    color: "#D4C4B0",
  },
  {
    id: 7,
    title: "Fashion Stylist",
    description: "Get personalized fashion advice and outfit ideas",
    image: "/images/portfolio/fashion.png",
    color: "#F0E6E0",
  },
];

// 카드 위치 및 스타일 설정 (아치형 배치)
const getCardStyle = (index: number, centerIndex: number, total: number) => {
  const offset = index - centerIndex;
  const absOffset = Math.abs(offset);

  // 보이는 카드 범위 설정 (중앙 ± 3)
  if (absOffset > 3) {
    return {
      x: offset > 0 ? 1000 : -1000,
      y: 200,
      rotate: offset > 0 ? 30 : -30,
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    };
  }

  const xSpacing = 320;
  const x = offset * xSpacing;

  const archHeight = 400; // 더 둥근 아치형
  const y = absOffset * absOffset * (archHeight / 9);

  const rotate = offset * 12;

  // 크기 (중앙이 가장 큼)
  const scale =
    absOffset === 0 ? 1 : absOffset === 1 ? 0.9 : absOffset === 2 ? 0.8 : 0.7;

  // 투명도
  const opacity =
    absOffset === 0 ? 1 : absOffset === 1 ? 0.9 : absOffset === 2 ? 0.7 : 0.5;

  // z-index (중앙이 가장 위)
  const zIndex = total - absOffset;

  return { x, y, rotate, scale, opacity, zIndex };
};

export default function PortfolioSection() {
  const [centerIndex, setCenterIndex] = useState(3); // Book Recs가 중앙

  const handleCardClick = (index: number) => {
    setCenterIndex(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 pointer-events-auto">
      {/* 섹션 헤더 */}
      <div className="mb-20">
        <Link href="/portfolio" className="group">
          <h2 className="text-3xl md:text-4xl font-bold group-hover:text-point transition-all duration-300">
            포트폴리오
          </h2>
        </Link>
        <p className="text-dark-300 dark:text-dark-500">
          다양한 프로젝트를 경험해보세요.
        </p>
      </div>

      {/* 카드 갤러리 */}
      <div className="relative h-[550px] flex items-center justify-center overflow-visible">
        <div
          className="relative w-full h-full"
          style={{ perspective: "1400px" }}
        >
          {portfolioItems.map((item, index) => {
            const style = getCardStyle(
              index,
              centerIndex,
              portfolioItems.length
            );
            const isCenter = index === centerIndex;

            return (
              <motion.div
                key={item.id}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y - 140,
                  rotate: style.rotate,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  marginLeft: "-120px",
                  marginTop: "-150px",
                }}
                onClick={() => handleCardClick(index)}
                whileHover={
                  !isCenter
                    ? { scale: style.scale * 1.05, y: style.y - 150 }
                    : {}
                }
              >
                <div
                  className={`w-[240px] rounded-2xl overflow-hidden shadow-xl transition-shadow duration-300 ${
                    isCenter ? "shadow-2xl" : "hover:shadow-2xl"
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="relative h-[200px] flex items-center justify-center p-3">
                    <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl font-bold text-white/60">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* 중앙 카드일 때 확장된 정보 표시 */}
                  {isCenter && (
                    <motion.div
                      exit={{ opacity: 1, height: "auto" }}
                      className="px-4 pb-4 pt-2"
                    >
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/80 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
