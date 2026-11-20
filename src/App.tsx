import { useState, lazy, Suspense } from 'react';
import { Preloader } from './components/Preloader';
import { GlobalSmokeCursorCanvas } from './components/GlobalSmokeCursorCanvas';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { MasterplanSection } from './components/MasterplanSection';
import { SectorSimulationSection } from './components/SectorSimulationSection';
import { EngagementRoadmapSection } from './components/EngagementRoadmapSection';
import { SecurityReliabilityBar } from './components/SecurityReliabilityBar';
import { ExecutiveProfileSection } from './components/ExecutiveProfileSection';
import { FooterSection } from './components/FooterSection';
import type { ConsultationFormValues } from './utils/ecosystemData';

const AppointmentModal = lazy(() =>
  import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal }))
);

export default function App() {
  const [preloaderActive, setPreloaderActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.hash || sessionStorage.getItem('rmv_preloader_seen')) return false;
    if (navigator.webdriver) return false;
    return true;
  });
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [hasOpenedConsultation, setHasOpenedConsultation] = useState(false);
  const [consultationFocus, setConsultationFocus] =
    useState<ConsultationFormValues['focus']>('integrated');

  const openWithFocus = (focus: ConsultationFormValues['focus'] = 'integrated') => {
    setHasOpenedConsultation(true);
    setConsultationFocus(focus);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#121311]">
      <GlobalSmokeCursorCanvas />
      {preloaderActive && (
        <Preloader onComplete={() => setPreloaderActive(false)} />
      )}
      <TopBar onOpenConsultation={() => openWithFocus('integrated')} />
      <main>
        <HeroSection />
        <AboutSection />
        <PillarsSection onOpenConsultation={openWithFocus} />
        <div className="content-visibility-auto">
          <MasterplanSection onOpenConsultation={openWithFocus} />
        </div>
        <div className="content-visibility-auto">
          <SectorSimulationSection onConsultSector={openWithFocus} />
        </div>
        <div className="content-visibility-auto">
          <EngagementRoadmapSection />
        </div>
        <div className="content-visibility-auto">
          <SecurityReliabilityBar />
        </div>
        <div className="content-visibility-auto">
          <ExecutiveProfileSection />
        </div>
      </main>
      <div className="content-visibility-auto">
        <FooterSection onOpenConsultation={() => openWithFocus('integrated')} />
      </div>
      {hasOpenedConsultation && (
        <Suspense fallback={null}>
          <AppointmentModal
            open={consultationOpen}
            defaultFocus={consultationFocus}
            onClose={() => setConsultationOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
