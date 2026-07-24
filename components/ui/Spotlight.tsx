"use client";

import { motion, type MotionValue } from "framer-motion";


export function Spotlight({
  x,
  y,
  opacity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-indigo-400/20 blur-[100px] dark:bg-cyan-400/10"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
      }}
    />
  );
}
