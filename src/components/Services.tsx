"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Services.module.css";
import gsap from "gsap";

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useEffect(() => {
    // Stagger fade-in of service rows when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rows = rowsRef.current?.children;
            if (rows) {
              gsap.fromTo(
                rows,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.15,
                  duration: 1,
                  ease: "power3.out",
                }
              );
            }
            
            gsap.fromTo(
              headingRef.current,
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
            );

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
      id="services"
      ref={sectionRef}
      className={`${styles.section} dark-section`}
      aria-label="Core Services"
    >
      <div className="grid-container" style={{ marginBottom: "60px" }}>
        <div className={styles.headerCol}>
          <p className="mono-label">{t.services.tag}</p>
          <h2 ref={headingRef} className={styles.heading}>
            {t.services.sub}
          </h2>
        </div>
      </div>

      {/* Full-width Horizontal Service Bands (Anti-Generic Grid) */}
      <div ref={rowsRef} className={styles.rowsContainer}>
        {t.services.items.map((service, index) => {
          const isActive = activeRow === index;
          return (
            <div
              key={service.num}
              className={`${styles.row} ${isActive ? styles.activeRow : ""}`}
              onMouseEnter={() => setActiveRow(index)}
              onMouseLeave={() => setActiveRow(null)}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`Service: ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveRow(isActive ? null : index);
                }
              }}
            >
              <div className={styles.rowBorder} />
              
              <div className={styles.rowContent}>
                {/* Asymmetric Left side: Number + Title */}
                <div className={styles.leftMeta}>
                  <span className={styles.number}>{service.num}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                </div>

                {/* Asymmetric Right side: description (revealed/expanded) */}
                <div className={styles.rightDesc}>
                  <p className={styles.description}>{service.desc}</p>
                </div>

                {/* Interactive arrow marker */}
                <div className={styles.arrowContainer}>
                  <svg
                    className={styles.arrow}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative coordinate watermark (Anti-Generic signature) */}
      <div className={styles.coordinates}>
        <span>LAT: -6.2088° S | LON: 106.8456° E [JAKARTA]</span>
      </div>
    </section>
  );
};
