"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/data";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -8 }}
      data-cursor-hover
      className="group relative rounded-3xl p-[1px] transition-transform duration-300"
    >
      
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${product.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-60`}
      />

      <div className="relative overflow-hidden rounded-3xl border border-navy-200/70 bg-white p-7 shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg dark:border-white/10 dark:bg-navy-900/80">
        
        <div
          className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${product.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
        />

        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.5 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${product.gradient} text-white shadow-soft`}
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
            </motion.span>
            <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500 dark:bg-white/5 dark:text-navy-400">
              {product.tag}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-navy-900 dark:text-white">
            {product.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-500 dark:text-navy-400">
            {product.description}
          </p>

          <button className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
