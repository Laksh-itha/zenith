"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobOffset = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const scrollToContact = () => {
    const target = document.querySelector("#contact");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-cyan-500 px-8 py-16 text-center sm:px-16 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-20" />
        <motion.div
          style={{ y: blobOffset }}
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(blobOffset, (v) => -v) }}
          className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-navy-900/20 blur-3xl"
        />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to Transform with AI?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Tell us what you&apos;re building, and we&apos;ll show you which product fits — no
            credit card, no lengthy sales process.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-indigo-700 hover:bg-indigo-50 dark:bg-white dark:text-indigo-700 dark:hover:bg-indigo-50"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-white/40 text-white hover:border-white hover:bg-white/10 dark:border-white/40 dark:text-white"
            >
              <Calendar className="h-4 w-4" />
              Book Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
