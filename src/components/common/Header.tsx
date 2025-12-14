"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./SvgIcons";

export default function Header() {
  const { scrollY } = useScroll();
  const { resolvedTheme, setTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-9xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl w-12 h-12">
            <Logo />
          </Link>
          <div className="flex items-center gap-6 hover:cursor-pointer">
            <Link
              href="/blog"
              className="hover:text-gray-500 transition-all duration-300"
            >
              <p>블로그</p>
            </Link>
            <Link
              href="/portfolio"
              className="hover:text-gray-500 transition-all duration-300"
            >
              <p>포트폴리오</p>
            </Link>
            <div className="border border-r border-gray-200 h-4" />
            <button
              className="p-1 rounded-md group cursor-pointer hover:text-gray-500 transition-all duration-300"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {mounted &&
                (resolvedTheme === "dark" ? (
                  <MoonIcon className="size-6" />
                ) : (
                  <SunIcon className="size-6" />
                ))}
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
