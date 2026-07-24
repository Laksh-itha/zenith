"use client";

import { motion } from "framer-motion";


export function DecorativeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
     
      <div className="absolute inset-0 bg-white dark:bg-navy-950" />

     
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-100" />

      
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/20"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[55vw] w-[55vw] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/15"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      
      <motion.div
        className="absolute left-1/2 top-1/3 hidden h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[130px] dark:block"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      
      <svg className="absolute inset-0 h-full w-full opacity-[0.025] dark:opacity-[0.05]">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
