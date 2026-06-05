"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  url: string;
  allowIframe?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onOpenProject: (url: string) => void;
}

export default function ProjectCard({ project, onOpenProject }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-[32px] bg-card border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-white/20 transition-all duration-500 ease-out h-[350px] sm:h-[380px] lg:h-[400px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
        {project.image && project.image !== "" ? (
           <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card to-background transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
      </div>

      {/* Glassmorphism Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-20 flex flex-col p-6 w-full transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
        
        {/* Title & Category */}
        <div className="mb-3">
          <h3 className="font-heading text-3xl font-bold tracking-tight text-white mb-1">
            {project.title}
          </h3>
          <p className="text-base text-gray-400">
            {project.category}
          </p>
        </div>

        {/* Technologies / Tags */}
        <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-200 font-medium">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/80" /> {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="flex items-center gap-1 text-gray-400">
              +{project.technologies.length - 3} más
            </span>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            if (project.allowIframe === false || isMobile) {
              window.open(project.url, '_blank', 'noopener,noreferrer');
            } else {
              onOpenProject(project.url);
            }
          }}
          className="w-full relative group/btn overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center justify-center gap-2 bg-gradient-to-b from-white to-gray-200 border border-white/80 px-6 py-3.5 rounded-full text-sm font-bold tracking-widest text-black group-hover/btn:from-gray-100 group-hover/btn:to-gray-300 transition-colors w-full h-full shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
            <Globe className="w-4 h-4 text-black" />
            <span>VER PROYECTO</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
