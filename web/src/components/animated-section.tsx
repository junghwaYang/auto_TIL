"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  index: number;
}

export function AnimatedSection({ children, index }: AnimatedSectionProps) {
  return (
    <motion.div
      title="animated-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}
