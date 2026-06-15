"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/PageLoader.module.css";
import gsap from "gsap";

export const PageLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loaderObj = { val: 0 };
      
      // Animate progress number
      gsap.to(loaderObj, {
        val: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const currentVal = Math.floor(loaderObj.val);
          setProgress(currentVal);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${currentVal}%`;
          }
        },
        onComplete: () => {
          // Slide up and hide loader
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
              setIsDone(true);
            }
          });
        }
      });

      // Subtle initial fade in for text
      gsap.fromTo(
        `.${styles.title}, .${styles.topRow}, .${styles.bottomRow}`,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

  return (
    <div ref={containerRef} className={styles.loaderContainer} aria-label="Loading Page">
      <div className={styles.topRow}>
        <span className={styles.brand}>WHITESPACE SOLUTIONS</span>
        <span className={styles.status}>SYSTEM INITIALIZATION...</span>
      </div>

      <div className={styles.centerRow}>
        <h1 className={styles.title}>
          BUILDING<br />WHITESPACES.
        </h1>
        <div className={styles.number}>
          {progress.toString().padStart(3, "0")}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.label}>© 2026 WHITESPACE SOLUTIONS</span>
        <div className={styles.barWrapper}>
          <div ref={progressBarRef} className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};
