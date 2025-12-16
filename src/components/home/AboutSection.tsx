"use client";

import { motion } from "framer-motion";
import PointillismImage from "../common/PointillismImage";

export default function AboutSection() {
  return (
    <section className="py-32 bg-linear-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="overflow-hidden mx-16 pr-12 pt-6 bg-dark-800 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full aspect-square lg:mx-0"
        >
          <PointillismImage src="/profile.png" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-start lg:pt-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            
            <br /> <span className="text-point">김준희</span>입니다
          </h2>
          <div className="space-y-4 text-dark-400 dark:text-light-400 leading-relaxed">
            <p>
              프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며, 아름답고
              직관적인 인터페이스를 만드는 것을 좋아합니다.
            </p>
            <p>
              React, Next.js, TypeScript를 주로 사용하며, 항상 새로운 기술을
              배우고 적용하는 것에 열정을 가지고 있습니다.
            </p>
            <p>
              이 블로그에서는 개발 경험, 프로젝트 회고, 그리고 배운 것들을
              공유합니다.
            </p>
          </div>

          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["React", "Next.js", "TypeScript", "UI/UX", "Frontend"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 
                           rounded-full text-dark-500 dark:text-light-400
                           hover:bg-point/10 hover:text-point transition-colors cursor-default"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
