"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X as ClearIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Can't find what you're looking for? Search below, or reach out to our support team any time."
        />

        {/* Search */}
        <div className="relative mx-auto mt-10 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
            className="w-full rounded-full border border-navy-200 bg-white py-2.5 pl-11 pr-10 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-indigo-500 dark:border-white/10 dark:bg-navy-900/60 dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-navy-400 hover:text-navy-700 dark:hover:text-white"
            >
              <ClearIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center text-sm text-navy-500 dark:text-navy-400"
              >
                No questions match &ldquo;{query}&rdquo;. Try a different search, or reach
                out through the contact form below.
              </motion.p>
            ) : (
              filtered.map((faq) => {
                // Index against the full list so open/close state is stable
                // even while the visible (filtered) list changes.
                const i = faqs.indexOf(faq);
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={faq.question}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-2xl border border-navy-200/70 bg-white dark:border-white/10 dark:bg-navy-900/50"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-medium text-navy-900 dark:text-white">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-600 dark:bg-white/5 dark:text-navy-300",
                          isOpen && "bg-indigo-600 text-white dark:bg-indigo-600"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-[15px] leading-relaxed text-navy-500 dark:text-navy-400">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
