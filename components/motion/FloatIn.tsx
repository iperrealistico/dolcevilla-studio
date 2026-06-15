"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSimplifiedMotion } from "@/hooks/useSimplifiedMotion";
import { cn } from "@/lib/utils/cn";

type FloatInProps = {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right";
  delay?: number;
  distance?: number;
  amount?: number;
};

export function FloatIn({
  children,
  className,
  from = "bottom",
  delay = 0,
  distance = 38,
  amount = 0.12,
}: FloatInProps) {
  const reduceMotion = useReducedMotion();
  const simplifyMotion = useSimplifiedMotion();
  const disableAnimation = reduceMotion || simplifyMotion;
  const { ref, inView } = useInViewOnce<HTMLDivElement>(!disableAnimation);
  const initialX = from === "left" ? -distance : from === "right" ? distance : 0;
  const initialY = from === "bottom" ? distance : distance * 0.32;
  const initialScale = 1 - Math.min(amount, 0.18) * 0.15;

  if (disableAnimation) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("mobile-motion-static transform-gpu", className)}
      style={{ backfaceVisibility: "hidden" }}
      initial={
        {
          opacity: 0,
          x: initialX,
          y: initialY,
          scale: initialScale,
        }
      }
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
