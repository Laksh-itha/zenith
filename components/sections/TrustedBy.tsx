"use client";

import { motion } from "framer-motion";
import { trustedBy } from "@/lib/data";

export function TrustedBy() {
  return (
    <section className="border-y border-navy-100 bg-navy-50/60 py-12 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-navy-400 dark:text-navy-500"
        >
          Powering teams across every industry
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {trustedBy.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-lg font-semibold tracking-tight text-navy-300 grayscale transition-all duration-300 hover:text-navy-900 hover:grayscale-0 dark:text-navy-600 dark:hover:text-white"
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
