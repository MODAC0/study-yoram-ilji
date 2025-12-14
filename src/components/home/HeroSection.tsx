"use client";

import { Mouse } from "lucide-react";
import BubbleModelScene from "./BubbleModel/BubbleModelScene";

export default function HeroSection() {
  return (
    <div className="relative w-full bg-white dark:bg-[#111112]">
      <BubbleModelScene />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 w-full">
          <p className="text-xl text-dark-500 dark:text-light-500">
            안녕하세요. 요람일지입니다.
          </p>
          <h1 className="text-5xl text-dark-600 dark:text-light-500 font-bold whitespace-nowrap max-md:whitespace-normal">
            어떤 프로젝트가 궁금하세요?
          </h1>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2  text-point-dark/80 dark:text-point-light/75">
          <Mouse className="size-6" />
          <p className="text-sm">scroll down</p>
        </div>
      </div>
    </div>
  );
}
