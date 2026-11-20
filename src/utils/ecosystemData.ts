export interface TelemetryNode {
  id: string;
  code: string;
  shortLabel: string;
  label: string;
  reading: string;
  detail: string;
  topPercent: number;
  leftPercent: number;
  align: 'left' | 'right';
}

export const HERO_TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'node-ai-foundry',
    code: 'WING-01',
    shortLabel: 'AI Foundry',
    label: 'Autonomous AI Foundry',
    reading: 'Orchestrating Swarm · 24/7 Execution',
    detail: 'Agen-agen AI otonom untuk data synthesis, automated workflow, dan machine intelligence.',
    topPercent: 26,
    leftPercent: 82,
    align: 'left',
  },
  {
    id: 'node-web-studio',
    code: 'WING-02',
    shortLabel: 'Web & Mobile',
    label: 'Web & Mobile Studio',
    reading: 'Production Grade · React 19 & TypeScript',
    detail: 'Pengembangan antarmuka berstandar tinggi, portal manajemen, dan aplikasi ponsel responsif.',
    topPercent: 34,
    leftPercent: 54,
    align: 'right',
  },
  {
    id: 'node-field-iot',
    code: 'WING-03',
    shortLabel: 'Applied IoT',
    label: 'Applied Field IoT Workshop',
    reading: 'Testbed Aktif · Lumajang Living Lab',
    detail: 'Rig simulasi lapangan, perakitan sensor mikrokontroler, dan kontrol aktuator fisik.',
    topPercent: 68,
    leftPercent: 84,
    align: 'left',
  },
  {
    id: 'node-command-ops',
    code: 'WING-04',
    shortLabel: 'Command & Ops',
    label: 'Command & Operations Hub',
    reading: 'Status: Optimal · All Systems Normal',
    detail: 'Pusat orkestrasi tugas, audit sistem terpusat, dan integrasi operasional digital.',
    topPercent: 62,
    leftPercent: 44,
    align: 'right',
  },
];

export interface CircularStage {
  id: 'unggas-ternak' | 'bio-konversi' | 'hidroponik' | 'filtrasi';
  step: string;
  label: string;
  shortLabel: string;
  input: string;
  process: string;
  output: string;
  sensorControl: string;
}

export interface ArchitectureLayer {
  id: 'edge' | 'backend' | 'dashboard';
  step: string;
  title: string;
  subtitle: string;
  features: string[];
  infoLine: string;
  summary: string;
  specLines: { label: string; value: string }[];
}

export interface SandboxMetrics {
  manualReductionPct: number;
  wasteReductionPct: number;
  telemetryLatencySec: number;
  waterSavedLitersPerDay: number;
  biomassConvertedKgPerMonth: number;
}

export interface ConsultationFormValues {
  name: string;
  organization: string;
  email: string;
  phone: string;
  focus: 'software-ai' | 'precision-iot' | 'integrated';
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ConsultationFormValues, string>>;
}

export const STUDIO_CONTACT = {
  brand: 'RUMIVERSE',
  email: 'abudevis5@gmail.com',
  phone: '+62 851-2279-7969',
  phoneHref: 'tel:+6285122797969',
  location: 'Studio & Living Lab: Lumajang, Jawa Timur.',
  appointmentNote: 'Tersedia sesi daring & kunjungan lapangan.',
  architectName: 'Abu Devis J.R.',
  architectRole: 'Founder & Systems Architect',
  monogram: 'ADR // RUMIVERSE ARCHITECT',
} as const;

export const CIRCULAR_STAGES: CircularStage[] = [
  {
    id: 'unggas-ternak',
    step: '01',
    label: 'Kandang Ternak',
    shortLabel: 'Kandang',
    input: 'Pakan dan air minum ternak',
    process: 'Sensor membantu memantau suhu, kelembapan, dan kualitas udara di kandang.',
    output: 'Sisa organik yang bisa diolah.',
    sensorControl: 'Suhu · kelembapan · kualitas udara',
  },
  {
    id: 'bio-konversi',
    step: '02',
    label: 'Pengolahan Sisa Ternak',
    shortLabel: 'Maggot & Ikan',
    input: 'Sisa organik dari kandang',
    process:
      'Maggot dan ikan membantu mengolah sisa ternak menjadi bahan yang bisa dimanfaatkan kembali.',
    output: 'Bahan pakan dan air bernutrisi untuk tanaman.',
    sensorControl: 'Kadar oksigen air · aliran pompa',
  },
  {
    id: 'hidroponik',
    step: '03',
    label: 'Tanaman Pakan',
    shortLabel: 'Tanaman Pakan',
    input: 'Air bernutrisi dari kolam ikan',
    process: 'Tanaman menyerap nutrisi dari air dan membantu membersihkannya.',
    output: 'Tanaman pakan dan air yang lebih bersih.',
    sensorControl: 'Kondisi air · aliran air',
  },
  {
    id: 'filtrasi',
    step: '04',
    label: 'Penyaringan Air & Kompos',
    shortLabel: 'Air & Kompos',
    input: 'Air sisa tanaman dan sisa padat dari pengolahan',
    process: 'Air disaring sebelum digunakan kembali. Sisa padatnya dapat diolah menjadi kompos.',
    output: 'Air untuk digunakan kembali dan kompos.',
    sensorControl: 'Kejernihan air · pemberitahuan gangguan',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'edge',
    step: 'Bagian 01',
    title: 'Perangkat di Lapangan',
    subtitle: 'Sensor membaca kondisi kandang dan air',
    features: [
      'Sensor suhu dan kualitas udara',
      'Jaringan sensor jarak jauh',
      'Terhubung dengan pompa dan katup',
    ],
    infoLine: 'Data dicatat tiap 5 detik · tetap tersimpan saat koneksi putus',
    summary:
      'Perangkat di kandang membaca suhu, kualitas udara, kondisi air, dan alirannya. Jika koneksi internet terputus, data disimpan sementara dan dikirim saat koneksi kembali.',
    specLines: [
      { label: 'Jaringan', value: 'Kabel industri dan jaringan sensor' },
      { label: 'Pelindung alat', value: 'Tahan debu dan semburan air (IP65)' },
      { label: 'Kontrol lokal', value: 'Pompa dan katup pakan' },
    ],
  },
  {
    id: 'backend',
    step: 'Bagian 02',
    title: 'Pengolah Data & Otomasi',
    subtitle: 'Mengatur data, laporan, dan peringatan',
    features: [
      'Data sensor tersusun menurut waktu',
      'AI membantu mendeteksi perubahan',
      'Laporan dan jadwal bisa diotomatisasi',
    ],
    infoLine: 'Data dilindungi saat dikirim dan disimpan',
    summary:
      'Bagian ini mengolah data dari sensor, membantu menemukan perubahan kondisi, dan menyiapkan laporan operasional secara otomatis.',
    specLines: [
      { label: 'Riwayat data', value: 'Data sensor tersimpan dan bisa ditelusuri' },
      { label: 'Otomasi', value: 'Laporan dan jadwal pakan' },
      { label: 'Keamanan', value: 'Akses dibatasi sesuai pengguna' },
    ],
  },
  {
    id: 'dashboard',
    step: 'Bagian 03',
    title: 'Aplikasi Pemantauan',
    subtitle: 'Lihat kondisi sistem dan terima pemberitahuan',
    features: [
      'Dasbor untuk web dan ponsel',
      'Pemberitahuan saat ada gangguan',
      'Akses sesuai tugas pengguna',
    ],
    infoLine: 'Pemberitahuan dikirim ke ponsel',
    summary:
      'Dasbor web dan aplikasi ponsel menampilkan kondisi fasilitas. Pengguna dapat menjalankan kontrol manual sesuai aksesnya.',
    specLines: [
      { label: 'Tampilan', value: 'Dasbor web dan pemberitahuan ponsel' },
      { label: 'Akses', value: 'Akses sesuai peran pengguna' },
      { label: 'Laporan', value: 'Ringkasan kerja otomatis' },
    ],
  },
];

export interface IndustryVertical {
  id: 'custom-web-mobile' | 'agentic-ai-workforce' | 'field-iot-cps';
  index: string;
  title: string;
  sectorTag: string;
  problem: string;
  solution: string;
  stack: string[];
  outcome: string;
  recommendedFocus: ConsultationFormValues['focus'];
}

export interface RoadmapPhase {
  id: string;
  step: string;
  title: string;
  duration: string;
  summary: string;
  deliverable: string;
}

export interface ReliabilitySpec {
  code: string;
  title: string;
  detail: string;
}

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    id: 'custom-web-mobile',
    index: '01',
    title: 'Aplikasi Web & Mobile Kustom',
    sectorTag: 'Layanan Rekayasa Web & APK Responsif',
    problem:
      'Pencatatan data operasional masih manual di banyak spreadsheet terpisah, web lama lambat, dan belum memiliki aplikasi mobile khusus untuk tim toko atau lapangan.',
    solution:
      'Pembuatan aplikasi web modern, portal manajemen terpusat, dan APK mobile (Android/iOS) yang cepat, aman, responsif, dan mudah digunakan oleh seluruh tim bisnis Anda.',
    stack: ['React & TypeScript', 'REST API & WebSocket', 'Tailwind & PWA/Mobile Ready'],
    outcome: 'Sistem operasional terpusat rapi, nol salah input manual, dan dapat diakses dari mana saja.',
    recommendedFocus: 'software-ai',
  },
  {
    id: 'agentic-ai-workforce',
    index: '02',
    title: 'Agen AI Otonom & Otomasi Kerja',
    sectorTag: 'Layanan Otomasi Tugas Rutin & Rekap Cerdas',
    problem:
      'Karyawan kehabisan waktu berjam-jam hanya untuk entri berkas berulang, menyalin faktur/invoice, rekap transaksi harian, dan verifikasi dokumen bertumpuk.',
    solution:
      'Penerapan agen AI cerdas yang bekerja mandiri 24/7 untuk membaca dokumen PDF/gambar, validasi angka, dan menyajikan laporan ringkas otomatis ke dasbor atau WhatsApp.',
    stack: ['LLM Workflow (Gemini / Claude)', 'Document OCR & Auto-Parsing', 'Automated Webhooks & Bot'],
    outcome: 'Memangkas hingga 80% beban administrasi rutin dengan akurasi validasi data 99.4%.',
    recommendedFocus: 'software-ai',
  },
  {
    id: 'field-iot-cps',
    index: '03',
    title: 'Instrumen IoT & Sistem Lapangan',
    sectorTag: 'Layanan Sensor Fisik & Otomasi Aktuator',
    problem:
      'Pemantauan kondisi fisik (suhu, kelembapan, air, mesin) masih dicek manual dengan risiko telat penanganan, kerusakan aset, serta pemborosan air dan listrik.',
    solution:
      'Perakitan panel sensor terkalibrasi dan otomasi katup/pompa elektrik yang terhubung langsung ke aplikasi ponsel Anda dengan sistem peringatan bahaya otomatis.',
    stack: ['RS-485 / Modbus Probes', 'Closed-Loop Relay Control', 'Real-Time Mobile Telemetry'],
    outcome: 'Deteksi anomali di bawah 15 detik dan kontrol peralatan fisik berjalan otomatis 24/7.',
    recommendedFocus: 'precision-iot',
  },
];

export const ENGAGEMENT_ROADMAP: RoadmapPhase[] = [
  {
    id: 'audit',
    step: '01',
    title: 'Audit & Discovery',
    duration: 'Minggu 1–2',
    summary:
      'Pemetaan alur kerja bisnis, kebutuhan fitur, serta titik hambatan data atau perangkat secara langsung bersama tim Anda.',
    deliverable: 'Dokumen Analisis Masalah & Ruang Lingkup Teknis',
  },
  {
    id: 'blueprint',
    step: '02',
    title: 'Blueprint & Prototyping',
    duration: 'Minggu 3–4',
    summary:
      'Perancangan skema arsitektur perangkat lunak modular, alur agen AI, topologi perangkat (jika IoT), dan purwarupa antarmuka pengguna.',
    deliverable: 'Cetak Biru Sistem & Purwarupa Tervalidasi',
  },
  {
    id: 'deployment',
    step: '03',
    title: 'Deployment & Integrasi Sistem',
    duration: 'Minggu 5–8',
    summary:
      'Pengembangan modul frontend/backend, integrasi pipeline AI/Cloud, serta instalasi panel sensor fisik (khusus kebutuhan lapangan).',
    deliverable: 'Sistem Produksi Aktif & Siap Digunakan',
  },
  {
    id: 'telemetry',
    step: '04',
    title: 'Real-Time Telemetry & Maintenance',
    duration: 'Berkelanjutan',
    summary:
      'Pemantauan kesehatan sistem 24/7, pembaruan model otomasi, serta inspeksi berkala untuk memastikan reliabilitas jangka panjang.',
    deliverable: 'SLA Pemeliharaan & Dukungan Teknis Aktif',
  },
];

export const RELIABILITY_SPECS: ReliabilitySpec[] = [
  {
    code: 'SEC-01',
    title: 'End-to-End Encrypted Telemetry',
    detail: 'Transport TLS 1.3 & enkripsi payload AES-256 dari simpul sensor hingga basis data.',
  },
  {
    code: 'ARC-02',
    title: 'Modular API Architecture',
    detail: 'Layanan terisolasi dengan kontrak antarmuka bersih untuk integrasi ERP maupun pihak ketiga.',
  },
  {
    code: 'EDG-03',
    title: 'Edge-Fallback Offline Sync',
    detail: 'Penyangga memori lokal pada unit lapangan memastikan nol kehilangan data saat koneksi terputus.',
  },
  {
    code: 'SLA-04',
    title: '99.9% Uptime Design',
    detail: 'Arsitektur redundansi aktif dengan pemulihan otomatis dan pengawasan kesehatan sistem kontinu.',
  },
];

export function calculateSandboxMetrics(
  herdScale: number,
  automationLevel: number
): SandboxMetrics {
  const clampedScale = Math.max(10, Math.min(250, Math.round(herdScale)));
  const clampedAutomation = Math.max(20, Math.min(100, Math.round(automationLevel)));

  // Anchored so default (scale=100, automation=80) produces exact 80% & 95% benchmarks
  const manualReductionPct = Math.min(
    94,
    Math.max(45, Math.round(40 + clampedAutomation * 0.5))
  );
  const wasteReductionPct = Math.min(
    98,
    Math.max(84, Math.round(88 + (clampedAutomation / 100) * 8 + (clampedScale / 250) * 1.5))
  );
  const telemetryLatencySec = Math.max(
    8,
    Math.min(29, Math.round(28 - (clampedAutomation / 100) * 14))
  );
  const waterSavedLitersPerDay = Math.round(
    clampedScale * 145 * (0.75 + (clampedAutomation / 100) * 0.25)
  );
  const biomassConvertedKgPerMonth = Math.round(
    clampedScale * 58 * (0.8 + (clampedAutomation / 100) * 0.2)
  );

  return {
    manualReductionPct,
    wasteReductionPct,
    telemetryLatencySec,
    waterSavedLitersPerDay,
    biomassConvertedKgPerMonth,
  };
}

export interface SectorSimulatorProfile {
  scaleLabel: string;
  scaleUnit: string;
  minScaleText: string;
  defaultScaleText: string;
  maxScaleText: string;
  metricCard1Title: string;
  getMetricCard1Value: (metrics: SandboxMetrics, scale: number, automation: number) => string;
  metricCard1Detail: string;
  metricCard2Title: string;
  getMetricCard2Value: (metrics: SandboxMetrics, scale: number, automation: number) => string;
  getMetricCard2Detail: (metrics: SandboxMetrics, scale: number, automation: number) => string;
  metricCard3Title: string;
  getMetricCard3Value: (metrics: SandboxMetrics, scale: number, automation: number) => string;
  metricCard3Detail: string;
}

export const SECTOR_SIMULATOR_PROFILES: Record<IndustryVertical['id'], SectorSimulatorProfile> = {
  'custom-web-mobile': {
    scaleLabel: 'Skala Pengguna / Modul Sistem',
    scaleUnit: 'pengguna / modul',
    minScaleText: '10 pengguna (UMKM / Toko)',
    defaultScaleText: '100 pengguna (Bisnis Bertumbuh)',
    maxScaleText: '250 pengguna (Enterprise / Multi-Cabang)',
    metricCard1Title: '01 · PENGURANGAN KERJA MANUAL',
    getMetricCard1Value: (metrics) => `${metrics.manualReductionPct}%`,
    metricCard1Detail:
      'Pencatatan inventaris, transaksi operasional, dan alur data beralih otomatis ke sistem web & mobile terpadu.',
    metricCard2Title: '02 · EFISIENSI WAKTU OPERASIONAL',
    getMetricCard2Value: () => '10x Lebih Cepat',
    getMetricCard2Detail: (_metrics, scale) =>
      `±${(scale * 15).toLocaleString('id-ID')} jam kerja/bln terhemat dengan antarmuka web responsif & APK mobile bebas kendala.`,
    metricCard3Title: '03 · RELIABILITAS & UPTIME SISTEM',
    getMetricCard3Value: () => '99.9% Uptime',
    metricCard3Detail:
      'Arsitektur modular siap integrasi ke payment gateway, kasir POS, maupun database cloud dengan standar keamanan TLS & AES-256.',
  },
  'agentic-ai-workforce': {
    scaleLabel: 'Volume Berkas & Dokumen Rutin',
    scaleUnit: 'dokumen / hari',
    minScaleText: '10 berkas (Tim Kecil)',
    defaultScaleText: '100 berkas (Operasional Aktif)',
    maxScaleText: '250 berkas (Volume Tinggi)',
    metricCard1Title: '01 · OTOMASI TUGAS RUTIN BERULANG',
    getMetricCard1Value: (metrics) => `${metrics.manualReductionPct}%`,
    metricCard1Detail:
      'Validasi berkas faktur, rekap transaksi harian, dan penyusunan laporan dikerjakan mandiri oleh pipeline agen AI.',
    metricCard2Title: '02 · JAM KERJA BISNIS TERHEMAT',
    getMetricCard2Value: (_metrics, scale) => `±${(scale * 18).toLocaleString('id-ID')} Jam`,
    getMetricCard2Detail: (_metrics, scale) =>
      `±${(scale * 18).toLocaleString('id-ID')} jam kerja/bln terhemat & ${(scale * 45).toLocaleString('id-ID')} berkas terverifikasi otomatis tanpa human-error.`,
    metricCard3Title: '03 · KECEPATAN EKSEKUSI AGEN AI',
    getMetricCard3Value: () => '< 2 Detik',
    metricCard3Detail:
      'Ekstraksi dokumen PDF, pemindaian OCR cerdas, dan notifikasi anomali data dikirim seketika via webhook atau bot pesan.',
  },
  'field-iot-cps': {
    scaleLabel: 'Cakupan Sensor & Titik Lapangan',
    scaleUnit: 'titik sensor / aktuator',
    minScaleText: '10 titik (Unit Rintisan)',
    defaultScaleText: '100 titik (Fasilitas Standar)',
    maxScaleText: '250 titik (Kawasan Multi-Zona)',
    metricCard1Title: '01 · OTOMASI KONTROL ALAT FISIK',
    getMetricCard1Value: (metrics) => `${metrics.manualReductionPct}%`,
    metricCard1Detail:
      'Otomasi pompa, katup air, ventilasi blower, dan pencatatan parameter lingkungan berjalan otomatis 24/7.',
    metricCard2Title: '02 · EFISIENSI SUMBER DAYA & BIAYA',
    getMetricCard2Value: (metrics) => `${metrics.wasteReductionPct}%`,
    getMetricCard2Detail: (metrics) =>
      `±${metrics.waterSavedLitersPerDay.toLocaleString('id-ID')} L/hari air terjaga & efisiensi daya listrik terkendali stabil di setiap zona.`,
    metricCard3Title: '03 · RESPON PERINGATAN KRITIS',
    getMetricCard3Value: (metrics) => `< ${metrics.telemetryLatencySec} dtk`,
    metricCard3Detail:
      'Peringatan perubahan suhu ekstrem, kebocoran pipa, atau lonjakan parameter kritis tiba seketika di ponsel tim teknis.',
  },
};

export function formatCounterValue(progress: number, target: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(eased * target);
}

export function validateConsultationInput(
  values: ConsultationFormValues
): ValidationResult {
  const errors: Partial<Record<keyof ConsultationFormValues, string>> = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Mohon cantumkan nama lengkap Anda (minimal 2 karakter).';
  }

  if (!values.organization || values.organization.trim().length < 2) {
    errors.organization = 'Mohon cantumkan nama perusahaan atau instansi.';
  }

  const emailTrimmed = values.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.email = 'Format alamat email belum valid.';
  }

  const phoneDigits = values.phone.replace(/[^\d+]/g, '');
  if (!phoneDigits || phoneDigits.length < 8) {
    errors.phone = 'Nomor telepon minimal terdiri dari 8 digit.';
  }

  if (!values.notes || values.notes.trim().length < 10) {
    errors.notes = 'Jelaskan kebutuhan sistem secara singkat (minimal 10 karakter).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
