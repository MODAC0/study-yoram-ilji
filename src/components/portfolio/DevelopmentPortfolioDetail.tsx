"use client";

import { DevelopmentPortfolio } from "@/data/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Props {
  project: DevelopmentPortfolio;
}

export default function DevelopmentPortfolioDetail({ project }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 키보드 네비게이션
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft" && selectedImage > 0) {
        setSelectedImage(selectedImage - 1);
      } else if (
        e.key === "ArrowRight" &&
        selectedImage < project.images.length - 1
      ) {
        setSelectedImage(selectedImage + 1);
      }
    },
    [selectedImage, project.images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section
        className="relative py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, transparent 50%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* 뒤로가기 */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-dark-500 hover:text-point transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>포트폴리오로 돌아가기</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 타이틀 */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
                style={{ backgroundColor: project.color }}
              >
                {project.title.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-dark-400 dark:text-dark-500">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-6 text-sm text-dark-500 dark:text-dark-400 mb-8">
              <div>
                <span className="font-semibold text-dark-700 dark:text-dark-300">
                  기간
                </span>
                <p>{project.period}</p>
              </div>
              <div>
                <span className="font-semibold text-dark-700 dark:text-dark-300">
                  역할
                </span>
                <p>{project.role}</p>
              </div>
              {project.team && (
                <div>
                  <span className="font-semibold text-dark-700 dark:text-dark-300">
                    팀 구성
                  </span>
                  <p>{project.team}</p>
                </div>
              )}
            </div>

            {/* 링크들 */}
            {project.links && (
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 text-white hover:bg-dark-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-point text-white hover:bg-point-dark transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    라이브 데모
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 설명 & 기술 스택 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* 프로젝트 설명 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">프로젝트 소개</h2>
            <p className="text-dark-500 dark:text-dark-400 leading-relaxed">
              {project.description}
            </p>

            {/* 주요 기능 */}
            <h3 className="text-xl font-bold mt-8 mb-4">주요 기능</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-dark-600 dark:text-dark-400"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 기술 스택 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-light-300 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 이미지 갤러리 */}
      {project.images.length > 0 && (
        <section className="py-16 px-6 bg-light-200 dark:bg-dark-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold mb-8"
            >
              스크린샷
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative aspect-9/16 rounded-2xl overflow-hidden cursor-pointer group bg-dark-800"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${project.title} 스크린샷 ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 1} / {project.images.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 이미지 모달 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* 이전/다음 버튼 */}
            {selectedImage > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            {selectedImage < project.images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white rotate-180"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}

            {/* 이미지 */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-md w-full aspect-9/16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[selectedImage]}
                alt={`${project.title} 스크린샷 ${selectedImage + 1}`}
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* 인디케이터 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index
                      ? "w-6 bg-white"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
