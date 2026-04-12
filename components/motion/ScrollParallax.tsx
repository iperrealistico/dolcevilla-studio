"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 18%"],
  });

  const settings = intensityMap[intensity];
  const xStart = from === "left" ? -settings.entry : from === "right" ? settings.entry : 0;
  const yStart = from === "bottom" ? settings.entry : settings.entry * 0.42;
  const driftX = from === "left" ? [16, -8] : from === "right" ? [-16, 8] : [0, 0];
  const driftY = from === "bottom" ? [settings.drift, -settings.lift] : [settings.drift * 0.58, -settings.lift];
  const rotation = from === "left" ? [-0.8, 0.25] : from === "right" ? [0.8, -0.25] : [0.18, 0];

  const x = useTransform(scrollYProgress, [0, 1], driftX);
  const y = useTransform(scrollYProgress, [0, 1], driftY);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.972, 1, 1.01]);
  const rotate = useTransform(scrollYProgress, [0, 1], rotation);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0.2, 1, 1, 0.94]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ x, y, scale, rotate, opacity }}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: xStart,
          y: yStart,
          scale: 0.965,
          filter: "blur(18px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
