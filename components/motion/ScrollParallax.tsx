"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSimplifiedMotion } from "@/hooks/useSimplifiedMotion";
import { cn } from "@/lib/utils/cn";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right";
  intensity?: "sm" | "md" | "lg";
  delay?: number;
};

const intensityMap = {
  sm: { entry: 20, drift: 12, lift: 10 },
  md: { entry: 34, drift: 20, lift: 14 },
  lg: { entry: 52, drift: 30, lift: 18 },
} as const;

export function ScrollParallax({
  children,
  className,
  from = "bottom",
  intensity = "md",
  delay = 0,
}: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const simplifyMotion = useSimplifiedMotion();

  if (reduceMotion || simplifyMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatedScrollParallax
      className={className}
      from={from}
      intensity={intensity}
      delay={delay}
    >
      {children}
    </AnimatedScrollParallax>
  );
}

function AnimatedScrollParallax({
  children,
  className,
  from,
  intensity,
  delay,
}: Required<
  Pick<ScrollParallaxProps, "children" | "from" | "intensity" | "delay">
> &
  Pick<ScrollParallaxProps, "className">) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  const settings = intensityMap[intensity];
  const xStart =
    from === "left" ? -settings.entry : from === "right" ? settings.entry : 0;
  const yStart = from === "bottom" ? settings.entry : settings.entry * 0.42;

  return (
    <motion.div
      ref={ref}
      className={cn("mobile-motion-static transform-gpu", className)}
      style={{ backfaceVisibility: "hidden" }}
      initial={{
        opacity: 0,
        x: xStart,
        y: yStart,
        scale: 0.982,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : undefined
      }
      transition={{
        duration: 0.78,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
