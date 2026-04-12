"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const initialX = from === "left" ? -distance : from === "right" ? distance : 0;
  const initialY = from === "bottom" ? distance : distance * 0.32;

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: initialX,
              y: initialY,
              scale: 0.965,
              filter: "blur(12px)",
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
