"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Navbar.module.css";

// Helper for text scramble effect
const scrambleText = (
  element: HTMLElement,
  originalText: string,
  duration = 800
) => {
  const chars = "XYZ0123456789_-?/\\%#@*+[]{}";
  let start = 0;
  const interval = 30; // ms
  const totalSteps = duration / interval;
  
  const timer = setInterval(() => {
    start++;
    const progress = start / totalSteps;
    
    element.innerText = originalText
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index / originalText.length < progress) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (start >= totalSteps) {
      clearInterval(timer);
      element.innerText = originalText;
    }
  }, interval);

  return () => clearInterval(timer);
};

export const Navbar: React.FC = () => {
  const { language, t, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, text: string) => {
    const target = e.currentTarget.querySelector(".scramble-target") as HTMLElement;
    if (target) {
      scrambleText(target, text);
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        {/* Brand Wordmark */}
        <a href="#hero" className={styles.logo} onClick={(e) => handleScrollTo(e, "hero")}>
          WHITESPACE<span>.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <a
            href="#manifesto"
            onClick={(e) => handleScrollTo(e, "manifesto")}
            onMouseEnter={(e) => handleLinkHover(e, t.nav.manifesto)}
          >
            <span className="scramble-target">{t.nav.manifesto}</span>
          </a>
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "services")}
            onMouseEnter={(e) => handleLinkHover(e, t.nav.services)}
          >
            <span className="scramble-target">{t.nav.services}</span>
          </a>
          <a
            href="#process"
            onClick={(e) => handleScrollTo(e, "process")}
            onMouseEnter={(e) => handleLinkHover(e, t.nav.howWeWork)}
          >
            <span className="scramble-target">{t.nav.howWeWork}</span>
          </a>
          <a
            href="#team"
            onClick={(e) => handleScrollTo(e, "team")}
            onMouseEnter={(e) => handleLinkHover(e, t.nav.team)}
          >
            <span className="scramble-target">{t.nav.team}</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            onMouseEnter={(e) => handleLinkHover(e, t.nav.contact)}
            className={styles.contactBtn}
          >
            <span className="scramble-target">{t.nav.contact}</span>
          </a>
        </nav>

        {/* Right Controls */}
        <div className={styles.controls}>
          <button 
            onClick={toggleLanguage} 
            className={styles.langToggle}
            aria-label="Toggle language"
          >
            <span>{language === "en" ? "EN" : "ID"}</span>
          </button>

          <button 
            className={styles.menuToggle} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburger}>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={styles.drawer}>
        <div className={styles.drawerContent}>
          <a href="#manifesto" onClick={(e) => handleScrollTo(e, "manifesto")}>{t.nav.manifesto}</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, "services")}>{t.nav.services}</a>
          <a href="#process" onClick={(e) => handleScrollTo(e, "process")}>{t.nav.howWeWork}</a>
          <a href="#team" onClick={(e) => handleScrollTo(e, "team")}>{t.nav.team}</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")}>{t.nav.contact}</a>
        </div>
      </div>
    </header>
  );
};
