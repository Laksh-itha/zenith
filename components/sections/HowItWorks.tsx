"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/data";

function StepCircle({ index, progress }: { index: number; progress: ReturnType<typeof useTransform<number, number>> }) {
  const threshold = index / (steps.length - 1);
  const scale = useTransform(progress, [Math.max(threshold - 0.18, 0), threshold], [1, 1.15]);
  const borderColor = useTransform(
    progress,
    [Math.max(threshold - 0.05, 0), threshold],
    ["rgb(203 213 225)", "rgb(79 70 229)"]
  );

  return (
    <motion.span
      style={{ scale, borderColor }}
      className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-bold text-indigo-600 dark:bg-navy-950 dark:text-indigo-400"
    >
      {String(index + 1).padStart(2, "0")}
    </motion.span>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How It Works"
          title="From raw input to a decision, in three steps"
          description="No lengthy onboarding, no configuration maze — the process is the same whichever product you start with."
        />

        <div ref={containerRef} className="relative mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop, horizontal) */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-navy-200 dark:bg-white/10 md:block">
            <motion.div
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className="h-px w-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500"
            />
          </div>

          
          <div className="absolute bottom-0 left-6 top-6 w-px bg-navy-200 dark:bg-white/10 md:hidden">
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="h-full w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              className="relative flex flex-col items-start pl-0 md:pl-0"
            >
              <StepCircle index={i} progress={scrollYProgress} />
              <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-500 dark:text-navy-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
