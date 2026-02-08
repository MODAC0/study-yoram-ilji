'use client';

import { DevelopmentPortfolio } from '@/data/portfolio';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  project: DevelopmentPortfolio;
}

export default function DevelopmentPortfolioDetail({ project }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 키보드로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-t from-light-50 via-light-50/80 to-light-50/40 dark:from-dark-900 dark:via-dark-900/80 dark:to-dark-900/40" />
        </div>

        {/* 콘텐츠 오버레이 */}
        <div className="relative h-full flex flex-col justify-end px-6 pb-12">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              {/* 타이틀 */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-medium mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-dark-500 dark:text-dark-400">
                  {project.subtitle}
                </p>
              </div>

              {/* 메타 정보 */}
              <div className="flex flex-wrap gap-6 text-sm mb-6">
                <div>
                  <span className="text-dark-500 dark:text-dark-400">기간</span>
                  <p className="font-medium">{project.period}</p>
                </div>
                <div>
                  <span className="text-dark-500 dark:text-dark-400">역할</span>
                  <p className="font-medium">{project.role}</p>
                </div>
                {project.team && (
                  <div>
                    <span className="text-dark-500 dark:text-dark-400">
                      팀 구성
                    </span>
                    <p className="font-medium">{project.team}</p>
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 text-white hover:bg-dark-700 transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-point text-white hover:bg-point-dark transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      라이브 데모
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* 프로젝트 설명 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-2xl font-medium mb-4">프로젝트 소개</h2>
            <p className="text-dark-500 dark:text-dark-400 leading-relaxed">
              {project.description}
            </p>

            {/* 주요 기능 */}
            <h3 className="text-xl font-medium mt-8 mb-4">주요 기능</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-dark-600 dark:text-dark-400">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-point" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 기술 스택 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <h2 className="text-2xl font-medium mb-4">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-light-300 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-sm font-medium">
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 개발 프로세스 섹션 */}
      {project.process && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16">
              <h2 className="text-3xl font-medium mb-2">Development Process</h2>
              <p className="text-dark-500 dark:text-dark-400">
                문제 발견부터 성과까지의 여정
              </p>
            </motion.div>

            <div className="space-y-16">
              {/* Step 1: 문제 발견 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-medium text-point/20">01</span>
                  <h3 className="text-xl font-semibold">Problem Discovery</h3>
                </div>
                <div className="ml-0 md:ml-16">
                  <p className="text-dark-600 dark:text-dark-400 mb-6 leading-relaxed max-w-3xl">
                    {project.process.problemDiscovery.background}
                  </p>
                  <div className="grid gap-3 max-w-3xl">
                    {project.process.problemDiscovery.problems.map(
                      (problem, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg bg-light-200 dark:bg-dark-800 border-l-2 border-point">
                          <span className="text-sm font-mono font-semibold text-point/60">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className="text-dark-600 dark:text-dark-400 text-sm">
                            {problem}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 2: 요구사항 분류 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-medium text-point/20">02</span>
                  <h3 className="text-xl font-semibold">Requirements</h3>
                </div>
                <div className="ml-0 md:ml-16 grid md:grid-cols-2 gap-8 max-w-4xl">
                  {/* 기능적 요구사항 */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-4">
                      Functional
                    </p>
                    <ul className="space-y-3">
                      {project.process.requirements.functional.map(
                        (req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-dark-600 dark:text-dark-400">
                            <span className="w-1 h-1 rounded-full mt-2 shrink-0 bg-point" />
                            {req}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  {/* 비기능적 요구사항 */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-4">
                      Non-Functional
                    </p>
                    <ul className="space-y-3">
                      {project.process.requirements.nonFunctional.map(
                        (req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-dark-600 dark:text-dark-400">
                            <span className="w-1 h-1 rounded-full bg-point/40 mt-2 shrink-0" />
                            {req}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: 기술 과제 구현 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-medium text-point/20">03</span>
                  <h3 className="text-xl font-semibold">
                    Technical Challenges
                  </h3>
                </div>
                <div className="ml-0 md:ml-16 space-y-6 max-w-4xl">
                  {project.process.technicalChallenges.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-light-200 dark:bg-dark-800">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold text-white shrink-0 bg-point">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-1">
                            Challenge
                          </p>
                          <p className="text-dark-700 dark:text-dark-300">
                            {item.challenge}
                          </p>
                        </div>
                      </div>
                      <div className="ml-12">
                        <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-1">
                          Solution
                        </p>
                        <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Step 4: 성과 및 향상 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-medium text-point/20">04</span>
                  <h3 className="text-xl font-semibold">Achievements</h3>
                </div>
                <div className="ml-0 md:ml-16 grid md:grid-cols-3 gap-8 max-w-5xl">
                  {/* 정량적 성과 */}
                  {project.process.achievements.metrics &&
                    project.process.achievements.metrics.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-4">
                          Metrics
                        </p>
                        <ul className="space-y-3">
                          {project.process.achievements.metrics.map(
                            (metric, index) => (
                              <li
                                key={index}
                                className="text-sm text-dark-600 dark:text-dark-400 p-3 rounded-lg bg-light-200 dark:bg-dark-800">
                                {metric}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  {/* 정성적 성과 */}
                  {project.process.achievements.qualitative &&
                    project.process.achievements.qualitative.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-4">
                          Qualitative
                        </p>
                        <ul className="space-y-3">
                          {project.process.achievements.qualitative.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="text-sm text-dark-600 dark:text-dark-400 p-3 rounded-lg bg-light-200 dark:bg-dark-800">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  {/* 배운 점 */}
                  {project.process.achievements.learnings &&
                    project.process.achievements.learnings.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-4">
                          Learnings
                        </p>
                        <ul className="space-y-3">
                          {project.process.achievements.learnings.map(
                            (learning, index) => (
                              <li
                                key={index}
                                className="text-sm text-dark-600 dark:text-dark-400 p-3 rounded-lg bg-light-200 dark:bg-dark-800">
                                {learning}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 이미지 갤러리 */}
      {project.images.length > 1 && (
        <section className="py-16 px-6 bg-light-200 dark:bg-dark-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-medium mb-8">
              Screenshots
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative aspect-9/16 rounded-2xl overflow-hidden cursor-pointer group bg-dark-800"
                  onClick={() => setSelectedImage(index)}>
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

      {/* 이미지 모달 - 스크롤 뷰어 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
            {/* 헤더 - 고정 */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-linear-to-b from-black/80 to-transparent">
              <p className="text-white/70 text-sm">
                {project.title} — {selectedImage + 1} / {project.images.length}
              </p>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                onClick={() => setSelectedImage(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 이미지 컨테이너 */}
            <div className="px-6 md:px-16 lg:px-32 pb-16 -mt-8">
              <div className="mx-auto max-w-3xl">
                <Image
                  src={project.images[selectedImage]}
                  alt={`${project.title} 스크린샷 ${selectedImage + 1}`}
                  width={1080}
                  height={1920}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* 하단 네비게이션 - 고정 */}
            <div className="fixed bottom-0 left-0 right-0 py-4 bg-linear-to-t from-black/80 to-transparent">
              <div className="flex justify-center gap-2 px-6 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-12 h-20 rounded-lg overflow-hidden shrink-0 transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                    onClick={() => setSelectedImage(index)}>
                    <Image
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
