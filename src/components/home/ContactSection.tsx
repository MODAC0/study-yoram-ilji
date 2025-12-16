"use client";

import { motion, Variants } from "framer-motion";
import { Github, Instagram, Linkedin, LucideIcon, Mail } from "lucide-react";

// 연락처 정보 (임의의 플레이스홀더)
const contactInfo = {
  email: "contact@yoram-ilji.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  instagram: "https://instagram.com/username",
};

interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: contactInfo.github,
    icon: Github,
    color: "hover:bg-[#333] hover:text-white",
  },
  {
    name: "LinkedIn",
    href: contactInfo.linkedin,
    icon: Linkedin,
    color: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    name: "Instagram",
    href: contactInfo.instagram,
    icon: Instagram,
    color:
      "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
  },
];

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
    <div className=" h-full flex items-center justify-center text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-md"
      >
        {/* 제목 */}
        <motion.div variants={itemVariants}>
          <p className="text-point font-medium mb-2">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contact Me
          </h2>
        </motion.div>

        {/* 이메일 */}
        <motion.a
          variants={itemVariants}
          href={`mailto:${contactInfo.email}`}
          className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-linear-to-r from-point to-point-light text-white font-medium text-lg shadow-lg shadow-point/30 hover:shadow-xl hover:shadow-point/40 hover:scale-105 transition-all duration-300 mb-8"
        >
          <Mail className="w-5 h-5" />
          <span>{contactInfo.email}</span>
        </motion.a>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-light-200 dark:bg-dark-800 transition-all duration-300 hover:scale-110 ${link.color}`}
                aria-label={link.name}
              >
                <IconComponent className="w-6 h-6" />
              </a>
            );
          })}
        </motion.div>

        {/* 추가 문구 */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-dark-300 dark:text-dark-600"
        >
          © 2024 요람일지. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
