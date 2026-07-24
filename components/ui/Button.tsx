"use client";

import {
  forwardRef,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    magnetic?: boolean;
  };

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100 shadow-soft",
  secondary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-soft-lg shadow-indigo-600/20",
  outline:
    "border border-navy-300 text-navy-900 hover:border-navy-900 hover:bg-navy-50 dark:border-navy-700 dark:text-white dark:hover:border-white dark:hover:bg-white/5",
  ghost: "text-navy-700 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Ripple = { id: number; x: number; y: number; size: number };


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", magnetic = true, children, onClick, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 });

    const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      mx.set(relX * 0.25);
      my.set(relY * 0.25);
    };

    const handleMouseLeave = () => {
      mx.set(0);
      my.set(0);
    };

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const ripple: Ripple = {
        id: Date.now(),
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 650);
      onClick?.(e);
    };

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
        {/* Ripple layer */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.35, scale: 0 }}
              animate={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute rounded-full bg-white/60"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
