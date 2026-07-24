"use client";

import { motion } from "framer-motion";


const nodes = [
  { id: "core", x: 260, y: 220, r: 26, label: "Zenith" },
  { id: "n1", x: 90, y: 100, r: 14 },
  { id: "n2", x: 430, y: 90, r: 11 },
  { id: "n3", x: 460, y: 250, r: 15 },
  { id: "n4", x: 130, y: 320, r: 12 },
  { id: "n5", x: 300, y: 370, r: 10 },
  { id: "n6", x: 60, y: 230, r: 9 },
];

const edges: [string, string][] = [
  ["core", "n1"],
  ["core", "n2"],
  ["core", "n3"],
  ["core", "n4"],
  ["core", "n5"],
  ["core", "n6"],
  ["n1", "n6"],
  ["n2", "n3"],
];

const findNode = (id: string) => nodes.find((n) => n.id === id)!;

export function NeuralIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-cyan-400/10 to-transparent blur-3xl" />

      <motion.svg
        viewBox="0 0 520 460"
        className="relative h-full w-full"
        initial="hidden"
        animate="visible"
      >
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const from = findNode(a);
          const to = findNode(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              className="text-navy-300 dark:text-navy-700"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: "easeInOut" }}
            />
          );
        })}

        
        {edges.map(([a, b], i) => {
          const from = findNode(a);
          const to = findNode(b);
          return (
            <motion.circle
              key={`packet-${a}-${b}`}
              r={3}
              fill="url(#packetGradient)"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{
                cx: [from.x, to.x, from.x],
                cy: [from.y, to.y, from.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 1 + i * 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

   
        {nodes
          .filter((n) => n.id !== "core")
          .map((n, i) => (
            <g key={n.id}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                className="fill-white stroke-indigo-400 dark:fill-navy-900 dark:stroke-indigo-500"
                strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                transition={{
                  scale: { duration: 0.5, delay: 0.4 + i * 0.1 },
                  opacity: { duration: 0.5, delay: 0.4 + i * 0.1 },
                  y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                }}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r * 0.4}
                className="fill-indigo-500 dark:fill-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            </g>
          ))}

   
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        >
          <motion.circle
            cx={findNode("core").x}
            cy={findNode("core").y}
            r={findNode("core").r + 14}
            className="fill-indigo-500/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={findNode("core").x}
            cy={findNode("core").y}
            r={findNode("core").r}
            fill="url(#coreGradient)"
          />
          <circle
            cx={findNode("core").x}
            cy={findNode("core").y}
            r={findNode("core").r}
            className="fill-transparent stroke-white/40"
            strokeWidth={1}
          />
        </motion.g>

        <defs>
          <linearGradient id="coreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="packetGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </motion.svg>


      <motion.div
        className="glass-card absolute left-0 top-6 rounded-2xl px-4 py-3 shadow-soft-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          x: { duration: 0.6, delay: 1.2 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <p className="text-xs text-navy-500 dark:text-navy-400">Model accuracy</p>
        <p className="font-mono text-lg font-semibold text-emerald-500">98.4%</p>
      </motion.div>

      <motion.div
        className="glass-card absolute bottom-8 right-0 rounded-2xl px-4 py-3 shadow-soft-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.4 },
          x: { duration: 0.6, delay: 1.4 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <p className="text-xs text-navy-500 dark:text-navy-400">Requests / sec</p>
        <p className="font-mono text-lg font-semibold text-indigo-500 dark:text-indigo-400">
          14,208
        </p>
      </motion.div>
    </div>
  );
}
