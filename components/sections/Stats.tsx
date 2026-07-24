"use client";

import { motion } from "framer-motion";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-indigo-900 to-navy-900" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
