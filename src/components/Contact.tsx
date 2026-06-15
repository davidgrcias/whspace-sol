"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Contact.module.css";

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("sending");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className={styles.section} aria-label="Contact Section">
      {/* Dynamic Animated Marquee Ticker */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerTrack}>
          <span>LET'S CREATE THE FUTURE • WORK WITH US • TURN WHITESPACES INTO WINNING SPACES • </span>
          <span>LET'S CREATE THE FUTURE • WORK WITH US • TURN WHITESPACES INTO WINNING SPACES • </span>
          <span>LET'S CREATE THE FUTURE • WORK WITH US • TURN WHITESPACES INTO WINNING SPACES • </span>
        </div>
      </div>

      <div className="grid-container">
        {/* Asymmetric Left side: Headline + Minimalist Form */}
        <div className={styles.formCol}>
          <p className="mono-label" style={{ marginBottom: "20px" }}>{t.contact.tag}</p>
          <h2 className={`${styles.headline} magnify-hover`}>
            <span>{t.contact.headline}</span>
          </h2>

          {status === "success" ? (
            <div className={styles.successMessage}>
              <p>{t.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.name}
                  required
                  className={styles.input}
                  aria-label={t.contact.name}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.email}
                  required
                  className={styles.input}
                  aria-label={t.contact.email}
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder={t.contact.message}
                  required
                  rows={4}
                  className={styles.input}
                  aria-label={t.contact.message}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
              >
                <span>{status === "sending" ? t.contact.sending : t.contact.send}</span>
              </button>
            </form>
          )}
        </div>

        {/* Asymmetric Right side: Corporate Office Details (BCG / ReCharge circles feel) */}
        <div className={styles.infoCol}>
          <div className={styles.officeBlock}>
            <h3 className={styles.officeTitle}>{t.contact.office} (HQ)</h3>
            <p className={styles.address}>
              {t.contact.jakartaSelatan}
            </p>
            <p className={styles.phone}>021-39731400</p>
          </div>

          <div className={styles.officeBlock}>
            <h3 className={styles.officeTitle}>{t.contact.office} (Alt)</h3>
            <p className={styles.address}>
              {t.contact.jakartaBarat}
            </p>
          </div>

          <div className={styles.emailBlock}>
            <span className={styles.emailLabel}>DIRECT INQUIRY</span>
            <a href="mailto:contact@whitespace.id" className={styles.emailLink}>
              contact@whitespace.id
            </a>
          </div>
        </div>
      </div>

      {/* Footer Meta Row */}
      <footer className={styles.footer}>
        <div className="grid-container">
          <div className={styles.footerLeft}>
            <span>© {new Date().getFullYear()} WHITESPACE SOLUTIONS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className={styles.footerRight}>
            <a href="https://linkedin.com/company/whitespace-solutions-id" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <span>•</span>
            <a href="#hero">BACK TO TOP</a>
          </div>
        </div>
      </footer>
    </section>
  );
};
