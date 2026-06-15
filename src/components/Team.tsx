"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/Team.module.css";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  image: string;
}

const teamList: TeamMember[] = [
  {
    id: "stevien",
    name: "Stevien Washington",
    role: "Managing Partner",
    tagline: "Ex-BCG Consultant • Kelkey School of Business MBA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "dick",
    name: "Dick Listijono",
    role: "Partner & Co-Founder",
    tagline: "Founder ReCharge Indonesia • Operator & Automation Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "azhan",
    name: "Azhan A.",
    role: "Value Creation Advisor",
    tagline: "Advisory & Venture Operator • Growth Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
];

export const Team: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="team"
      className={`${styles.section} dark-section`}
      aria-label="Our Team"
    >
      <div className="grid-container" style={{ marginBottom: "60px" }}>
        <div className={styles.headerCol}>
          <p className="mono-label">{t.team.tag}</p>
          <h2 className={styles.heading}>{t.team.sub}</h2>
        </div>
      </div>

      <div className="grid-container">
        <div className={styles.cardsGrid}>
          {teamList.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Subcomponent for the 3D Tilt Card (Self-contained and highly interactive)
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const reflection = reflectionRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x within card
    const y = e.clientY - rect.top; // mouse y within card
    
    // Percentage from center (-0.5 to 0.5)
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    // Rotations (max 15 degrees)
    const rotateX = -py * 20;
    const rotateY = px * 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (reflection) {
      const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
      reflection.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const reflection = reflectionRef.current;
    if (!card) return;

    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (reflection) {
      reflection.style.background = "transparent";
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Light Reflection effect overlay */}
      <div ref={reflectionRef} className={styles.reflection} />

      {/* Asymmetric polygonal image crop (Anti-generic visual shape) */}
      <div className={styles.imageWrapper}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized // Unsplash remote images helper
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className={styles.imageOverlay} />
      </div>

      <div className={styles.cardContent}>
        <span className={styles.roleLabel}>{member.role}</span>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.tagline}>{member.tagline}</p>
      </div>
    </div>
  );
};
