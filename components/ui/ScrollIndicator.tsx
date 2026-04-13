"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-px h-16 bg-text-tertiary/30 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          animate={{
            height: ["0%", "100%", "0%"],
            top: ["0%", "0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
