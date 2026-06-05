"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

export default function StatsCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(120);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Subida lineal constante hasta 360, más lento para que se note número a número
      const controls = animate(count, 360, { duration: 12, ease: "linear" });
      return controls.stop;
    }
  }, [isInView, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col h-full min-h-[400px] w-full rounded-[2.5rem] bg-zinc-900 border border-white/20 overflow-hidden relative transition-colors shadow-[0_8px_32px_rgba(255,255,255,0.1)] cursor-default"
    >
      {/* Background GIF */}
      <img 
        src="/developer.gif" 
        alt="Developer Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 mix-blend-screen"
      />
      {/* Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="font-heading text-6xl sm:text-7xl font-bold tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
          +<motion.span>{rounded}</motion.span>
        </h3>
        <h4 className="font-heading text-2xl font-bold tracking-widest uppercase text-white mb-4 drop-shadow-md">
          Proyectos
        </h4>
        <p className="text-gray-300 text-sm sm:text-base max-w-[300px] leading-relaxed font-medium drop-shadow-md">
          Experiencia continua en proyectos personales, agencias y como desarrollador autónomo.
        </p>
      </div>
    </motion.div>
  );
}
