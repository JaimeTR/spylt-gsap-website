"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/portfolio/WelcomeScreen";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import ParticlesBackground from "@/components/portfolio/ParticlesBackground";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-black text-foreground font-sans overflow-hidden selection:bg-accent selection:text-white relative">
      <ParticlesBackground />
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen key="welcome" onEnter={() => setShowWelcome(false)} />
        ) : (
          <ProjectGallery key="gallery" />
        )}
      </AnimatePresence>
    </main>
  );
}
