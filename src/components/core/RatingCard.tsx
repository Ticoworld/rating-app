"use client";

import { useState } from "react";
import Image from "next/image";
import RatingSlider from "./RatingSlider";

interface RatingCardProps {
  id: string;
  name: string;
  age: number;
  image: string;
}

export default function RatingCard({
  name,
  age,
  image,
}: RatingCardProps) {
  const [rating, setRating] = useState(50);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 480px) 100vw, 480px"
      />

      {/* Glassmorphism Overlay Panel (Bottom 30%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] backdrop-blur-xl bg-black/60 border-t border-white/10">
        <div className="h-full flex flex-col justify-between p-6">
          {/* User Info */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white">
              {name}, {age}
            </h2>
          </div>

          {/* Rating Slider */}
          <div className="pb-6">
            <RatingSlider value={rating} onChange={setRating} />
          </div>
        </div>
      </div>
    </div>
  );
}
