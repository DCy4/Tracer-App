"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Clock, Activity, Crosshair, Skull } from "lucide-react";

interface PlayerStatsProps {
  data: {
    username: string;
    level: number;
    kd: number;
    wl: number;
    rank: string;
    mmr: number;
    matches: number;
    timePlayed: string;
    headshotPct: number;
  };
}

export default function PlayerStats({ data }: PlayerStatsProps) {
  const statCards = [
    { label: "K/D Ratio", value: data.kd.toFixed(2), icon: Crosshair, color: "text-red-500" },
    { label: "Win Rate", value: `${data.wl}%`, icon: Trophy, color: "text-yellow-500" },
    { label: "Headshot %", value: `${data.headshotPct}%`, icon: Target, color: "text-blue-500" },
    { label: "Matches", value: data.matches, icon: Activity, color: "text-green-500" },
    { label: "Time Played", value: data.timePlayed, icon: Clock, color: "text-purple-500" },
    { label: "MMR", value: data.mmr, icon: Skull, color: "text-orange-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-zinc-900/50 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
            {data.level}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{data.username}</h2>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-medium text-white">
                {data.rank}
              </span>
              <span className="text-sm">Level {data.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-zinc-900/30 rounded-xl border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
