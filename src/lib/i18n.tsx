"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

const translations = {
  en: {
    nav: {
      manifesto: "Manifesto",
      services: "Services",
      howWeWork: "Process",
      team: "Team",
      contact: "Contact",
    },
    hero: {
      headline: "Turning Whitespaces into Winning Spaces",
      subheadline: "We are a management consulting & strategic advisory firm that builds and deploys proprietary AI software. We bridge elite strategy with operator execution.",
      scroll: "SCROLL",
    },
    manifesto: {
      tag: "THE MANIFESTO",
      main: "We don't just advise. We actively build and execute side-by-side with our clients.",
      sub: "In a world full of standard blueprints, we find the overlooked 'whitespaces'—the hidden growth pockets and inefficiencies in mid-market enterprises—and turn them into unfair competitive advantages.",
    },
    services: {
      tag: "OUR CORE SERVICES",
      sub: "Integrating BCG-grade strategic advisory with cutting-edge software engineering.",
      items: [
        {
          num: "01",
          title: "Turnaround & Transformation",
          desc: "We step in as operator-advisors to stabilize cash flow, restructure operations, and rescue underperforming divisions under pressure.",
        },
        {
          num: "02",
          title: "Productivity & AI Automation",
          desc: "We build bespoke software—from custom RAG search modules and voice automation to data-driven workflow engines—to eliminate overhead.",
        },
        {
          num: "03",
          title: "Deals & Growth Advisory",
          desc: "We navigate complex corporate actions, including M&A execution, strategic alliances, and direct expansion into new product-market fits.",
        },
        {
          num: "04",
          title: "Capital Management",
          desc: "We design optimal debt-equity structures, optimize working capital, and prepare mid-market companies for major liquidity events.",
        },
      ],
    },
    process: {
      tag: "OPERATING MODEL",
      sub: "How we turn white spaces into value, step-by-step.",
      steps: [
        {
          num: "01",
          title: "Identify",
          desc: "Through deep data auditing and on-the-ground assessment, we locate the structural and technical gaps within your operations.",
        },
        {
          num: "02",
          title: "Architect",
          desc: "We design both the business turnaround strategy and the technical specs of custom software tools required to achieve it.",
        },
        {
          num: "03",
          title: "Execute",
          desc: "We embed our operators directly into your team, deploy the custom software, and run the transition until value is fully realized.",
        },
      ],
    },
    stats: {
      experience: "Years Combined Experience",
      pedigree: "Elite Consulting Roots",
      execution: "Hands-on Software Delivery",
      quote: "Our goal is simple: to leave every company we touch structurally stronger, technologically advanced, and self-sustaining.",
      author: "Stevien Washington",
      role: "Managing Partner",
    },
    team: {
      tag: "LEADERSHIP & OPERATORS",
      sub: "A combination of ex-BCG consultants, startup founders, and technical builders.",
    },
    contact: {
      tag: "LET'S DEFINE YOUR SPACE",
      headline: "Let's Find Your Whitespace.",
      name: "Your Name",
      email: "Email Address",
      message: "How can we help you?",
      send: "Send Inquiry",
      sending: "Sending...",
      success: "Thank you. We will be in touch shortly.",
      office: "Office Headquarters",
      jakartaSelatan: "Mangkuluhur City Office Tower, Level 29\nJl. Gatot Subroto Kav. 1, Jakarta Selatan",
      jakartaBarat: "Puri Lingkar Dalam\nKembangan Selatan, Kec. Kembangan, Jakarta Barat",
    },
  },
  id: {
    nav: {
      manifesto: "Manifesto",
      services: "Layanan",
      howWeWork: "Proses",
      team: "Tim",
      contact: "Kontak",
    },
    hero: {
      headline: "Mengubah Ruang Kosong Menjadi Ruang Kemenangan",
      subheadline: "Kami adalah firma konsultasi manajemen & penasihat strategis yang membangun dan menerapkan perangkat lunak AI khusus. Kami menjembatani strategi elit dengan eksekusi operator.",
      scroll: "GULIR",
    },
    manifesto: {
      tag: "MANIFESTO KAMI",
      main: "Kami tidak sekadar memberi saran. Kami aktif membangun dan mengeksekusi bersama klien kami.",
      sub: "Di dunia yang dipenuhi dengan cetak biru standar, kami menemukan 'whitespace' yang terlewatkan—celah pertumbuhan tersembunyi dan inefisiensi pada perusahaan skala menengah—dan mengubahnya menjadi keunggulan kompetitif yang tak tertandingi.",
    },
    services: {
      tag: "LAYANAN UTAMA",
      sub: "Mengintegrasikan konsultasi strategis berstandar BCG dengan rekayasa perangkat lunak mutakhir.",
      items: [
        {
          num: "01",
          title: "Turnaround & Transformasi",
          desc: "Kami bertindak sebagai operator-advisor untuk menstabilkan arus kas, merestrukturisasi operasional, dan menyelamatkan divisi yang kurang berkinerja.",
        },
        {
          num: "02",
          title: "Produktivitas & Otomasi AI",
          desc: "Kami membangun perangkat lunak khusus—mulai dari modul pencarian RAG kustom dan otomasi suara hingga mesin alur kerja berbasis data—untuk memangkas biaya operasional.",
        },
        {
          num: "03",
          title: "Penasihat Transaksi & Pertumbuhan",
          desc: "Kami memandu aksi korporasi yang kompleks, termasuk eksekusi M&A, aliansi strategis, dan ekspansi langsung ke pasar produk baru.",
        },
        {
          num: "04",
          title: "Manajemen Modal",
          desc: "Kami merancang struktur utang-ekuitas yang optimal, memaksimalkan modal kerja, dan mempersiapkan perusahaan skala menengah untuk peristiwa likuiditas besar.",
        },
      ],
    },
    process: {
      tag: "MODEL OPERASI",
      sub: "Bagaimana kami mengubah ruang kosong menjadi nilai nyata, langkah demi langkah.",
      steps: [
        {
          num: "01",
          title: "Identifikasi",
          desc: "Melalui audit data mendalam dan penilaian langsung di lapangan, kami menemukan celah struktural dan teknis dalam operasional Anda.",
        },
        {
          num: "02",
          title: "Arsitek",
          desc: "Kami merancang strategi perbaikan bisnis dan spesifikasi teknis dari perangkat lunak khusus yang diperlukan untuk mencapainya.",
        },
        {
          num: "03",
          title: "Eksekusi",
          desc: "Kami menempatkan operator kami secara langsung di tim Anda, meluncurkan perangkat lunak kustom, dan menjalankan transisi hingga nilai tercapai sepenuhnya.",
        },
      ],
    },
    stats: {
      experience: "Tahun Pengalaman Gabungan",
      pedigree: "Akar Konsultasi Elit",
      execution: "Pengiriman Perangkat Lunak Langsung",
      quote: "Tujuan kami sederhana: meninggalkan setiap perusahaan yang kami bantu menjadi lebih kuat secara struktural, canggih secara teknologi, dan mandiri.",
      author: "Stevien Washington",
      role: "Managing Partner",
    },
    team: {
      tag: "KEPEMIMPINAN & OPERATOR",
      sub: "Kombinasi dari konsultan ex-BCG, pendiri startup, dan pembangun teknologi.",
    },
    contact: {
      tag: "MARI TENTUKAN RUANG ANDA",
      headline: "Temukan Whitespace Anda.",
      name: "Nama Anda",
      email: "Alamat Email",
      message: "Bagaimana kami dapat membantu Anda?",
      send: "Kirim Pesan",
      sending: "Mengirim...",
      success: "Terima kasih. Kami akan segera menghubungi Anda.",
      office: "Kantor Pusat",
      jakartaSelatan: "Mangkuluhur City Office Tower, Lantai 29\nJl. Gatot Subroto Kav. 1, Jakarta Selatan",
      jakartaBarat: "Puri Lingkar Dalam\nKembangan Selatan, Kec. Kembangan, Jakarta Barat",
    },
  },
};

interface LanguageContextProps {
  language: Language;
  t: typeof translations.en;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en"); // Default to English as requested

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred_lang") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferred_lang", newLang);
  };

  const value = {
    language,
    t: translations[language],
    toggleLanguage,
  };

  return <LanguageContext.Provider value={value}>{language ? children : null}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
