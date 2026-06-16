"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { HowWeWork } from "@/components/HowWeWork";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";
import { StrategicBrief } from "@/components/StrategicBrief";
import { Contact } from "@/components/Contact";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  useEffect(() => {
    // Dynamic Scroll Observer to toggle light/dark theme on body
    const darkSections = document.querySelectorAll(".dark-section");
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies core viewport area
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If a dark section is in view, apply dark-theme-active
          document.body.classList.add("dark-theme-active");
        } else {
          // Verify if any other dark section is still intersecting
          let anyDarkVisible = false;
          darkSections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            // Check if section overlaps with our viewport threshold
            const inViewport = 
              rect.top < window.innerHeight * 0.8 && 
              rect.bottom > window.innerHeight * 0.2;
            if (inViewport) {
              anyDarkVisible = true;
            }
          });

          if (!anyDarkVisible) {
            document.body.classList.remove("dark-theme-active");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    darkSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.body.classList.remove("dark-theme-active");
    };
  }, []);

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <Navbar />
      <Hero />
      <Manifesto />
      <Services />
      <HowWeWork />
      <Stats />
      <Team />
      <StrategicBrief />
      <Contact />
      <ChatWidget />
    </main>
  );
}
