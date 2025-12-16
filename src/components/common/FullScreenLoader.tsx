"use client";

import { AnimatePresence, motion } from "framer-motion";

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
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white dark:bg-[#111112]"
        >
          <div className="flex flex-col items-center gap-4">
            {/* 로딩 애니메이션 */}
            <motion.div className="relative flex items-center justify-center">
              {/* 외부 링 */}
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
                className="w-12 h-12 rounded-full border-4 border-transparent border-t-point border-r-point"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              {/* 중앙 점 */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-point"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* 로딩 텍스트 */}
            <motion.p
              className="text-sm text-dark-400 dark:text-light-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
