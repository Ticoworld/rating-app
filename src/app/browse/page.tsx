"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import RatingSlider from "@/components/core/RatingSlider";
import { MOCK_USERS } from "@/lib/data";

export default function BrowsePage() {
  const [index, setIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Filter users with status 'new'
  const newUsers = MOCK_USERS.filter((user) => user.status === "new");

  // Current user
  const currentUser = newUsers[index];

  const handleConfirm = () => {
    if (rating === 0) return;

    // Trigger exit animation
    setIsExiting(true);

    // After animation, move to next user
    setTimeout(() => {
      setIndex((prev) => prev + 1);
      setRating(0);
      setIsExiting(false);
    }, 300);
  };

  // Empty state
  if (index >= newUsers.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No More Profiles
          </h2>
          <p className="text-white/60">
            You&apos;ve rated everyone! Check back later for more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key={currentUser.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[90vh]"
          >
            {/* Background Image */}
            <Image
              src={currentUser.image}
              alt={currentUser.name}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 480px) 100vw, 480px"
            />

            {/* Glassmorphism Overlay Panel (Bottom 30%) */}
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-black/60 border-t border-white/10 p-6 pb-28">
              <div className="space-y-6">
                {/* User Info */}
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {currentUser.name}, {currentUser.age}
                  </h2>
                  <p className="text-lg text-gray-300">{currentUser.job}</p>
                </div>

                {/* Rating Slider */}
                <RatingSlider value={rating} onChange={setRating} />
              </div>

              {/* Confirm Button - Absolutely positioned to prevent jumping */}
              {rating > 0 && (
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={handleConfirm}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg tracking-wide hover:bg-gray-100 transition-colors shadow-2xl"
                  >
                    CONFIRM RATING
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
