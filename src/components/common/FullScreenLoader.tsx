"use client";

import { AnimatePresence, motion } from "framer-motion";
import SwapText from "./SwapText";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

export default function FullScreenLoader({ isLoading }: FullScreenLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-point"
        >
          <div className="flex flex-col gap-4">
            <motion.div className="relative flex items-center justify-center">
              <motion.div
                className="absolute w-16 h-16 rounded-full border-4 border-point/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* 회전하는 링 */}
              <motion.div
                className="w-24 h-24 rounded-full border-4 border-transparent border-t-white border-r-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              {/* 중앙 점 */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-white"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="text-2xl font-bold text-start text-white">
              <SwapText words={["PORTFOLIO", "DESIGN", "DEVELOPMENT"]} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
