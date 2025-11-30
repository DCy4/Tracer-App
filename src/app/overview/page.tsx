"use client";

import { useState } from "react";
import PlayerSearch from "@/components/PlayerSearch";
import PlayerStats from "@/components/PlayerStats";
import { motion } from "framer-motion";

// Mock data for demonstration
const MOCK_STATS = {
  username: "Pengu.G2",
  level: 452,
  kd: 1.45,
  wl: 68.5,
  rank: "Champion",
  mmr: 4890,
  matches: 12450,
  timePlayed: "2,450h",
  headshotPct: 48,
};

export default function OverviewPage() {
  const [stats, setStats] = useState<typeof MOCK_STATS | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (username: string, platform: string) => {
    setIsLoading(true);
    setStats(null);
    try {
      const response = await fetch(`/api/r6stats?username=${encodeURIComponent(username)}&platform=${encodeURIComponent(platform)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stats');
      }

      // API returns an array, take the first item
      if (Array.isArray(data) && data.length > 0) {
        setStats(data[0]);
      } else {
        throw new Error('Player not found');
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Ideally show an error message to the user
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Player Overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-lg mx-auto"
          >
            Search for any player to view their detailed statistics, rank, and performance metrics.
          </motion.p>
        </div>

        <PlayerSearch onSearch={handleSearch} isLoading={isLoading} />

        {stats && <PlayerStats data={stats} />}
      </div>
    </div>
  );
}
