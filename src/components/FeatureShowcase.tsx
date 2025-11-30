"use client";

import { motion } from "framer-motion";
import { BarChart3, Crosshair, Shield, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep dive into your performance with detailed charts and trend analysis."
  },
  {
    icon: Crosshair,
    title: "Aim Analysis",
    description: "Track your accuracy, headshot percentage, and kill efficiency per operator."
  },
  {
    icon: Shield,
    title: "Operator Mastery",
    description: "Compare your stats across different operators to find your best playstyle."
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Live match updates and instant stat refreshing after every game."
  },
  {
    icon: Globe,
    title: "Global Leaderboards",
    description: "See where you stand against the top players in your region and worldwide."
  },
  {
    icon: Users,
    title: "Squad Comparison",
    description: "Compare stats with your friends to settle who carries the team."
  }
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything you need to <span className="text-blue-500">dominate</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Comprehensive tools designed for competitive players who want to improve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
