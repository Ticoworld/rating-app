"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingSlider({ value, onChange }: RatingSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Update x position when value changes externally
  useEffect(() => {
    if (!isDragging && constraintsRef.current) {
      const width = constraintsRef.current.offsetWidth - 40; // Subtract thumb width
      x.set((value / 100) * width);
    }
  }, [value, isDragging, x]);

  // Interpolate colors based on value
  // 0-50: Grey (#6b7280) to Violet (#8b5cf6)
  // 50-100: Violet (#8b5cf6) to Neon Green (#10b981)
  const getColor = (val: number) => {
    if (val <= 50) {
      // Interpolate from grey to violet
      const t = val / 50;
      return `rgb(${Math.round(107 + (139 - 107) * t)}, ${Math.round(
        114 + (92 - 114) * t
      )}, ${Math.round(128 + (246 - 128) * t)})`;
    } else {
      // Interpolate from violet to green
      const t = (val - 50) / 50;
      return `rgb(${Math.round(139 - (139 - 16) * t)}, ${Math.round(
        92 + (185 - 92) * t
      )}, ${Math.round(246 - (246 - 129) * t)})`;
    }
  };

  const handleDrag = () => {
    if (!constraintsRef.current) return;
    const width = constraintsRef.current.offsetWidth - 40;
    const newValue = Math.round((x.get() / width) * 100);
    onChange(Math.max(0, Math.min(100, newValue)));
  };

  return (
    <div className="relative w-full py-8">
      {/* Track */}
      <div
        ref={constraintsRef}
        className="relative h-1 bg-white/10 rounded-full overflow-visible"
      >
        {/* Progress fill */}
        <motion.div
          className="absolute h-full rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: getColor(value),
          }}
        />

        {/* Draggable thumb */}
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          onDrag={handleDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Thumb circle - white with glow */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border-4 border-white/20"
          />

          {/* Bubble tooltip - clean glass pill floating 20px above */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isDragging ? 1 : 0,
              y: isDragging ? -20 : -10,
            }}
            transition={{ duration: 0.2 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <span className="text-xl font-bold text-white">{value}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
