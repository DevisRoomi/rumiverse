interface ReliabilitySpecItem {
  code: string;
  title: string;
  detail: string;
}

const LOCALIZED_SPECS: ReliabilitySpecItem[] = [
  {
    code: 'SEC-01',
    title: 'Enkripsi Data Berlapis',
    detail: 'Seluruh data telemetri sensor dan transaksi dilindungi enkripsi standar industri (TLS 1.3 & AES-256) dari simpul fisik hingga server.',
  },
  {
    code: 'INT-02',
    title: 'Integrasi API Terbuka',
    detail: 'Arsitektur modular berbasis REST & MQTT, mudah dihubungkan dengan sistem kasir (POS), ERP, atau aplikasi internal yang sudah Anda miliki.',
  },
  {
    code: 'RES-03',
    title: 'Mode Luring Mandiri (Offline Fallback)',
    detail: 'Perangkat lapangan tetap menyimpan rekaman data di memori lokal saat sinyal internet terputus, dan otomatis sinkron begitu koneksi pulih.',
  },
  {
    code: 'SLA-04',
    title: 'Pemantauan Kesehatan 24/7',
    detail: 'Pengawasan mandiri dengan diagnostik otomatis dan peringatan dini instan jika ada aktuator, pompa, atau sensor yang butuh penanganan.',
  },
];

export function SecurityReliabilityBar() {
  return (
    <section
      aria-label="Standar Keamanan & Keandalan Sistem"
      className="bg-[#121311] text-[#F4F3EF] border-b border-[#2D2F2A]"
    >
      <div className="max-w-[1440px] mx-auto px-6 pt-16 pb-12 sm:px-10 sm:pt-20 sm:pb-14 lg:px-12 lg:pt-20 lg:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#2D2F2A]">
          <span className="font-mono text-xs text-[#74C69D] tracking-wide uppercase font-semibold">
            06. STANDAR KEAMANAN &amp; KEANDALAN SISTEM
          </span>
          <span className="font-mono text-xs text-[#A1A39B]">
            JAMINAN REKAYASA &amp; INTEGRITAS DATA ENTERPRISE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#2D2F2A] pt-6">
          {LOCALIZED_SPECS.map((spec, idx) => (
            <div
              key={spec.code}
              className={`py-4 lg:py-2 ${
                idx >= 2 ? 'sm:border-t sm:border-[#2D2F2A] lg:border-t-0' : ''
              } ${idx % 2 === 1 ? 'sm:border-l sm:border-[#2D2F2A] lg:border-l-0 sm:pl-6' : 'sm:pr-6'} ${
                idx === 0
                  ? 'lg:pl-0 lg:pr-6'
                  : idx === LOCALIZED_SPECS.length - 1
                    ? 'lg:pl-6 lg:pr-0'
                    : 'lg:px-6'
              }`}
            >
              <p className="font-mono text-[11px] text-[#74C69D] mb-1.5 font-bold">{spec.code}</p>
              <h3 className="font-mono text-sm font-semibold text-[#F4F3EF] tracking-tight">
                {spec.title}
              </h3>
              <p className="mt-2 text-xs text-[#A1A39B] leading-relaxed">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
