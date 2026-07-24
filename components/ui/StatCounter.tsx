"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-white sm:text-5xl">
        {current}
        <span className="text-cyan-300">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-indigo-200">
        {label}
      </p>
    </div>
  );
}
