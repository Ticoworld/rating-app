"use client";

import Image from "next/image";
import { CheckCircle2, ChevronRight, Crown } from "lucide-react";

export default function SettingsPage() {
  const stats = [
    { label: "Matches", value: "12" },
    { label: "Avg Rating", value: "8.5" },
    { label: "Views", value: "142" },
  ];

  const settingsItems = [
    { label: "Preferences", path: "/settings/preferences" },
    { label: "Privacy", path: "/settings/privacy" },
    { label: "Help & Support", path: "/settings/help" },
    { label: "Log Out", path: "/logout", isDestructive: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header Section */}
      <div className="px-6 pt-12 pb-8">
        {/* Avatar with Verified Badge */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-4">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Profile"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            {/* Verified Badge */}
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Name & Job */}
          <h1 className="text-2xl font-bold mb-1">Alex, 29</h1>
          <p className="text-white/60 text-sm mb-4">Architect</p>

          {/* Edit Profile Button */}
          <button className="px-6 py-2 border border-white/20 rounded-full text-sm font-medium text-white/80 hover:bg-white/5 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Stats Grid (The Scoreboard) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-center"
            >
              <p className="text-xl font-bold mb-1">{stat.value}</p>
              <p className="text-[10px] uppercase text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Premium Banner (The Money) */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-black mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-black" />
            <h3 className="text-base font-bold text-black">
              Unlock Platinum Mode
            </h3>
          </div>
          <p className="text-sm text-black font-medium">
            See who rated you first.
          </p>
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 space-y-2">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <span
              className={`text-sm font-medium ${
                item.isDestructive ? "text-red-500" : "text-white"
              }`}
            >
              {item.label}
            </span>
            <ChevronRight
              className={`w-5 h-5 ${
                item.isDestructive ? "text-red-500/60" : "text-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
