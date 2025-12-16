"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export function ProfileHero() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-dark-900 flex items-center justify-center p-8">
      {/* Card */}
      <div className="w-full overflow-hidden bg-white dark:bg-dark-800 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-full min-h-[400px] bg-slate-100 dark:bg-dark-700 flex items-end justify-center overflow-hidden">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full flex justify-center items-end h-full"
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={400}
                height={500}
                className="w-full h-full object-cover object-center max-w-[90%] md:max-w-full"
              />
            </motion.div> */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0" />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Badge */}
              <span className="inline-block mb-4 text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                Open to Work
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                Min-jun Kim
              </h1>

              <p className="text-xl text-slate-500 dark:text-slate-400 mb-6 font-medium">
                Senior Product Designer
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Passionate about creating intuitive and beautiful user
                  experiences. Specializing in clean, functional design systems
                  and interactive interfaces.
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    <span>Seoul, South Korea</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-4" />
                    <span>hello@example.com</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full px-8 py-3 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium transition-colors">
                  Contact Me
                </button>
                <button className="rounded-full px-8 py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-medium transition-colors group flex items-center">
                  View Portfolio
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
