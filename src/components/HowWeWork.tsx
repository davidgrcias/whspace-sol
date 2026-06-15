"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/HowWeWork.module.css";
import gsap from "gsap";

export const HowWeWork: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger fade-in of panels on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const panels = scrollContainerRef.current?.children;
            if (panels) {
              gsap.fromTo(
                panels,
                { opacity: 0, x: 50 },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.2,
                  duration: 1,
                  ease: "power3.out",
                }
              );
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`${styles.section} dark-section`}
      aria-label="Operating Process"
    >
      <div className="grid-container" style={{ marginBottom: "60px" }}>
        <div ref={headingRef} className={styles.headerCol}>
          <p className="mono-label">{t.process.tag}</p>
          <h2 className={styles.heading}>{t.process.sub}</h2>
        </div>
      </div>

      {/* Horizontal Scroll Containers */}
      <div className={styles.scrollOuter}>
        <div ref={scrollContainerRef} className={styles.scrollInner}>
          {t.process.steps.map((step, index) => {
            return (
              <div key={step.num} className={styles.panel}>
                <div className={styles.panelNumber}>{step.num}</div>
                <div className={styles.panelContent}>
                  {/* Custom SVG Blueprint Illustration (Anti-generic) */}
                  <div className={styles.illustrationWrapper}>
                    {index === 0 && (
                      // Identify SVG - Node networks, scanners
                      <svg viewBox="0 0 200 120" className={styles.svgDrawing}>
                        <defs>
                          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <circle cx="100" cy="60" r="40" fill="url(#grad1)" />
                        <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(255,255,255,0.15)" strokeDasharray="4,4" />
                        <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.15)" strokeDasharray="4,4" />
                        <circle cx="100" cy="60" r="25" stroke="#C9A84C" strokeWidth="1" fill="none" strokeDasharray="3,1" />
                        {/* Target reticle elements */}
                        <path d="M 90 60 L 110 60 M 100 50 L 100 70" stroke="#C9A84C" strokeWidth="1" />
                        <circle cx="70" cy="40" r="3" fill="#C9A84C" />
                        <line x1="70" y1="40" x2="100" y2="60" stroke="#C9A84C" strokeWidth="0.5" />
                        <circle cx="140" cy="75" r="4" fill="rgba(255,255,255,0.4)" />
                        <line x1="140" y1="75" x2="100" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <text x="25" y="30" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="var(--font-mono)">AUDIT_GATE: ACTIVE</text>
                      </svg>
                    )}

                    {index === 1 && (
                      // Architect SVG - Grid charts, modular boxes
                      <svg viewBox="0 0 200 120" className={styles.svgDrawing}>
                        {/* Grid lines */}
                        <path d="M 20 20 L 180 20 M 20 50 L 180 50 M 20 80 L 180 80 M 20 110 L 180 110" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                        <path d="M 40 10 L 40 110 M 90 10 L 90 110 M 140 10 L 140 110" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                        {/* Architect boxes */}
                        <rect x="30" y="35" width="40" height="30" fill="none" stroke="#C9A84C" strokeWidth="1" />
                        <rect x="110" y="35" width="50" height="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        {/* Connection arrow */}
                        <path d="M 70 50 L 110 50" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,2" />
                        <path d="M 105 47 L 110 50 L 105 53" fill="none" stroke="#C9A84C" strokeWidth="1" />
                        {/* Measurement indicator */}
                        <line x1="30" y1="75" x2="70" y2="75" stroke="rgba(201,168,76,0.6)" strokeWidth="0.5" />
                        <line x1="30" y1="72" x2="30" y2="78" stroke="rgba(201,168,76,0.6)" strokeWidth="0.5" />
                        <line x1="70" y1="72" x2="70" y2="78" stroke="rgba(201,168,76,0.6)" strokeWidth="0.5" />
                        <text x="45" y="85" fill="#C9A84C" fontSize="5" fontFamily="var(--font-mono)">w/s_SYSTEM</text>
                      </svg>
                    )}

                    {index === 2 && (
                      // Execute SVG - Arrows scaling upwards, operator cycles
                      <svg viewBox="0 0 200 120" className={styles.svgDrawing}>
                        {/* Axis */}
                        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <line x1="20" y1="100" x2="20" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Ascending data line */}
                        <path d="M 20 100 Q 60 90 90 60 T 160 30" fill="none" stroke="#C9A84C" strokeWidth="2" />
                        <circle cx="160" cy="30" r="4" fill="#C9A84C" />
                        {/* Concentric circles showing landing points */}
                        <circle cx="90" cy="60" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <circle cx="90" cy="60" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        {/* Fill bars */}
                        <rect x="40" y="80" width="8" height="20" fill="rgba(255,255,255,0.1)" />
                        <rect x="70" y="65" width="8" height="35" fill="rgba(255,255,255,0.2)" />
                        <rect x="100" y="45" width="8" height="55" fill="rgba(201,168,76,0.3)" />
                        <rect x="130" y="35" width="8" height="65" fill="#C9A84C" />
                        <text x="130" y="25" fill="#C9A84C" fontSize="5" fontFamily="var(--font-mono)">VALUE_REALIZED: 100%</text>
                      </svg>
                    )}
                  </div>

                  <h3 className={styles.panelTitle}>{step.title}</h3>
                  <p className={styles.panelDesc}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Instructions */}
      <div className={styles.slideNotice}>
        <span>[ GULIR HORIZONTAL / SCROLL HORIZONTAL ]</span>
      </div>
    </section>
  );
};
