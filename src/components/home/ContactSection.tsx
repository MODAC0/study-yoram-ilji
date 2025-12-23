"use client";

import { motion, Variants } from "framer-motion";
import { Check, Copy, Github, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="h-full flex items-center justify-center text-center relative z-10 pointer-events-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-md"
      >
        <div className="flex mb-6 items-center justify-center">
          <Link href="/profile" className="group flex items-center gap-2">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <button
            className="flex items-center gap-3 rounded-full px-8 py-3 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium transition-colors cursor-pointer"
            onClick={handleCopyEmail}
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            <span>{copied ? "복사됨!" : "이메일 복사"}</span>
          </button>
          <button className="rounded-full flex items-center gap-3 prounded-full px-8 py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-medium transition-colors group cursor-pointer">
            <Github className="w-6 h-6" />
            <span>깃허브</span>
          </button>
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-dark-300 dark:text-dark-600"
        >
          ©2025 요람일지. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
