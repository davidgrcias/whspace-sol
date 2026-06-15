"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Hero.module.css";
import gsap from "gsap";

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoSrc = "/HITESPACE_SOLUTIONS_INTRO_Co.mp4";

  // Stagger entry animations on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Prepare headline text for dynamic reveal
    const headline = headlineRef.current;
    if (headline) {
      const text = headline.innerText;
      headline.innerHTML = text
        .split(" ")
        .map(word => {
          return `<span style="overflow:hidden; display:inline-block; vertical-align:bottom; padding-bottom: 5px;">
            <span class="hero-word" style="display:inline-block; transform:translateY(115%);">${word}</span>
          </span>`;
        })
        .join(" ");
    }

    // Prepare subheadline text for dynamic reveal
    const subheadline = subtitleRef.current;
    if (subheadline) {
      const text = subheadline.innerText;
      subheadline.innerHTML = text
        .split(" ")
        .map(word => {
          return `<span style="overflow:hidden; display:inline-block; vertical-align:bottom;">
            <span class="hero-subword" style="display:inline-block; transform:translateY(115%);">${word}</span>
          </span>`;
        })
        .join(" ");
    }

    // Start reveal animations after page loader slides out
    tl.to(".hero-word", {
      transform: "translateY(0%)",
      stagger: 0.08,
      duration: 1.2,
      ease: "power4.out",
      delay: 2.2 // wait for PageLoader to slide up
    });
    
    tl.to(".hero-subword", {
      transform: "translateY(0%)",
      stagger: 0.03,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.8");

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.4"
    );
  }, []);

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        opacity: 0.48, // Premium subtle opacity for high contrast reading
        duration: 1.5,
        ease: "power2.out"
      });
    }
  };

  // Canvas Particle Grid effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid spacing configuration
    const spacing = 40;
    const particles: Array<{
      x: number; // Current X
      y: number; // Current Y
      ox: number; // Original X
      oy: number; // Original Y
      vx: number; // Velocity X
      vy: number; // Velocity Y
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initParticles();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // We draw light dots
      ctx.fillStyle = "rgba(201, 168, 76, 0.4)"; // Soft Gold

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion force distance threshold
        const limit = 120;

        if (dist < limit) {
          // Push particles away from mouse
          const force = (limit - dist) / limit;
          const angle = Math.atan2(dy, dx);
          
          // Target coordinates when pushed
          const tx = p.x - Math.cos(angle) * force * 45;
          const ty = p.y - Math.sin(angle) * force * 45;

          p.vx += (tx - p.x) * 0.15;
          p.vy += (ty - p.y) * 0.15;
        }

        // Return force back to origin anchor
        const dxO = p.ox - p.x;
        const dyO = p.oy - p.y;
        p.vx += dxO * 0.05;
        p.vy += dyO * 0.05;

        // Apply friction
        p.vx *= 0.85;
        p.vy *= 0.85;

        // Update coordinates
        p.x += p.vx;
        p.y += p.vy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollClick = () => {
    const element = document.getElementById("manifesto");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className={styles.section} aria-label="Hero Section">
      {/* Background Video Slot */}
      <div className={styles.videoWrapper}>
        <div className={styles.overlay} />
        {/* Placeholder gradient / visual before video mounts */}
        <div className={styles.fallbackBg} />
        {videoSrc && (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            src={videoSrc}
            onCanPlay={handleVideoCanPlay}
          />
        )}
      </div>

      {/* Interactive Canvas Overlay */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.textBlock}>
          <p className="mono-label" style={{ marginBottom: "20px" }}>
            WHITESPACE SOLUTIONS / INTRO
          </p>
          <h1 ref={headlineRef} className={`${styles.headline} magnify-hover`}>
            {t.hero.headline}
          </h1>
          <p ref={subtitleRef} className={styles.subheadline}>
            {t.hero.subheadline}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollRef} 
        className={styles.scrollIndicator} 
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        aria-label="Scroll Down"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleScrollClick();
          }
        }}
      >
        <span className={styles.scrollText}>{t.hero.scroll}</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
};
