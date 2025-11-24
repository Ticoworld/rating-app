"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layers, Heart, MessageCircle, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Browse",
      path: "/browse",
      icon: Layers,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: Heart,
      badge: true, // Can be dynamic based on activityCount
    },
    {
      name: "Matches",
      path: "/matches",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      path: "/settings",
      icon: User,
    },
  ];

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-4 z-50"
      aria-label="Bottom navigation"
    >
      <div className="backdrop-blur-2xl bg-black/80 border border-white/10 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-around py-4 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative flex flex-col items-center gap-1.5 group"
              >
                {/* Icon */}
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? "text-white stroke-[1.5]"
                        : "text-white/40 stroke-[1.5] group-hover:text-white/60"
                    }`}
                    strokeWidth={1.5}
                  />
                  
                  {/* Red Badge for Activity */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {item.name}
                </span>

                {/* Glow Dot for Active State */}
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
