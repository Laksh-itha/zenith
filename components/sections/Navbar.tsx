"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAVBAR_OFFSET = 96;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const sectionIds = useMemo(() => navLinks.map((l) => l.href.replace("#", "")), []);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled && "glass border border-navy-200/60 shadow-soft dark:border-white/10"
          )}
        >
          
          <Link href="#" className="flex items-center gap-2" data-cursor-hover>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-glow">
              <Sparkles className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-lg font-bold text-navy-900 dark:text-white">
              Zenith<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={scrollToSection(link.href)}
                  data-cursor-hover
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-navy-900 dark:text-white"
                      : "text-navy-600 hover:text-navy-900 dark:text-navy-300 dark:hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

         
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              data-cursor-hover
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 transition-colors hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-white/5"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button
              variant="ghost"
              size="md"
              onClick={scrollToSection("#products")}
            >
              Explore Products
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={scrollToSection("#contact")}
            >
              Get Started
            </Button>
          </div>

         
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 dark:text-navy-300"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-900 dark:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

       
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden lg:hidden"
            >
              <motion.div
                initial={{ y: -12 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="glass mt-2 flex flex-col gap-1 rounded-2xl border border-navy-200/60 p-4 shadow-soft dark:border-white/10"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={scrollToSection(link.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium hover:bg-navy-100 dark:hover:bg-white/5",
                      activeId === link.href.replace("#", "")
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-navy-700 dark:text-navy-200"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-2 flex flex-col gap-2 px-2">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={scrollToSection("#products")}
                  >
                    Explore Products
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={scrollToSection("#contact")}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
