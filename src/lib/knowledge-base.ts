export interface KBChunk {
  id: string;
  title: string;
  tags: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KBChunk[] = [
  {
    id: "KB-001",
    title: "Company Overview & Mission",
    tags: ["whitespace", "solutions", "mission", "vision", "values", "about", "philosophy", "jakarta", "tentang", "visi", "misi", "nilai"],
    content: `[English]
Whitespace Solutions is a management consulting & strategic advisory firm and search fund based in Jakarta, Indonesia (founded around 2023). 
Tagline & Positioning: "Turning Whitespaces into Winning Spaces".
We sit at the intersection of elite strategy and hands-on software building. Unlike traditional consultants who only advise, we build and deploy proprietary AI-powered software products (such as our flagship Knowledge Management Platform) to operationalize our strategic recommendations.
Core Values: Proactive Partnership (collaboration, not passive advising), Ownership Mindset (accountability and embedding with client teams), Strategic Collaboration (client's think tank), Network Synergy (leveraging BCG + local investor/business networks), and Tailored Solutions.

[Bahasa Indonesia]
Whitespace Solutions adalah firma konsultasi manajemen, penasihat strategis, dan search fund yang berbasis di Jakarta, Indonesia (didirikan sekitar tahun 2023).
Tagline & Posisi: "Mengubah Ruang Kosong Menjadi Ruang Kemenangan".
Kami berada di persimpangan antara strategi elit dan pembuatan perangkat lunak praktis. Berbeda dengan konsultan tradisional yang hanya memberikan saran, kami membangun dan menerapkan produk perangkat lunak bertenaga AI milik kami sendiri (seperti Knowledge Management Platform unggulan kami) untuk mewujudkan rekomendasi strategis kami.
Nilai-Nilai Inti: Kemitraan Proaktif, Pola Pikir Kepemilikan (Ownership Mindset), Kolaborasi Strategis, Sinergi Jaringan (BCG + investor lokal), dan Solusi Kustom.`
  },
  {
    id: "KB-002",
    title: "Services & Capabilities",
    tags: ["services", "capabilities", "turnaround", "transformation", "productivity", "automation", "ai", "deals", "growth", "capital", "layanan", "m&a", "keuangan", "teknologi"],
    content: `[English]
We offer four core services integrated with a custom technology/AI product layer:
1. Turnaround & Transformation: Operator-advisors stabilize cash flow, restructure operations, and rescue underperforming divisions under pressure.
2. Productivity & AI Automation: We build bespoke software—from custom RAG search modules and voice automation to data-driven workflow engines—to eliminate operational overhead.
3. Deals & Growth Advisory: Support complex corporate actions, including M&A execution, strategic alliances, and direct expansion into new product-market fits.
4. Capital Management & Advisory: Design optimal debt-equity structures, optimize working capital, and prepare mid-market companies for major liquidity events.
Product Layer: Flagship Knowledge Management Platform featuring Conversational AI, RAG, voice-enabled apps, and content automation.

[Bahasa Indonesia]
Kami menawarkan empat layanan utama yang terintegrasi dengan lapisan produk teknologi/AI kustom:
1. Turnaround & Transformasi: Operator-advisor menstabilkan arus kas, merestrukturisasi operasional, dan menyelamatkan divisi yang kurang berkinerja.
2. Produktivitas & Otomasi AI: Kami membangun perangkat lunak khusus—mulai dari modul pencarian RAG kustom dan otomasi suara hingga mesin alur kerja berbasis data—untuk memangkas biaya operasional.
3. Penasihat Transaksi & Pertumbuhan: Memandu aksi korporasi yang kompleks, termasuk eksekusi M&A, aliansi strategis, dan ekspansi langsung ke pasar produk baru.
4. Manajemen Modal & Penasihat: Merancang struktur utang-ekuitas yang optimal, memaksimalkan modal kerja, dan mempersiapkan perusahaan skala menengah untuk peristiwa likuiditas besar.
Lapisan Produk: Platform Manajemen Pengetahuan (Knowledge Management Platform) unggulan dengan AI Percakapan, RAG, aplikasi berbasis suara, dan otomasi konten.`
  },
  {
    id: "KB-003",
    title: "Engagement Workflow & Operating Model",
    tags: ["workflow", "process", "phases", "how we work", "identify", "architect", "execute", "proses", "tahapan", "metode", "cara kerja"],
    content: `[English]
Our 3-Phase Operating Model ensures strategic advisory is seamlessly translated into operational reality:
- Phase 1: Identify / Pre-Engagement: Through deep data auditing and on-the-ground assessment, we locate the structural, operational, and technical gaps ("whitespaces") within the operations.
- Phase 2: Architect / Engagement: We design both the business turnaround strategy and the technical specifications of custom software tools required to achieve it.
- Phase 3: Execute / Following-Partnership: We embed our operators directly into the client's team, deploy the custom software, and run the transition side-by-side until value is fully realized and the team is self-sustaining.

[Bahasa Indonesia]
Model Operasi 3-Fase kami memastikan konsultasi strategis diterjemahkan secara mulus ke dalam realitas operasional:
- Fase 1: Identifikasi / Pra-Kemitraan: Melalui audit data mendalam dan penilaian langsung di lapangan, kami menemukan celah struktural dan teknis ("whitespace") dalam operasional Anda.
- Fase 2: Arsitek / Kemitraan: Kami merancang strategi perbaikan bisnis dan spesifikasi teknis dari perangkat lunak khusus yang diperlukan untuk mencapainya.
- Fase 3: Eksekusi / Pasca-Kemitraan: Kami menempatkan operator kami secara langsung di tim Anda, meluncurkan perangkat lunak kustom, dan menjalankan transisi bersama Anda hingga nilai tercapai sepenuhnya dan mandiri.`
  },
  {
    id: "KB-004",
    title: "Leadership Team & Key People",
    tags: ["team", "people", "leaders", "stevien", "washington", "dick", "listijono", "azhan", "ranggaz", "marissa", "founder", "founder", "partner", "hr", "talent", "tokoh", "pendiri"],
    content: `[English]
Whitespace Solutions is led by a combination of ex-BCG consultants, startup founders, and technical builders:
1. Stevien Washington (Managing Partner): Ex-BCG (2021-2023), Kelly School of Business, Indiana University. Strong strategist and mentor.
2. Dick Listijono (Partner / Co-Founder): Founder of ReCharge Indonesia (shared power bank IoT network). Focuses on operations, product delivery, and automation.
3. Azhan A. (Value Creation / Advisor & Operator): Drives operational execution and strategic advisory.
4. Ranggaz Laksmana (Associate / Investor): Commissioner at PT Trimegah Karya Pratama TBK + active investor. Provides strong local business network.
5. Marissa Timbuleng (HR / Talent Acquisition): Handles recruiting and onboarding processes.
The firm was founded by former professionals from Boston Consulting Group (BCG) and Trimegah Securities.

[Bahasa Indonesia]
Whitespace Solutions dipimpin oleh kombinasi konsultan ex-BCG, pendiri startup, dan pembangun teknologi:
1. Stevien Washington (Managing Partner): Mantan BCG (2021-2023), Kelly School of Business, Indiana University. Strategis dan mentor yang kuat.
2. Dick Listijono (Partner / Co-Founder): Pendiri ReCharge Indonesia (jaringan IoT power bank). Fokus pada operasional, pengiriman produk, dan otomasi.
3. Azhan A. (Value Creation / Advisor & Operator): Menjalankan eksekusi operasional dan penasihat strategis.
4. Ranggaz Laksmana (Associate / Investor): Komisaris PT Trimegah Karya Pratama TBK + investor aktif. Menyediakan jaringan bisnis lokal yang kuat.
5. Marissa Timbuleng (HR / Talent): Menangani proses rekrutmen dan onboarding.
Firma ini didirikan oleh mantan profesional dari Boston Consulting Group (BCG) dan Trimegah Securities.`
  },
  {
    id: "KB-005",
    title: "AI & Technology Focus",
    tags: ["ai", "tech", "technology", "rag", "knowledge management", "platform", "software", "development", "voice", "automation", "perangkat lunak", "kecerdasan buatan"],
    content: `[English]
Our technology focus is centered around custom corporate software that automates administrative and knowledge-intensive workflows.
Key Product: Knowledge Management Platform.
Technical Stack & Features:
- Retrieval-Augmented Generation (RAG) to query unstructured internal PDFs, emails, and drive logs.
- Conversational AI Interfaces to make institutional knowledge queryable by any employee.
- Voice-enabled features for mobile workers and hands-free input.
- High-efficiency agentic workflows that automate standard tasks.
We build bespoke models, fine-tune models on client-specific data, and deploy them on scalable, secure local or cloud infrastructures.

[Bahasa Indonesia]
Fokus teknologi kami berpusat pada perangkat lunak perusahaan khusus yang mengotomatiskan alur kerja administratif dan padat pengetahuan.
Produk Utama: Platform Manajemen Pengetahuan (Knowledge Management Platform).
Fitur & Stack Teknis:
- Retrieval-Augmented Generation (RAG) untuk mencari file PDF internal, email, dan log.
- Interface AI Percakapan (Conversational AI) agar pengetahuan perusahaan dapat ditanyakan oleh karyawan mana pun.
- Fitur berbasis suara untuk pekerja seluler.
- Alur kerja agen (agentic workflow) berefisiensi tinggi yang mengotomatiskan tugas standar.`
  },
  {
    id: "KB-006",
    title: "Culture & Careers",
    tags: ["culture", "careers", "jobs", "hiring", "developer", "analyst", "intern", "hybrid", "salary", "kultur", "karir", "lowongan", "gaji", "wfo", "wfh"],
    content: `[English]
Working at Whitespace Solutions:
- Team size: Small, high-output, flat team (2-10 core members). High autonomy and direct contact with Partners.
- Work Model: Hybrid model requiring 3 days Work From Office (WFO) and 2 days Work From Home (WFH).
- Open Positions (2026): Active expansion. Hiring Full Stack Developers (focused on AI & RAG platform), Business Analysts, Interns, and Project Support.
- Developer Salary: Around IDR 7-8 million gross/month (negotiable depending on experience).
- Core Culture: High ownership, low bureaucracy, focused on real impact and value creation over empty slides.

[Bahasa Indonesia]
Bekerja di Whitespace Solutions:
- Ukuran Tim: Kecil, berkinerja tinggi, flat (2-10 anggota inti). Otonomi tinggi dan akses langsung ke Partners.
- Model Kerja: Hibrida (Hybrid) dengan 3 hari Kerja dari Kantor (WFO) dan 2 hari Kerja dari Rumah (WFH).
- Posisi Terbuka (2026): Ekspansi aktif. Merekrut Full Stack Developer (fokus pada AI & platform RAG), Business Analyst, Magang (Intern), dan Project Support.
- Gaji Developer: Sekitar Rp 7-8 juta kotor/bulan (dapat dinegosiasikan sesuai pengalaman).
- Kultur Utama: Kepemilikan tinggi, birokrasi rendah, fokus pada dampak nyata dan penciptaan nilai.`
  },
  {
    id: "KB-007",
    title: "Office Locations & Logistics",
    tags: ["office", "locations", "address", "contact", "email", "phone", "mangkuluhur", "puri", "map", "kantor", "alamat", "telepon", "hubungi"],
    content: `[English]
Our headquarters are in Jakarta, Indonesia:
- Primary/Client-facing Head Office: Mangkuluhur City Office Tower, Level 29, Jl. Gatot Subroto Kav. 1, Karet Semanggi, Kecamatan Setiabudi, Jakarta Selatan (South Jakarta). Located in the premium Central Business District (CBD).
- Alternative / Registered Address: Puri Lingkar Dalam, Kembangan Selatan, Kecamatan Kembangan, Jakarta Barat (West Jakarta). Near the Puri Indah Financial Tower area.
- General Inquiries: contact@whitespace.id
- Phone: 021-39731400
- HR Contact: Marissa (rekrutmen via email invitation)

[Bahasa Indonesia]
Kantor pusat kami berlokasi di Jakarta, Indonesia:
- Kantor Utama/Klien: Mangkuluhur City Office Tower, Lantai 29, Jl. Gatot Subroto Kav. 1, Karet Semanggi, Kecamatan Setiabudi, Jakarta Selatan. Terletak di kawasan CBD premium.
- Alamat Terdaftar / Alternatif: Puri Lingkar Dalam, Kembangan Selatan, Kecamatan Kembangan, Jakarta Barat. Dekat area Puri Indah Financial Tower.
- Pertanyaan Umum: contact@whitespace.id
- Telepon: 021-39731400
- Kontak HR: Marissa (rekrutmen melalui undangan email)`
  },
  {
    id: "KB-008",
    title: "FAQ & Quick Answers",
    tags: ["faq", "questions", "answers", "difference", "product", "hiring", "recharge", "bcg", "pertanyaan", "jawaban", "beda"],
    content: `[English]
Q: What does Whitespace Solutions do?
A: We are a management consulting & strategic advisory firm and search fund in Jakarta. We help companies find operational "whitespaces" (inefficiencies/opportunities) and build bespoke AI software to solve them.
Q: Who founded the company?
A: Former professionals from Boston Consulting Group (BCG) and Trimegah Securities, led by Managing Partner Stevien Washington (ex-BCG) and Partner Dick Listijono (Co-Founder of ReCharge Indonesia).
Q: What is your flagship software?
A: Our Knowledge Management Platform featuring Conversational AI, RAG, and automation capabilities.
Q: Are you hiring developers?
A: Yes, we are actively hiring Full Stack Developers (7-8M gross/month, hybrid 3 WFO/2 WFH) to build our AI products.

[Bahasa Indonesia]
P: Apa yang dilakukan Whitespace Solutions?
J: Kami adalah firma konsultasi manajemen, penasihat strategis, dan search fund di Jakarta. Kami membantu perusahaan menemukan "whitespace" (inefisiensi/peluang) dan membuat software AI kustom untuk menyelesaikannya.
P: Siapa yang mendirikan perusahaan ini?
J: Mantan profesional dari Boston Consulting Group (BCG) dan Trimegah Securities, dipimpin oleh Stevien Washington (ex-BCG) dan Dick Listijono (Pendiri ReCharge Indonesia).
P: Apa produk software unggulan Anda?
J: Platform Manajemen Pengetahuan (Knowledge Management Platform) dengan fitur AI Percakapan, RAG, dan otomasi.
P: Apakah Anda merekrut developer?
J: Ya, kami aktif merekrut Full Stack Developer (7-8 juta kotor/bulan, hibrida 3 hari kantor / 2 hari rumah) untuk membangun produk AI kami.`
  }
];
