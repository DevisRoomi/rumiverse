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
  id: 'livestock-aquaculture' | 'enterprise-workflow' | 'smart-facility';
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
    id: 'livestock-aquaculture',
    index: '01',
    title: 'Modern Livestock & Aquaculture',
    sectorTag: 'Peternakan Presisi & Akuakultur Sirkular',
    problem:
      'Fluktuasi suhu kandang, kadar amonia yang telat terdeteksi, serta pemborosan air dan pakan akibat pencatatan lapangan yang masih manual dan terpisah.',
    solution:
      'Pemasangan simpul sensor mikroklimat dan kualitas air yang terhubung langsung ke kontrol sirkulasi otomatis, kolam bio-konversi, serta instalasi pakan hidroponik hijau.',
    stack: ['LoRaWAN & RS-485 Probes', 'Closed-Loop Valve Control', 'Real-Time Mobile Alert'],
    outcome: 'Pengurangan limbah hingga 95% dan stabilitas parameter air maupun kandang 24/7.',
    recommendedFocus: 'precision-iot',
  },
  {
    id: 'enterprise-workflow',
    index: '02',
    title: 'Enterprise Workflow & Data Automation',
    sectorTag: 'Otomasi Operasional & Rekayasa Web Kustom',
    problem:
      'Data operasional tersebar di banyak spreadsheet terpisah, proses persetujuan lambat, serta tingginya risiko human error dalam pelaporan eksekutif.',
    solution:
      'Arsitektur web kustom berbasis backend modular dengan pipeline machine learning untuk validasi dokumen, agregasi metrik otomatis, dan dasbor kendali terpusat.',
    stack: ['Modular REST / gRPC API', 'AI Pipeline Automation', 'Role-Based Access Control'],
    outcome: 'Mengurangi beban input data manual hingga 80% dengan audit trail yang lengkap.',
    recommendedFocus: 'software-ai',
  },
  {
    id: 'smart-facility',
    index: '03',
    title: 'Smart Facility & Microclimate Monitoring',
    sectorTag: 'Fasilitas Agroteknologi, Gudang & Rumah Kaca',
    problem:
      'Ketidakseimbangan kelembaban, ventilasi, dan distribusi energi antar zona fasilitas yang menyebabkan penyusutan mutu hasil produksi atau penyimpanan.',
    solution:
      'Pemetaan sensor multipoint di seluruh zona bangunan dengan edge-node berdaya cadang lokal dan mekanisme otomasi ventilasi maupun irigasi presisi.',
    stack: ['Edge-Fallback Controller', 'Time-Series Telemetry DB', 'Automated HVAC / Irrigation'],
    outcome: 'Deteksi anomali lingkungan di bawah 30 detik dengan keseragaman mikroklimat terjaga.',
    recommendedFocus: 'integrated',
  },
];

export const ENGAGEMENT_ROADMAP: RoadmapPhase[] = [
  {
    id: 'audit',
    step: '01',
    title: 'Audit & Discovery',
    duration: 'Minggu 1–2',
    summary:
      'Pemetaan alur kerja bisnis, kondisi fisik lokasi, serta titik hambatan data dan perangkat keras secara langsung di lapangan.',
    deliverable: 'Dokumen Analisis Masalah & Ruang Lingkup Teknis',
  },
  {
    id: 'blueprint',
    step: '02',
    title: 'Blueprint & Prototyping',
    duration: 'Minggu 3–4',
    summary:
      'Perancangan skema arsitektur perangkat lunak modular, topologi jaringan sensor IoT, dan purwarupa antarmuka operator.',
    deliverable: 'Cetak Biru Sistem & Purwarupa Tervalidasi',
  },
  {
    id: 'deployment',
    step: '03',
    title: 'Deployment & IoT Calibration',
    duration: 'Minggu 5–8',
    summary:
      'Pengembangan modul backend dan AI, instalasi fisik panel sensor di lokasi, serta kalibrasi ambang batas peringatan.',
    deliverable: 'Sistem Produksi Aktif & Sensor Terkalibrasi',
  },
  {
    id: 'telemetry',
    step: '04',
    title: 'Real-Time Telemetry & Maintenance',
    duration: 'Berkelanjutan',
    summary:
      'Pemantauan kesehatan sistem 24/7, pembaruan model otomasi, serta inspeksi berkala untuk memastikan reliabilitas jangka panjang.',
    deliverable: 'SLA Pemeliharaan & Dukungan Telemetri Aktif',
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
  metricCard2Title: string;
  getMetricCard2Detail: (metrics: SandboxMetrics, scale: number, automation: number) => string;
  metricCard1Detail: string;
  metricCard3Detail: string;
}

export const SECTOR_SIMULATOR_PROFILES: Record<IndustryVertical['id'], SectorSimulatorProfile> = {
  'livestock-aquaculture': {
    scaleLabel: 'Skala Fasilitas / Populasi Ternak',
    scaleUnit: 'unit / ekor',
    minScaleText: '10 ekor (Rintisan)',
    defaultScaleText: '100 ekor (Standar)',
    maxScaleText: '250 ekor (Komersial)',
    metricCard2Title: '02 · DAUR ULANG BIO-SUMBER DAYA',
    getMetricCard2Detail: (metrics) =>
      `±${metrics.waterSavedLitersPerDay.toLocaleString('id-ID')} L/hari air & ${metrics.biomassConvertedKgPerMonth.toLocaleString('id-ID')} kg/bln biomassa terkonversi.`,
    metricCard1Detail:
      'Pencatatan data pakan, takaran nutrisi, dan jadwal kontrol rutin beralih otomatis ke sistem.',
    metricCard3Detail:
      'Peringatan anomali (suhu kandang, lonjakan amonia, atau oksigen air) tiba instan di ponsel operator.',
  },
  'enterprise-workflow': {
    scaleLabel: 'Skala Alur Kerja & Proses Dokumen',
    scaleUnit: 'proses / divisi',
    minScaleText: '10 proses (Departemen)',
    defaultScaleText: '100 proses (Perusahaan)',
    maxScaleText: '250 proses (Grup Multi-Entitas)',
    metricCard2Title: '02 · EFISIENSI WAKTU & DATA OPERASIONAL',
    getMetricCard2Detail: (_metrics, scale) =>
      `±${(scale * 18).toLocaleString('id-ID')} jam kerja/bln terhemat & ${(scale * 45).toLocaleString('id-ID')} berkas terverifikasi otomatis tanpa human-error.`,
    metricCard1Detail:
      'Validasi berkas, rekonsiliasi data transaksi, dan laporan eksekutif di-generate otomatis oleh AI pipeline.',
    metricCard3Detail:
      'Deteksi kegagalan sinkronisasi, anomali data transaksi, atau celah akses dilaporkan instan via webhook & ponsel.',
  },
  'smart-facility': {
    scaleLabel: 'Cakupan Fasilitas & Titik Pemantauan',
    scaleUnit: 'titik sensor / zona',
    minScaleText: '10 titik (Greenhouse / Lab)',
    defaultScaleText: '100 titik (Gudang / Fasilitas)',
    maxScaleText: '250 titik (Kawasan Multi-Zona)',
    metricCard2Title: '02 · EFISIENSI ENERGI & MIKROKLIMAT',
    getMetricCard2Detail: (_metrics, scale, automation) =>
      `±${(scale * 24).toLocaleString('id-ID')} kWh/bln efisiensi daya HVAC & ${Math.round(92 + (automation / 100) * 7)}% stabilitas mikroklimat presisi 24/7.`,
    metricCard1Detail:
      'Pengaturan kipas exhaust, katup irigasi tetes, dan pencatatan logger lingkungan berjalan otomatis 24/7.',
    metricCard3Detail:
      'Pemberitahuan perubahan suhu ekstrem, kelembaban kritis, atau pemadaman listrik darurat dikirim seketika ke tim teknis.',
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
