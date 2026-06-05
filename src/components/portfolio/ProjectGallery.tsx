"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";
import ContactSection from "./ContactSection";
import ProjectViewer from "./ProjectViewer";
import StatsCard from "./StatsCard";

const categories = [
  "Todos",
  "Webs",
  "Sistemas Web",
  "Software a Medida",
  "Ecommerce",
  "Inteligencia Artificial",
  "Landing Pages",
  "Dashboards",
  "Apps",
  "UX/UI",
  "APIs"
];

export default function ProjectGallery() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProjectUrl, setSelectedProjectUrl] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Fetch projects from API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error("Error fetching projects:", err));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project: Project) => {
      return activeCategory === "Todos" || project.category === activeCategory;
    });
  }, [activeCategory, projectsData]);

  const projectCount = filteredProjects.length + 1;

  let gridClass = "grid gap-6 md:gap-8 mx-auto ";
  if (projectCount === 1) {
    gridClass += "grid-cols-1 max-w-md";
  } else if (projectCount === 2) {
    gridClass += "grid-cols-1 md:grid-cols-2 max-w-4xl";
  } else if (projectCount === 3) {
    gridClass += "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl";
  } else if (projectCount === 4) {
    gridClass += "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]";
  } else {
    gridClass += "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full";
  }

  return (
    <motion.div 
      className="relative min-h-screen bg-transparent pt-24 pb-12 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      
      <div className="relative z-10 flex flex-col flex-1">
        <ContactSection />
        
        {/* Modal / Project Viewer */}
        {selectedProjectUrl && (
          <ProjectViewer 
            url={selectedProjectUrl} 
            onClose={() => setSelectedProjectUrl(null)} 
          />
        )}

      {/* Header Fijo (Filtros animado en scroll) */}
      <header className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-500 pointer-events-none ${isScrolled ? "pt-4" : "pt-0"}`}>
        <div className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? "bg-zinc-900/60 backdrop-blur-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-full px-4 sm:px-8 py-2 max-w-[95vw] md:max-w-fit"
            : "w-full bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 md:py-4"
        }`}>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex justify-center overflow-x-auto hide-scrollbar gap-3 max-w-full pb-2 pt-1">
            {categories.map(category => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.9, y: 2 }}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 border ${
                  activeCategory === category 
                    ? "bg-gradient-to-r from-zinc-800 to-zinc-900 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md" 
                    : "bg-transparent border-white/5 text-gray-400 hover:bg-zinc-800/80 hover:text-white hover:border-white/10 backdrop-blur-sm"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Mobile Filters (Dropdown) */}
          <div className="md:hidden relative flex items-center justify-between min-w-[280px]">
            <span className="text-gray-400 text-sm font-medium">Categoría:</span>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const menu = document.getElementById('mobile-category-menu');
                if (menu) menu.classList.toggle('hidden');
              }}
              className="flex items-center gap-2 bg-zinc-900/80 border border-white/10 px-4 py-2 rounded-xl text-white font-semibold text-sm"
            >
              {activeCategory}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </motion.button>

            {/* Dropdown Menu */}
            <div id="mobile-category-menu" className="hidden absolute top-full right-0 mt-3 w-full sm:w-64 max-h-[60vh] overflow-y-auto bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    document.getElementById('mobile-category-menu')?.classList.add('hidden');
                  }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === category 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-12 flex-1 flex flex-col">
        {/* Galería */}
        <div className="mb-20 flex-1 flex flex-col justify-center">
          <motion.div layout className={gridClass}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: Project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onOpenProject={setSelectedProjectUrl}
                />
              ))}
              {filteredProjects.length > 0 && (
                <StatsCard key="stats-card" />
              )}
              {filteredProjects.length === 0 && (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center text-muted"
                >
                  <p className="text-xl">Aún no hay proyectos en esta categoría</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs mt-auto border-t border-white/10 gap-2">
          <p>Desarrollado por Jaime Tarazona</p>
          <p>Todos los derechos reservados © {new Date().getFullYear()}</p>
        </footer>
      </main>
      </div>

      {/* CSS para ocultar scrollbar en los filtros y efecto fade */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </motion.div>
  );
}
