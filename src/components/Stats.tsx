"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Stats.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Stats: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Counter values
  const [expCount, setExpCount] = useState(0);
  const [pedigreeCount, setPedigreeCount] = useState(0);
  const [valueCount, setValueCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statsObj = { exp: 0, pedigree: 0, value: 0 };

      gsap.to(statsObj, {
        exp: 15,
        pedigree: 100,
        value: 500,
        duration: 2.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          setExpCount(Math.floor(statsObj.exp));
          setPedigreeCount(Math.floor(statsObj.pedigree));
          setValueCount(Math.floor(statsObj.value));
        }
      });

      // GSAP slide quote in
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={`${styles.section} dark-section`}
      aria-label="Impact and Pedigree Stats"
    >
      <div className="grid-container">
        {/* Asymmetric Stats Widgets */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.number}>
              <span>{expCount}</span>+
            </div>
            <div className={styles.label}>{t.stats.experience}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.number}>
              <span>{pedigreeCount}</span>%
            </div>
            <div className={styles.label}>{t.stats.pedigree}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.number}>
              IDR <span>{valueCount}</span>B+
            </div>
            <div className={styles.label}>{t.stats.execution}</div>
          </div>
        </div>

        {/* Pull Quote Column */}
        <div ref={quoteRef} className={styles.quoteBlock}>
          <svg
            className={styles.quoteIcon}
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0C21.7333 0 28 6.26667 28 14C28 25.2 18.2 33.6 5.6 35.6L4.2 32.8C11.2 30 14 24.5 14 20.3C14 19.6 13.3 19.6 12.6 19.6C5.6 19.6 0 14 0 7C0 3.08 3.08 0 7 0H14ZM38 0C45.7333 0 52 6.26667 52 14C52 25.2 42.2 33.6 29.6 35.6L28.2 32.8C35.2 30 38 24.5 38 20.3C38 19.6 37.3 19.6 36.6 19.6C29.6 19.6 24 14 24 7C24 3.08 27.08 0 31 0H38Z"
              fill="rgba(201, 168, 76, 0.15)"
            />
          </svg>
          <blockquote className={styles.blockquote}>
            <p>"{t.stats.quote}"</p>
            <cite className={styles.cite}>
              <span className={styles.author}>{t.stats.author}</span>
              <span className={styles.role}>{t.stats.role}</span>
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
