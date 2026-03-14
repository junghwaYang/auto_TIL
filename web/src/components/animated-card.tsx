"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index: number;
  href: string;
}

export function AnimatedCard({ children, index, href }: AnimatedCardProps) {
  const router = useRouter();

  return (
    <motion.div
      title="animated-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      onClick={() => router.push(href)}
      className="cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(href);
        }
      }}
    >
      {children}
    </motion.div>
  );
}
