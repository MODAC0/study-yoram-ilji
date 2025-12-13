"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Logo } from "./SvgIcons";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 px-6 py-4 max-w-9xl mx-auto">
      <Link href="/" className="font-bold text-xl text-gray-800 w-12 h-12">
        <Logo />
      </Link>
    </nav>
  );
}
