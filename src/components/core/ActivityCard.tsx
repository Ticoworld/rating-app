"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { UserProfile } from "@/lib/data";

interface ActivityCardProps {
  user: UserProfile;
}

export default function ActivityCard({ user }: ActivityCardProps) {
  const isRatedMe = user.status === "rated_me";

  return (
    <Link href={`/profile/${user.id}`}>
      <motion.div
        className="relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background Image */}
        <div className="relative w-full h-full">
          <Image
            src={user.image}
            alt={user.name}
            fill
            className={`object-cover object-center transition-all duration-300 ${
              isRatedMe ? "blur-md" : "blur-0"
            }`}
            sizes="(max-width: 480px) 100vw, 480px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Enhanced gradient for non-locked cards */}
          {!isRatedMe && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Locked State Overlay */}
          {isRatedMe && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <Lock className="w-6 h-6 text-white/90 mb-2" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
                LOCKED
              </span>
            </motion.div>
          )}

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {isRatedMe ? "???" : user.name}, {user.age}
            </h3>
            
            {isRatedMe && (
              <p className="text-xs text-gray-300 uppercase tracking-wider">
                TAP TO UNLOCK
              </p>
            )}

            {/* Status Badge */}
            {user.status === "matched" && (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Matched
              </span>
            )}
            {user.status === "rejected" && (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                Missed
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
