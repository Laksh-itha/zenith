"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";


export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let loaded = false;
    let minTimeElapsed = false;

    const tryHide = () => {
      if (loaded && minTimeElapsed) setShow(false);
    };

    const onLoad = () => {
      loaded = true;
      tryHide();
    };

    if (document.readyState === "complete") {
      loaded = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    const minTimer = window.setTimeout(() => {
      minTimeElapsed = true;
      tryHide();
    }, 900);

    // Safety net: never block the page for more than ~2.5s
    const maxTimer = window.setTimeout(() => setShow(false), 2500);

    tryHide();

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-navy-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-glow"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-7 w-7" strokeWidth={2.25} />
            </motion.span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
