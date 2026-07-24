"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowRight, PlayCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Spotlight } from "@/components/ui/Spotlight";
import { NeuralIllustration } from "@/components/sections/NeuralIllustration";
import { HeroParticles } from "@/components/sections/HeroParticles";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

const avatarPhotoIds = [
  "1580489944761-15a19d654956",
  "1568602471122-7832951cc4c5",
  "1573497019940-1c28c88b4f3e",
  "1633332755192-727a05c4013d",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotOpacity = useMotionValue(0);
  const springX = useSpring(spotX, { stiffness: 120, damping: 20 });
  const springY = useSpring(spotY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => spotOpacity.set(1)}
      onMouseLeave={() => spotOpacity.set(0)}
      className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-hero-gradient"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <HeroParticles />
      <Spotlight x={springX} y={springY} opacity={spotOpacity} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-navy-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-navy-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live across 6+ purpose-built AI products
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.1] text-navy-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Building AI Solutions for{" "}
            <span className="animate-gradient-x bg-[length:200%_auto] bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
              Businesses & Everyday Life
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-navy-500 dark:text-navy-400"
          >
            Zenith is a family of purpose-built AI products — from operational analytics
            to consumer tools — designed to feel less like software and more like a
            capable teammate.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button variant="secondary" size="lg" className="group">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <PlayCircle className="h-4 w-4" />
              Get Started
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex items-center gap-6 text-sm text-navy-500 dark:text-navy-400"
          >
            <div className="flex -space-x-3">
              {avatarPhotoIds.map((id) => (
                <Image
                  key={id}
                  src={`https://images.unsplash.com/photo-${id}?q=80&w=80&h=80&auto=format&fit=crop`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover dark:border-navy-950"
                />
              ))}
            </div>
            <p>
              Trusted by teams across{" "}
              <span className="font-semibold text-navy-800 dark:text-white">
                fashion, education & finance
              </span>
            </p>
          </motion.div>
        </div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <NeuralIllustration />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute inset-x-0 bottom-4 hidden flex-col items-center gap-1.5 sm:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-widest text-navy-400 dark:text-navy-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-navy-400 dark:text-navy-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
