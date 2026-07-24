"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Twitter, Linkedin, Instagram, Mail, ArrowRight, Check } from "lucide-react";
import { footerLinks, socialLinks, contactEmail } from "@/lib/data";
import { Button } from "@/components/ui/Button";

const socialIconMap = { Twitter, LinkedIn: Linkedin, Instagram };

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Newsletter</h4>
      <p className="mt-4 text-sm text-navy-500 dark:text-navy-400">
        Product updates, occasionally. No spam.
      </p>
      {subscribed ? (
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-500">
          <Check className="h-4 w-4" />
          You&apos;re on the list
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full min-w-0 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-indigo-500 dark:border-white/10 dark:bg-navy-900/60 dark:text-white"
          />
          <Button type="submit" variant="primary" size="md" magnetic={false} className="shrink-0 !px-3">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-navy-100 pt-16 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-4 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link href="#" className="flex items-center gap-2" data-cursor-hover>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
                <Sparkles className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-bold text-navy-900 dark:text-white">
                Zenith<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-500 dark:text-navy-400">
              Purpose-built AI products for businesses and everyday life — designed to
              feel like a capable teammate, not another dashboard.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-navy-500 transition-colors hover:text-indigo-600 dark:text-navy-400 dark:hover:text-indigo-400"
            >
              <Mail className="h-4 w-4" />
              {contactEmail}
            </a>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIconMap[label as keyof typeof socialIconMap];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-cursor-hover
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 text-navy-500 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:text-navy-400 dark:hover:text-indigo-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-navy-900 dark:text-white">
                {heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-navy-500 transition-colors hover:text-indigo-600 dark:text-navy-400 dark:hover:text-indigo-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Newsletter />
          </div>
        </div>

        {/* Animated gradient divider */}
        <div className="relative h-px overflow-hidden bg-navy-100 dark:bg-white/5">
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-navy-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ZenithAI, Inc. All rights reserved.</p>
          <p className="text-xs">Designed and built as an original concept, not affiliated with any existing brand.</p>
        </div>
      </div>
    </footer>
  );
}
