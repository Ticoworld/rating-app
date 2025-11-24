"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl font-bold tracking-tight"
        >
          RATING
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-400 tracking-widest text-sm uppercase"
        >
          The gatekeeper is you.
        </motion.p>
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="pb-12 w-full max-w-xs"
      >
        <Link
          href="/browse"
          className="w-full block py-4 px-8 text-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium tracking-wide"
        >
          Enter
        </Link>
      </motion.div>
    </div>
  );
}
