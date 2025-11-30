"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            v1.0 Now Available
            <ChevronRight className="w-4 h-4" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="block text-white mb-2">Master Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Gaming Performance
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Advanced analytics and real-time tracking for Rainbow Six Siege.
            Elevate your gameplay with data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/overview"
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded-lg hover:bg-white/10 border border-white/10 transition-all"
            >
              View Features
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
