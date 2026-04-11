"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  isLoaded: boolean;
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoaded, onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isLoaded) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 5;
          return prev;
        });
      }, 200);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoaded]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();
      tl.from(logoRef.current, {
        scale: 0.8,
        opacity: 0.5,
        y: 20,
        duration: 1,
        ease: "power3.out",
      }).from(
        progressRef.current,
        {
          width: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      if (isLoaded && progress === 100) {
        const exitTl = gsap.timeline({
          onComplete: onFinish,
          delay: 0.5,
        });

        exitTl
          .to(logoRef.current, {
            y: -20,
            duration: 1,
            ease: "power2.in",
          })
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 1,
              ease: "power4.inOut",
            },
            "-=0.2"
          );
      }
    },
    { dependencies: [isLoaded, progress], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-brown overflow-hidden">
      <div ref={logoRef} className="relative mb-8">
        <Image src="/images/nav-logo.svg" alt="Spylt Logo" width={150} height={150} className="w-32 md:w-60" priority />
      </div>
      <div className="w-64 h-1 bg-dark-brown/10 rounded-full overflow-hidden relative">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-milk transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-bold text-milk uppercase tracking-widest text-xs">Loading... {Math.round(progress)}%</div>
    </div>
  );
};

export default Preloader;
