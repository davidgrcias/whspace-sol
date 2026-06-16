"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/StrategicBrief.module.css";

export const StrategicBrief: React.FC = () => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    company: "",
    industry: "",
    challenge: ""
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefResult, setBriefResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.industry || !formData.challenge) return;

    setIsGenerating(true);
    setBriefResult(null);
    setError(null);

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate brief");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Stream not available");
      }

      let accumulatedText = "";
      setBriefResult(""); // Init empty string to show result container

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setBriefResult(accumulatedText);
      }
    } catch (err) {
      console.error("Brief generation error:", err);
      setError(language === "en" ? "Failed to generate brief. Please try again." : "Gagal membuat brief. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (briefResult) {
      navigator.clipboard.writeText(briefResult);
      alert(language === "en" ? "Copied to clipboard!" : "Disalin ke clipboard!");
    }
  };

  return (
    <section className={`${styles.section} dark-section`} id="brief">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>
            {language === "en" ? "Content Automation Demo" : "Demo Otomasi Konten"}
          </span>
          <h2 className={styles.title}>
            {language === "en" ? "AI Strategic Brief Generator" : "Generator AI Strategic Brief"}
          </h2>
          <p className={styles.description}>
            {language === "en" 
              ? "Experience our content automation capabilities. Tell us about your business, and our AI will generate a high-level strategic brief instantly."
              : "Rasakan kemampuan otomasi konten kami. Ceritakan tentang bisnis Anda, dan AI kami akan langsung membuat brief strategis tingkat tinggi."}
          </p>
          
          <div className={styles.formCard}>
            <form onSubmit={generateBrief}>
              <div className={styles.formGroup}>
                <label htmlFor="company" className={styles.label}>
                  {language === "en" ? "Company Name" : "Nama Perusahaan"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className={styles.input}
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  required
                  disabled={isGenerating}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="industry" className={styles.label}>
                  {language === "en" ? "Industry" : "Industri"}
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  className={styles.input}
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Fintech, Healthcare, E-commerce"
                  required
                  disabled={isGenerating}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="challenge" className={styles.label}>
                  {language === "en" ? "Biggest Challenge" : "Tantangan Terbesar"}
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  className={styles.textarea}
                  value={formData.challenge}
                  onChange={handleChange}
                  placeholder={language === "en" ? "What is the main operational or strategic challenge you are facing right now?" : "Apa tantangan operasional atau strategis utama yang Anda hadapi saat ini?"}
                  required
                  disabled={isGenerating}
                />
              </div>
              
              {error && <p style={{ color: "#ff4757", marginBottom: "16px" }}>{error}</p>}
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isGenerating || !formData.company || !formData.industry || !formData.challenge}
              >
                {isGenerating ? (
                  <>
                    <span className={styles.loader}></span>
                    {language === "en" ? "Analyzing Data..." : "Menganalisis Data..."}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    {language === "en" ? "Generate Strategic Brief" : "Buat Strategic Brief"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.resultArea}>
          {briefResult !== null && (
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className={styles.resultTitle}>
                  {language === "en" ? "Executive Brief" : "Ringkasan Eksekutif"}
                </h3>
              </div>
              
              <div className={styles.resultContent} dangerouslySetInnerHTML={{ __html: briefResult.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              
              {!isGenerating && briefResult.length > 50 && (
                <div className={styles.ctaContainer}>
                  <span className={styles.ctaText}>
                    {language === "en" ? "Want to execute on these priorities?" : "Ingin mengeksekusi prioritas ini?"}
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className={styles.ctaBtn} onClick={copyToClipboard}>
                      {language === "en" ? "Copy to Clipboard" : "Salin ke Clipboard"}
                    </button>
                    <a href="#contact" className={styles.ctaBtn} style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                      {language === "en" ? "Book Consultation" : "Jadwalkan Konsultasi"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {briefResult === null && (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.3)'
            }}>
              {language === "en" 
                ? "Your custom strategic brief will appear here." 
                : "Brief strategis khusus Anda akan muncul di sini."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
