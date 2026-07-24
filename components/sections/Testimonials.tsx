"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            i < value
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
              : "h-3.5 w-3.5 fill-transparent text-navy-300 dark:text-navy-700"
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      {/* Soft ambient glow behind the glass cards */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[140px] dark:bg-indigo-500/10" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams that switched, and stayed"
          description="A handful of the people using Zenith products in production every day."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              data-cursor-hover
              className="glass-card relative flex flex-col rounded-3xl p-8 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
            >
              <div className="flex items-start justify-between">
                <Quote className="h-8 w-8 text-indigo-300/60 dark:text-indigo-500/30" strokeWidth={1.5} />
                <Rating value={t.rating} />
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-600 dark:text-navy-300">
                {t.review}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-6 dark:border-white/10">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
