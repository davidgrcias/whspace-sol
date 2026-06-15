"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Manifesto.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = wordsRef.current;
    if (!textElement) return;

    const wordsText = textElement.innerText;
    textElement.innerHTML = wordsText
      .split(" ")
      .map((word) => `<span class="${styles.word}">${word}</span>`)
      .join(" ");

    const spans = textElement.querySelectorAll(`.${styles.word}`);
    
    const ctx = gsap.context(() => {
      // Highlights words page by page as user scrolls down
      gsap.fromTo(
        spans,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textElement,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          }
        }
      );

      // Detail blocks fade/slide up
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: detailRef.current,
            start: "top 88%",
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
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
