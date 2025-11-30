"use client";

import { useState } from "react";
import { Search, Monitor, Gamepad2, Tv } from "lucide-react";
import { motion } from "framer-motion";

interface PlayerSearchProps {
  onSearch: (username: string, platform: string) => void;
  isLoading?: boolean;
}

export default function PlayerSearch({ onSearch, isLoading }: PlayerSearchProps) {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("pc");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username, platform);
    }
  };

  const platforms = [
    { id: "pc", name: "PC", icon: Monitor },
    { id: "xbox", name: "Xbox", icon: Gamepad2 },
    { id: "psn", name: "PlayStation", icon: Tv },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-xl border border-white/10 backdrop-blur-sm">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${platform === p.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <p.icon className="w-4 h-4" />
              {p.name}
            </button>
          ))}
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative flex items-center bg-black rounded-xl border border-white/10 overflow-hidden focus-within:border-blue-500/50 transition-colors">
            <Search className="w-5 h-5 text-zinc-500 ml-4" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g. Pengu.G2)"
              className="w-full bg-transparent border-none px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="mr-2 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
