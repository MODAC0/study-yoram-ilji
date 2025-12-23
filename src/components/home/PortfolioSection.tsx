"use client";

import {
  categoryLabels,
  isDesignPortfolio,
  portfolioProjects,
} from "@/data/portfolio";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  const xSpacing = 300;
  const x = offset * xSpacing;

  const archHeight = 350;
  const y = absOffset * absOffset * (archHeight / 9);

  const rotate = offset * 10;

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
  const [centerIndex, setCenterIndex] = useState(
    Math.floor(portfolioProjects.length / 2)
  );

  const handleCardClick = (index: number) => {
    setCenterIndex(index);
  };

  return (
    <div className="w-full mx-auto px-6 py-16 relative z-10 pointer-events-auto">
      {/* 섹션 헤더 */}
      <div className="mb-20">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold group-hover:text-point transition-all duration-300">
            포트폴리오
          </h2>
          <svg
            className="w-6 h-6 text-dark-400 group-hover:text-point group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        <p className="text-dark-300 dark:text-dark-500 mt-2">
          디자인과 개발, 다양한 프로젝트를 경험해보세요.
        </p>
      </div>

      {/* 카드 갤러리 */}
      <div className="relative h-[800px] flex items-center justify-center overflow-hidden">
        <div
          className="relative w-full h-full"
          style={{ perspective: "1400px" }}
        >
          {portfolioProjects.map((project, index) => {
            const style = getCardStyle(
              index,
              centerIndex,
              portfolioProjects.length
            );
            const isCenter = index === centerIndex;
            const isDesign = isDesignPortfolio(project);

            return (
              <motion.div
                key={project.id}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y - 160,
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
                  marginLeft: "-140px",
                  marginTop: "-180px",
                }}
                onClick={() => handleCardClick(index)}
                whileHover={
                  !isCenter
                    ? { scale: style.scale * 1.05, y: style.y - 170 }
                    : {}
                }
              >
                <div
                  className={`w-[280px] rounded-2xl overflow-hidden transition-all duration-300 ${
                    isCenter
                      ? "shadow-2xl ring-2 ring-white/30 dark:ring-white/20"
                      : "shadow-xl hover:shadow-2xl"
                  }`}
                  style={{ backgroundColor: project.color }}
                >
                  {/* 썸네일 이미지 */}
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500"
                      style={{
                        transform: isCenter ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                    {/* 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    {/* 카테고리 배지 */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md shadow-lg ${
                          isDesign
                            ? "bg-linear-to-r from-purple-500/90 to-pink-500/90 text-white"
                            : "bg-linear-to-r from-blue-500/90 to-cyan-500/90 text-white"
                        }`}
                      >
                        {categoryLabels[project.category]}
                      </span>
                    </div>

                    {/* 기간 배지 */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-black/40 text-white/90 backdrop-blur-sm">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* 카드 정보 */}
                  <div className="p-4 bg-linear-to-b from-black/70 to-black/90">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mb-2">
                      {project.subtitle}
                    </p>

                    {/* 중앙 카드일 때 확장된 정보 표시 */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pt-3 border-t border-white/20"
                      >
                        <Link
                          href={`/portfolio/${project.id}`}
                          className="flex items-center justify-center w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200 group"
                        >
                          <span>자세히 보기</span>
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 네비게이션 도트 */}
      <div className="flex justify-center gap-2 mt-8">
        {portfolioProjects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => handleCardClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === centerIndex
                ? "bg-point w-6"
                : "bg-dark-300/30 hover:bg-dark-300/50"
            }`}
            aria-label={`${project.title}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
