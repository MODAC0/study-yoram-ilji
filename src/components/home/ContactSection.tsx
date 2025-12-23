"use client";

import dayjs from "dayjs";
import { motion, Variants } from "framer-motion";
import { Github, LucideIcon, Mail } from "lucide-react";
import Link from "next/link";

// 연락처 정보 (임의의 플레이스홀더)
const contactInfo = {
  email: "modac0302@gmail.com",
  github: "https://github.com/modac0",
};

interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOut cubic bezier
    },
  },
};

export default function ContactSection() {
  return (
    <div className="h-full flex items-center justify-center text-center relative z-10 pointer-events-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-md"
      >
        <div className="flex flex-col gap-2 mb-6 items-center justify-center">
          <Link href="/contact" className="group flex items-center gap-2">
            <h2 className="text-3xl md:text-4xl font-bold group-hover:text-point transition-all duration-300">
              Contact Me
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
          <p className="text-dark-300 dark:text-dark-500">
            최신 인기 블로그 포스트를 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <motion.a
            variants={itemVariants}
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-linear-to-r from-point to-point-light text-white shadow-lg shadow-point/30 hover:shadow-xl hover:shadow-point/40 hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>이메일</span>
          </motion.a>

          <motion.a
            variants={itemVariants}
            href={`${contactInfo.github}`}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-linear-to-r from-point to-point-light text-white shadow-lg shadow-point/30 hover:shadow-xl hover:shadow-point/40 hover:scale-105 transition-all duration-300"
          >
            <Github className="w-6 h-6" />
            <span>깃허브</span>
          </motion.a>
        </div>
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-dark-300 dark:text-dark-600"
        >
          ©{dayjs().year()} 요람일지. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
