import { useEffect, useState, type FormEvent } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import {
  validateConsultationInput,
  type ConsultationFormValues,
  STUDIO_CONTACT,
} from '../utils/ecosystemData';

interface AppointmentModalProps {
  open: boolean;
  defaultFocus?: ConsultationFormValues['focus'];
  onClose: () => void;
}

const INITIAL_FORM: ConsultationFormValues = {
  name: '',
  organization: '',
  email: '',
  phone: '',
  focus: 'integrated',
  notes: '',
};

const FOCUS_LABELS: Record<ConsultationFormValues['focus'], string> = {
  'software-ai': 'Boutique Software & AI Automation',
  'precision-iot': 'Precision Livestock Farming (IoT)',
  integrated: 'Sistem Terintegrasi (Software + IoT)',
};

export function AppointmentModal({
  open,
  defaultFocus = 'integrated',
  onClose,
}: AppointmentModalProps) {
  const [form, setForm] = useState<ConsultationFormValues>({
    ...INITIAL_FORM,
    focus: defaultFocus,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormValues, string>>>({});
  const [submittedRecord, setSubmittedRecord] = useState<ConsultationFormValues | null>(null);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, focus: defaultFocus }));
    }
  }, [open, defaultFocus]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = validateConsultationInput(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmittedRecord(form);
  };

  const handleResetAndClose = () => {
    setSubmittedRecord(null);
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121311]/85 p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        className="w-full max-w-xl bg-[#F4F3EF] border border-[#D8D6CE] text-[#121311] max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-5 border-b border-[#D8D6CE] flex items-center justify-between gap-4 bg-[#FAF9F6]">
          <div>
            <p className="font-mono text-xs text-[#2E7D5B]">
              Lumajang, Jawa Timur · {STUDIO_CONTACT.phone} · Sesi Daring &amp; Kunjungan
            </p>
            <h2
              id="appointment-modal-title"
              className="font-display text-xl font-bold text-[#121311] tracking-tight mt-0.5"
            >
              Jadwalkan Konsultasi Teknis
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir konsultasi"
            className="w-10 h-10 inline-flex items-center justify-center border border-[#D8D6CE] text-[#121311] hover:bg-[#EAE8E1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {submittedRecord ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-3 pb-6 border-b border-[#D8D6CE]">
              <CheckCircle2 className="w-6 h-6 text-[#2E7D5B] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-bold text-[#121311]">
                  Permintaan Konsultasi Tercatat
                </h3>
                <p className="mt-1 text-sm text-[#2D2F2A] leading-relaxed">
                  Tim arsitektur kami akan meninjau ringkasan sistem Anda dan menghubungi melalui{' '}
                  <span className="font-mono text-[#121311]">{submittedRecord.email}</span> untuk
                  konfirmasi jadwal pertemuan di Lumajang atau sesi daring.
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs text-[#4A4D46]">Pemohon</dt>
                <dd className="mt-0.5 font-semibold text-[#121311]">{submittedRecord.name}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-[#4A4D46]">Instansi / Perusahaan</dt>
                <dd className="mt-0.5 font-semibold text-[#121311]">
                  {submittedRecord.organization}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-xs text-[#4A4D46]">Fokus Sistem</dt>
                <dd className="mt-0.5 font-semibold text-[#121311]">
                  {FOCUS_LABELS[submittedRecord.focus]}
                </dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-[#D8D6CE] flex items-center justify-between gap-4">
              <a
                href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(
                  `Konsultasi Sistem — ${submittedRecord.organization}`
                )}&body=${encodeURIComponent(
                  `Nama: ${submittedRecord.name}\nInstansi: ${submittedRecord.organization}\nTelepon: ${submittedRecord.phone}\nFokus: ${FOCUS_LABELS[submittedRecord.focus]}\n\nCatatan:\n${submittedRecord.notes}`
                )}`}
                className="font-mono text-xs text-[#1B3B2B] underline underline-offset-4 hover:text-[#121311]"
              >
                Kirim salinan langsung via email
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 text-xs font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] transition-colors cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="consult-name"
                  className="block font-mono text-xs text-[#4A4D46] mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="consult-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B]"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="consult-org"
                  className="block font-mono text-xs text-[#4A4D46] mb-1.5"
                >
                  Perusahaan / Instansi
                </label>
                <input
                  id="consult-org"
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="Nama organisasi"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B]"
                />
                {errors.organization && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.organization}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="consult-email"
                  className="block font-mono text-xs text-[#4A4D46] mb-1.5"
                >
                  Alamat Email
                </label>
                <input
                  id="consult-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@perusahaan.co.id"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="consult-phone"
                  className="block font-mono text-xs text-[#4A4D46] mb-1.5"
                >
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  id="consult-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={STUDIO_CONTACT.phone}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="consult-focus"
                className="block font-mono text-xs text-[#4A4D46] mb-1.5"
              >
                Pilar Kebutuhan
              </label>
              <select
                id="consult-focus"
                value={form.focus}
                onChange={(e) =>
                  setForm({ ...form, focus: e.target.value as ConsultationFormValues['focus'] })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B]"
              >
                <option value="integrated">Sistem Terintegrasi (Software + IoT)</option>
                <option value="software-ai">Boutique Software &amp; AI Automation</option>
                <option value="precision-iot">Precision Livestock Farming (IoT)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="consult-notes"
                className="block font-mono text-xs text-[#4A4D46] mb-1.5"
              >
                Ringkasan Kebutuhan Teknis
              </label>
              <textarea
                id="consult-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Ceritakan skala operasional dan tantangan sistem yang ingin diselesaikan..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D8D6CE] text-[#121311] focus:outline-none focus:border-[#1B3B2B] resize-none"
              />
              {errors.notes && (
                <p className="mt-1 text-xs text-red-700" role="alert">
                  {errors.notes}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#D8D6CE] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium border border-[#D8D6CE] text-[#4A4D46] hover:bg-[#EAE8E1] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] transition-colors cursor-pointer"
              >
                Kirim Permintaan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
