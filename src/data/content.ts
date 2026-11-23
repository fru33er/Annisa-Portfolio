export type Lang = 'id' | 'en'
export type Theme = 'dark' | 'light'

export interface ExperienceItem {
  company: string
  role: string
  period: string
  badge: string
  isFeatured: boolean
  summary: string
  chips: string[]
}

export interface OrgItem {
  role: string
  org: string
  year: string
  desc: string
}

export interface SkillGroup {
  label: string
  accent: boolean
  items: string[]
}

export interface CertificationItem {
  name: string
  issuer: string
  year: string
}

export interface PodiumAward {
  tag: string
  title: string
  org: string
  featured: boolean
}

export interface LedgerAward {
  rank: string
  event: string
  date: string
}

export interface PortfolioContent {
  nav: {
    links: { id: string; label: string }[]
    downloadCv: string
    skipToContent: string
    menuOpenLabel: string
    menuCloseLabel: string
    themeToLight: string
    themeToDark: string
  }
  hero: {
    status: string
    headline: string
    subcopy: string
    primaryCta: string
    secondaryCta: string
    copiedToast: string
    profileKicker: string
    profileRole: string
    profileDegree: string
    profileGpa: string
  }
  impact: {
    cards: { kicker: string; value: string; title: string; desc: string }[]
    approachKicker: string
    approachHeadline: string
    pillars: { icon: 'message' | 'chart' | 'users'; title: string; desc: string }[]
  }
  experience: {
    items: ExperienceItem[]
    orgKicker: string
    orgTitle: string
    orgItems: OrgItem[]
  }
  skills: {
    kicker: string
    title: string
    groups: SkillGroup[]
    certsKicker: string
    certsTitle: string
    eduSchool: string
    eduYears: string
    eduGpa: string
    certifications: CertificationItem[]
  }
  awards: {
    kicker: string
    title: string
    countPill: string
    podiums: PodiumAward[]
    ledgerLeft: LedgerAward[]
    ledgerRight: LedgerAward[]
  }
  contact: {
    kicker: string
    headline: string
    subtext: string
    downloadCta: string
    footerMeta: string
    pauseMotion: string
    playMotion: string
  }
  sectionNames: Record<string, string>
  sectionSubtitles: Record<string, string>
}

export const PROFILE_META = {
  name: 'Annisa Noviana',
  email: 'annisanv16@gmail.com',
  linkedinLabel: 'linkedin.com/in/annisa-nv',
  linkedinUrl: 'https://www.linkedin.com/in/annisa-nv',
  cvPath: '/CV-Annisa-Noviana.pdf',
  location: 'Bogor, Indonesia',
}

export const CONTENT: Record<Lang, PortfolioContent> = {
  id: {
    nav: {
      links: [
        { id: 'hero', label: 'Tentang' },
        { id: 'experience', label: 'Pengalaman' },
        { id: 'skills', label: 'Skill' },
        { id: 'awards', label: 'Prestasi' },
        { id: 'contact', label: 'Kontak' },
      ],
      downloadCv: 'Résumé↗',
      skipToContent: 'Lewati ke konten utama',
      menuOpenLabel: 'Buka menu navigasi',
      menuCloseLabel: 'Tutup menu navigasi',
      themeToLight: 'Ubah ke mode terang',
      themeToDark: 'Ubah ke mode gelap',
    },
    hero: {
      status: 'TERBUKA UNTUK PELUANG BARU  /  BOGOR, INDONESIA',
      headline: 'Ngubah obrolan jadi konversi, dan operasional jadi rapi.',
      subcopy:
        'Halo, aku Annisa Noviana. Lulusan Fisika IPB yang terbiasa megang client relations, CRM, dan operasional bisnis berbasis data, mulai dari konversi leads harian sampai bikin ratusan klien betah.',
      primaryCta: 'Résumé↗',
      secondaryCta: 'Ngobrol di LinkedIn',
      copiedToast: 'Email disalin ke clipboard',
      profileKicker: 'PROFILE SNAPSHOT',
      profileRole: 'Client Relations, CRM & Business Operations',
      profileDegree: 'B.Sc. Physics · IPB University',
      profileGpa: 'GPA 3.66/4.00',
    },
    impact: {
      cards: [
        {
          kicker: 'MENTORSHIP',
          value: '380+',
          title: 'Mahasiswa Dimentori',
          desc: '8 kelas praktikum Fisika IPB & pelatihan se-Jawa Barat (+35% kesiapan praktik).',
        },
        {
          kicker: 'COMPETITIONS',
          value: '9x',
          title: 'Prestasi Bisnis Nasional',
          desc: 'Juara & finalis kompetisi business plan dan inovasi startup (2022–2024).',
        },
      ],
      approachKicker: 'CARA KERJAKU',
      approachHeadline: 'Empati di depan, data rapi di belakang.',
      pillars: [
        {
          icon: 'message',
          title: 'Consultative CRM',
          desc: 'Kelola leads, upselling, dan retensi klien.',
        },
        {
          icon: 'chart',
          title: 'Data & Reporting',
          desc: 'Audit Excel & laporan bisnis 100% akurat.',
        },
        {
          icon: 'users',
          title: 'Operations Care',
          desc: 'Event, mediasi keluhan, dan sinergi tim.',
        },
      ],
    },
    experience: {
      items: [
        {
          company: 'PT Generasi Edukasi Prima',
          role: 'Academic Center Coordinator',
          period: 'Jul 2025 – Jul 2026',
          badge: 'TERBARU',
          isFeatured: true,
          summary:
            'Garda depan konsultasi klien & admin WhatsApp untuk konversi leads harian jadi pendaftaran aktif. Kelola strategi retensi 200+ peserta, dorong upselling & cross-selling program, serta jaga integritas database & laporan mingguan ke manajemen pusat.',
          chips: [
            '98% Resolusi Cepat',
            '200+ Peserta Aktif',
            '100% Integritas Data',
            'Upselling & CRM',
          ],
        },
        {
          company: 'Department of Physics, IPB University',
          role: 'Laboratory Assistant & Training Mentor',
          period: 'Agu 2023 – Jun 2025',
          badge: 'MENTORSHIP',
          isFeatured: false,
          summary:
            'Membimbing dan mengevaluasi performa 380+ mahasiswa lintas 8 kelompok praktikum. Memimpin logistik pelatihan profesional se-Jawa Barat untuk 43 peserta hingga kesiapan praktik naik 35%, lengkap dengan analitik penilaian Excel zero margin of error.',
          chips: [
            '380+ Mahasiswa',
            '+35% Readiness',
            '43 Peserta Jabar',
            'Excel Analytics',
          ],
        },
      ],
      orgKicker: 'KEPEMIMPINAN & ORGANISASI',
      orgTitle: 'Rekam jejak eksekusi lintas tim.',
      orgItems: [
        {
          role: 'Head of Fundraising',
          org: 'Physics Awarding · IPB',
          year: '2023',
          desc: 'Tembus 100% target pendanaan event lewat strategi sponsor korporat dan manajemen tim relawan.',
        },
        {
          role: 'Treasurer, Fundraising',
          org: 'Physics Expo · IPB',
          year: '2023',
          desc: 'Kelola anggaran, arus kas, pembayaran vendor, hingga laporan audit keuangan lintas divisi.',
        },
        {
          role: 'Secretary, Production & Ops',
          org: 'Century · IPB',
          year: '2022–2023',
          desc: 'Tracking penjualan & inventori 100% akurat, audit biaya produksi, dan otomasi alur dokumentasi.',
        },
        {
          role: 'Physics Guard & Facilitator',
          org: 'HIMAFI & UniXpo · IPB',
          year: '2022–2023',
          desc: 'Mentoring adaptasi mahasiswa baru serta bawakan presentasi & Q&A di depan ratusan peserta.',
        },
      ],
    },
    skills: {
      kicker: 'KEMAMPUAN & TOOLKIT',
      title: 'Kombinasi strategi bisnis dan ketelitian data.',
      groups: [
        {
          label: 'CORE COMPETENCIES',
          accent: true,
          items: [
            'B2C Consultative Selling',
            'WhatsApp Sales Ops',
            'CRM & Lead Conversion',
            'Client Retention',
          ],
        },
        {
          label: 'HARD SKILLS & ANALYTICS',
          accent: false,
          items: [
            'Excel (XLOOKUP, Pivot, IF)',
            'Data Validation',
            'Quantitative Analytics',
            'Daily–Monthly Reporting',
          ],
        },
        {
          label: 'SOFT SKILLS',
          accent: false,
          items: [
            'Service-Oriented Mindset',
            'Grievance Handling',
            'Interpersonal Comm',
            'Results-Driven & Adaptable',
          ],
        },
      ],
      certsKicker: 'PENDIDIKAN & SERTIFIKASI',
      certsTitle: 'Terus upgrade di CRM, analitik & strategi.',
      eduSchool: 'IPB University, S.Si. Fisika (B.Sc. in Physics)',
      eduYears: 'Agustus 2021 – Juli 2025 · Bogor, Indonesia',
      eduGpa: 'IPK 3.66 / 4.00',
      certifications: [
        { name: 'Customer Relationship Management (CRM)', issuer: 'HP', year: '2026' },
        { name: 'Fundamentals of Marketing Analytics', issuer: 'Semrush Academy', year: '2026' },
        { name: 'SEO Essentials & Digital Content Strategy', issuer: 'Semrush Academy', year: '2026' },
        { name: 'Agile Project Management & Data Science', issuer: 'HP', year: '2026' },
        { name: 'Effective Leadership & Presentation Dynamics', issuer: 'HP', year: '2026' },
      ],
    },
    awards: {
      kicker: 'PRESTASI & KOMPETISI BISNIS',
      title: 'Teruji di 9 panggung kompetisi bisnis & startup nasional.',
      countPill: '9 PENGHARGAAN · 2022–2024',
      podiums: [
        {
          tag: 'BEST TALENT · NOV 2024',
          title: 'The Most Talented in Business & Entrepreneur',
          org: 'Physics Awarding, IPB University',
          featured: true,
        },
        {
          tag: '2ND PLACE · OKT 2023',
          title: 'National Business Plan Competition LED 4.0',
          org: 'IPB University',
          featured: false,
        },
        {
          tag: '3RD PLACE · JUL 2022',
          title: 'National Chemistry Entrepreneur Business Plan',
          org: 'Brawijaya University',
          featured: false,
        },
      ],
      ledgerLeft: [
        {
          rank: 'Top 5 Finalist',
          event: 'National StartUp Innovation PENDIKAR · IPB Vocational School',
          date: 'Apr 2023',
        },
        {
          rank: 'Top 10 Finalist',
          event: 'National Business Plan Competition GeFest · IPB Vocational School',
          date: 'Des 2022',
        },
        {
          rank: 'Top 15 Finalist',
          event: 'National StartUp Innovation PENDIKAR · IPB Vocational School',
          date: 'Jun 2024',
        },
      ],
      ledgerRight: [
        {
          rank: 'Finalist',
          event: 'Takis Business Plan Competition · Universitas Pendidikan Indonesia',
          date: 'Okt 2022',
        },
        {
          rank: 'Semifinalist',
          event: 'Akselerasi Business Challenge · Hasnur Centre Business School',
          date: 'Jul 2023',
        },
        {
          rank: 'Semifinalist',
          event: 'Votaxco Business Plan Competition · Brawijaya University',
          date: 'Agu 2022',
        },
      ],
    },
    contact: {
      kicker: 'AYO KOLABORASI',
      headline: 'Butuh partner yang rapi di data dan luwes ke klien? Yuk ngobrol.',
      subtext:
        'Berbasis di Bogor, Indonesia. Terbuka untuk peran Client Relations, CRM, Sales Operations, maupun Business Strategy secara onsite, hybrid, atau remote.',
      downloadCta: 'Résumé↗',
      footerMeta: 'Client Relations · CRM · Business Operations',
      pauseMotion: 'Jeda animasi latar',
      playMotion: 'Putar animasi latar',
    },
    sectionNames: {
      hero: 'Tentang',
      impact: 'Dampak',
      experience: 'Pengalaman',
      skills: 'Skill',
      awards: 'Prestasi',
      contact: 'Kontak',
    },
    sectionSubtitles: {
      hero: 'ANNISA NOVIANA',
      impact: 'METRIK & CARA KERJA',
      experience: '2022 – 2026',
      skills: 'TOOLKIT & SERTIFIKASI',
      awards: '9 PRESTASI NASIONAL',
      contact: 'BOGOR, INDONESIA',
    },
  },
  en: {
    nav: {
      links: [
        { id: 'hero', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'awards', label: 'Awards' },
        { id: 'contact', label: 'Contact' },
      ],
      downloadCv: 'Résumé↗',
      skipToContent: 'Skip to main content',
      menuOpenLabel: 'Open navigation menu',
      menuCloseLabel: 'Close navigation menu',
      themeToLight: 'Switch to light mode',
      themeToDark: 'Switch to dark mode',
    },
    hero: {
      status: 'OPEN TO NEW ROLES  /  BOGOR, INDONESIA',
      headline: 'Turning conversations into conversions, and ops into flow.',
      subcopy:
        'Hi, I am Annisa Noviana. An IPB Physics graduate wired for client relations, CRM, and data-backed operations, turning daily leads into loyal, long-term growth.',
      primaryCta: 'Résumé↗',
      secondaryCta: 'Connect on LinkedIn',
      copiedToast: 'Email copied to clipboard',
      profileKicker: 'PROFILE SNAPSHOT',
      profileRole: 'Client Relations, CRM & Business Operations',
      profileDegree: 'B.Sc. Physics · IPB University',
      profileGpa: 'GPA 3.66/4.00',
    },
    impact: {
      cards: [
        {
          kicker: 'MENTORSHIP',
          value: '380+',
          title: 'Students Mentored',
          desc: '8 Physics lab cohorts at IPB & West Java training (+35% practical readiness).',
        },
        {
          kicker: 'COMPETITIONS',
          value: '9x',
          title: 'National Business Awards',
          desc: 'Winner & finalist across national business plan and startup competitions (2022–2024).',
        },
      ],
      approachKicker: 'HOW I WORK',
      approachHeadline: 'Human-first upfront, data-tight underneath.',
      pillars: [
        {
          icon: 'message',
          title: 'Consultative CRM',
          desc: 'Lead conversion, upselling, and retention.',
        },
        {
          icon: 'chart',
          title: 'Data & Reporting',
          desc: 'Excel auditing & 100% clean reporting.',
        },
        {
          icon: 'users',
          title: 'Operations Care',
          desc: 'Events, conflict resolution & team sync.',
        },
      ],
    },
    experience: {
      items: [
        {
          company: 'PT Generasi Edukasi Prima',
          role: 'Academic Center Coordinator',
          period: 'Jul 2025 – Jul 2026',
          badge: 'LATEST',
          isFeatured: true,
          summary:
            'Primary client consultant and WhatsApp lead admin converting daily inquiries into active enrollments. Led retention strategy for 200+ active participants, drove program upselling and cross-selling, and kept central sales databases 100% accountable.',
          chips: [
            '98% Resolution Rate',
            '200+ Active Clients',
            '100% Data Integrity',
            'Upselling & CRM',
          ],
        },
        {
          company: 'Department of Physics, IPB University',
          role: 'Laboratory Assistant & Training Mentor',
          period: 'Aug 2023 – Jun 2025',
          badge: 'MENTORSHIP',
          isFeatured: false,
          summary:
            'Mentored and evaluated 380+ students across 8 lab groups with tailored coaching. Led logistics for West Java professional training (43 participants, boosting readiness by 35%) and built zero-error Excel progress analytics.',
          chips: [
            '380+ Students',
            '+35% Readiness',
            '43 West Java Trainees',
            'Excel Analytics',
          ],
        },
      ],
      orgKicker: 'LEADERSHIP & ORGANIZATIONS',
      orgTitle: 'Proven execution across student orgs.',
      orgItems: [
        {
          role: 'Head of Fundraising',
          org: 'Physics Awarding · IPB',
          year: '2023',
          desc: 'Secured 100% of event financial goals through corporate sponsorships and volunteer pipeline leadership.',
        },
        {
          role: 'Treasurer, Fundraising',
          org: 'Physics Expo · IPB',
          year: '2023',
          desc: 'Managed budgets, cash flow, vendor payouts, and cross-stakeholder financial audit reports.',
        },
        {
          role: 'Secretary, Production & Ops',
          org: 'Century · IPB',
          year: '2022–2023',
          desc: 'Tracked product sales and inventory with 100% accuracy, audited production costs, and automated admin workflows.',
        },
        {
          role: 'Physics Guard & Facilitator',
          org: 'HIMAFI & UniXpo · IPB',
          year: '2022–2023',
          desc: 'Mentored incoming students on campus transition and led high-pressure presentations & Q&A for hundreds.',
        },
      ],
    },
    skills: {
      kicker: 'SKILLS & TOOLKIT',
      title: 'Commercial instinct backed by clean spreadsheets.',
      groups: [
        {
          label: 'CORE COMPETENCIES',
          accent: true,
          items: [
            'B2C Consultative Selling',
            'WhatsApp Sales Ops',
            'CRM & Lead Conversion',
            'Client Retention',
          ],
        },
        {
          label: 'HARD SKILLS & ANALYTICS',
          accent: false,
          items: [
            'Excel (XLOOKUP, Pivot, IF)',
            'Data Validation',
            'Quantitative Analytics',
            'Daily–Monthly Reporting',
          ],
        },
        {
          label: 'SOFT SKILLS',
          accent: false,
          items: [
            'Service-Oriented Mindset',
            'Grievance Handling',
            'Interpersonal Comm',
            'Results-Driven & Adaptable',
          ],
        },
      ],
      certsKicker: 'EDUCATION & CERTIFICATIONS',
      certsTitle: 'Constantly leveling up in CRM, analytics & strategy.',
      eduSchool: 'IPB University, B.Sc. in Physics',
      eduYears: 'August 2021 – July 2025 · Bogor, Indonesia',
      eduGpa: 'GPA 3.66 / 4.00',
      certifications: [
        { name: 'Customer Relationship Management (CRM)', issuer: 'HP', year: '2026' },
        { name: 'Fundamentals of Marketing Analytics', issuer: 'Semrush Academy', year: '2026' },
        { name: 'SEO Essentials & Digital Content Strategy', issuer: 'Semrush Academy', year: '2026' },
        { name: 'Agile Project Management & Data Science', issuer: 'HP', year: '2026' },
        { name: 'Effective Leadership & Presentation Dynamics', issuer: 'HP', year: '2026' },
      ],
    },
    awards: {
      kicker: 'HONORS & BUSINESS COMPETITIONS',
      title: '9 national business plan and startup competition finishes.',
      countPill: '9 NATIONAL AWARDS · 2022–2024',
      podiums: [
        {
          tag: 'BEST TALENT · NOV 2024',
          title: 'The Most Talented in Business & Entrepreneur',
          org: 'Physics Awarding, IPB University',
          featured: true,
        },
        {
          tag: '2ND PLACE · OCT 2023',
          title: 'National Business Plan Competition LED 4.0',
          org: 'IPB University',
          featured: false,
        },
        {
          tag: '3RD PLACE · JUL 2022',
          title: 'National Chemistry Entrepreneur Business Plan',
          org: 'Brawijaya University',
          featured: false,
        },
      ],
      ledgerLeft: [
        {
          rank: 'Top 5 Finalist',
          event: 'National StartUp Innovation PENDIKAR · IPB Vocational School',
          date: 'Apr 2023',
        },
        {
          rank: 'Top 10 Finalist',
          event: 'National Business Plan Competition GeFest · IPB Vocational School',
          date: 'Dec 2022',
        },
        {
          rank: 'Top 15 Finalist',
          event: 'National StartUp Innovation PENDIKAR · IPB Vocational School',
          date: 'Jun 2024',
        },
      ],
      ledgerRight: [
        {
          rank: 'Finalist',
          event: 'Takis Business Plan Competition · Universitas Pendidikan Indonesia',
          date: 'Oct 2022',
        },
        {
          rank: 'Semifinalist',
          event: 'Akselerasi Business Challenge · Hasnur Centre Business School',
          date: 'Jul 2023',
        },
        {
          rank: 'Semifinalist',
          event: 'Votaxco Business Plan Competition · Brawijaya University',
          date: 'Aug 2022',
        },
      ],
    },
    contact: {
      kicker: "LET'S COLLABORATE",
      headline: "Need someone sharp with data and warm with clients? Let's talk.",
      subtext:
        'Based in Bogor, Indonesia. Open for Client Relations, CRM, Sales Operations, and Business Strategy roles onsite, hybrid, or remote.',
      downloadCta: 'Résumé↗',
      footerMeta: 'Client Relations · CRM · Business Operations',
      pauseMotion: 'Pause background',
      playMotion: 'Play background',
    },
    sectionNames: {
      hero: 'About',
      impact: 'Impact',
      experience: 'Experience',
      skills: 'Skills',
      awards: 'Awards',
      contact: 'Contact',
    },
    sectionSubtitles: {
      hero: 'ANNISA NOVIANA',
      impact: 'METRICS & APPROACH',
      experience: '2022 – 2026',
      skills: 'TOOLKIT & CERTIFICATIONS',
      awards: '9 NATIONAL HONORS',
      contact: 'BOGOR, INDONESIA',
    },
  },
}
