"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/SectionIndicator.module.css";

const sections = ["hero", "manifesto", "services", "process", "stats", "team", "contact"];

export const SectionIndicator: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressPercent = ((activeIdx + 1) / sections.length) * 100;

  return (
    <div className={styles.indicatorContainer} aria-hidden="true">
      <div className={styles.numbers}>
        <span className={styles.current}>{(activeIdx + 1).toString().padStart(2, "0")}</span>
        <div className={styles.divider}>
          <div className={styles.progressFill} style={{ height: `${progressPercent}%` }} />
        </div>
        <span className={styles.total}>{sections.length.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};
