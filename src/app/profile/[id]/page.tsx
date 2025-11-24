"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronLeft } from "lucide-react";
import RatingSlider from "@/components/core/RatingSlider";
import { MOCK_USERS } from "@/lib/data";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [isRevealed, setIsRevealed] = useState(false);
  const [myRating, setMyRating] = useState(50);

  // Find the user
  const user = MOCK_USERS.find((u) => u.id === params.id as string);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">User not found</p>
      </div>
    );
  }

  const isRatedMe = user.status === "rated_me";
  const isBlurred = isRatedMe && !isRevealed;

  const handleConfirmRating = () => {
    if (isRatedMe) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Background Image */}
      <div className="relative w-full h-[70vh]">
        <Image
          src={user.image}
          alt={user.name}
          fill
          className={`object-cover object-center transition-all duration-1000 ${
            isBlurred ? "blur-xl" : "blur-0"
          }`}
          priority
          sizes="(max-width: 480px) 100vw, 480px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Locked State Overlay */}
        {isBlurred && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Lock className="w-16 h-16 text-white/90 mb-4" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-white/80">
              LOCKED
            </span>
          </div>
        )}
      </div>

      {/* Bottom Panel (Glassmorphism) */}
      <div className="absolute bottom-20 left-0 right-0 backdrop-blur-xl bg-black/80 border-t border-white/10 pb-6 pt-4 px-6">
        <div className="space-y-3">
          {/* User Info */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">
              {isBlurred ? "???" : user.name}, {user.age}
            </h2>
            {!isBlurred && (
              <p className="text-base text-gray-300">{user.job}</p>
            )}
          </div>

          {/* Rating Slider */}
          <div className="py-2">
            <RatingSlider value={myRating} onChange={setMyRating} />
          </div>

          {/* Confirm Button (only shown before reveal) */}
          {!isRevealed && isRatedMe && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleConfirmRating}
              className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-base tracking-wide hover:bg-gray-100 transition-colors"
            >
              CONFIRM RATING
            </motion.button>
          )}
        </div>
      </div>

      {/* Match Overlay (Post-Reveal) */}
      <AnimatePresence>
        {isRevealed && isRatedMe && user.ratingFromThem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl">✨</div>
              <h2 className="text-4xl font-bold text-white">
                IT&apos;S A MATCH!
              </h2>
              <p className="text-xl text-white/80">
                They rated you{" "}
                <span className="text-3xl font-bold text-white">
                  {user.ratingFromThem}
                </span>
              </p>
              <p className="text-lg text-white/60">
                You rated them{" "}
                <span className="text-2xl font-semibold text-white">
                  {myRating}
                </span>
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => router.push("/matches")}
                className="mt-8 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                VIEW MATCHES
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
