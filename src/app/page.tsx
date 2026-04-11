"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import MessageSection from "@/sections/MessageSection";
import NutritionSection from "@/sections/NutritionSection";
import FlavorSection from "@/sections/FlavorSection";
import BenefitSection from "@/sections/BenefitSection";
import TestimonialSection from "@/sections/TestimonialSection";
import FooterSection from "@/sections/FooterSection";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <Preloader isLoaded={isVideoLoaded} onFinish={() => setIsPreloaderDone(true)} />
      <div className={!isPreloaderDone ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <HeroSection 
              onLoaded={() => setIsVideoLoaded(true)} 
              triggerAnimation={isPreloaderDone} 
            />
            <MessageSection />
            <FlavorSection />
            <NutritionSection />
            <div>
              <BenefitSection />
              <TestimonialSection />
            </div>
            <FooterSection />
          </div>
        </div>
      </div>
    </main>
  );
}

