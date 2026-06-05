"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-foreground"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
    >
      {/* Background is now handled globally in page.tsx */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="font-heading text-accent tracking-[0.2em] uppercase text-sm md:text-base font-medium mb-4"
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Portafolio de Proyectos
        </motion.h2>
        
        <motion.h1
          className="font-heading text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Jaime Tarazona
        </motion.h1>

        <motion.p
          className="text-muted text-lg md:text-xl max-w-2xl font-light mb-12 flex flex-wrap justify-center gap-x-3 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span>Full Stack Developer</span>
          <span className="text-accent/50 hidden md:inline">•</span>
          <span>WordPress Expert</span>
          <span className="text-accent/50 hidden md:inline">•</span>
          <span>AI Automation Specialist</span>
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-white transition-all duration-300 ease-out bg-card border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-accent/20"></span>
          <span className="relative flex items-center gap-2">
            Ver Proyectos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
