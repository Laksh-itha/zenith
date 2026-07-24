"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { features } from "@/lib/data";

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-navy-50/60 py-24 dark:bg-white/[0.02] sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Zenith"
          title="Built for teams who don't have time for flaky AI"
          description="Every product on the platform shares the same operational backbone — so speed, security, and reliability aren't things you have to ask for."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                data-cursor-hover
              >
                <TiltCard className="glass-card rounded-3xl p-7 transition-shadow duration-300 hover:shadow-glow">
                  <motion.span
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                  <h3 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy-500 dark:text-navy-400">
                    {feature.description}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
