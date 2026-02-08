'use client';

import { DesignPortfolio } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  project: DesignPortfolio;
}

export default function DesignPortfolioDetail({ project }: Props) {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 - 간단한 소개 */}
      <section
        className="relative py-16 px-6"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, transparent 50%)`,
        }}>
        <div className="max-w-7xl mx-auto">
          {/* 뒤로가기 */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-dark-500 hover:text-point transition-colors mb-12 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>포트폴리오로 돌아가기</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl">
            {/* 카테고리 뱃지 */}
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
              style={{ backgroundColor: project.color }}>
              {project.type}
            </span>

            {/* 타이틀 */}
            <h1 className="text-4xl md:text-5xl font-medium mb-3">
              {project.title}
            </h1>
            <p className="text-xl text-dark-400 dark:text-dark-500">
              {project.subtitle}
            </p>

            <div className="py-6 flex flex-wrap gap-6 text-sm text-dark-500 dark:text-dark-400">
              <div className="flex items-center gap-5">
                <span>{project.period}</span>·<span>{project.role}</span>·
                <span>{project.tools.join(', ')}</span>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-dark-500 dark:text-dark-400 leading-relaxed mb-8">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 이미지 연속 렌더링 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: index * 0.05 }}
              className="relative w-full">
              <Image
                src={image}
                alt={`${project.title} - ${index + 1}`}
                width={1200}
                height={2400}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 768px"
                priority={index < 3}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 하단 네비게이션 */}
      <section className="py-16 px-6 bg-light-200 dark:bg-dark-900">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 dark:bg-light-100 text-white dark:text-dark-900 hover:bg-dark-700 dark:hover:bg-light-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            다른 프로젝트 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
