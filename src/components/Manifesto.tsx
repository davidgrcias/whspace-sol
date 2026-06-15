"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Manifesto.module.css";
import gsap from "gsap";

export const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text word-by-word as you scroll
    const textElement = wordsRef.current;
    if (!textElement) return;

    const wordsText = textElement.innerText;
    textElement.innerHTML = wordsText
      .split(" ")
      .map((word) => `<span class="${styles.word}">${word}</span>`)
      .join(" ");

    const spans = textElement.querySelectorAll(`.${styles.word}`);
    
    // Intersection Observer to stagger reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              spans,
              { opacity: 0.1, y: 10 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              }
            );

            gsap.fromTo(
              detailRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.4 }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [t.manifesto.main]); // Re-run if language changes

  return (
    <section 
      id="manifesto" 
      ref={sectionRef} 
      className={styles.section}
      aria-label="Company Manifesto"
    >
      <div className="grid-container">
        {/* Asymmetric layout: empty left side, content on right */}
        <div className={styles.leftCol}>
          <p className="mono-label">{t.manifesto.tag}</p>
        </div>

        <div className={styles.rightCol}>
          <h2 ref={wordsRef} className={`${styles.mainText} magnify-hover`}>
            {t.manifesto.main}
          </h2>

          <div ref={detailRef} className={styles.detailBlock}>
            <p className={styles.paragraph}>
              {t.manifesto.sub}
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical blueprint lines (Anti-Generic signature) */}
      <div className={styles.gridLineLeft} />
      <div className={styles.gridLineRight} />
    </section>
  );
};
