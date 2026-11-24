import { useState, lazy, Suspense } from 'react';
import { Preloader } from './components/Preloader';
import { GlobalSmokeCursorCanvas } from './components/GlobalSmokeCursorCanvas';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { EngagementRoadmapSection } from './components/EngagementRoadmapSection';
import { SecurityReliabilityBar } from './components/SecurityReliabilityBar';
import { ExecutiveProfileSection } from './components/ExecutiveProfileSection';
import { FooterSection } from './components/FooterSection';
import type { ConsultationFormValues } from './utils/ecosystemData';

const MasterplanSection = lazy(() =>
  import('./components/MasterplanSection').then((m) => ({ default: m.MasterplanSection }))
);
const SectorSimulationSection = lazy(() =>
  import('./components/SectorSimulationSection').then((m) => ({ default: m.SectorSimulationSection }))
);
const AppointmentModal = lazy(() =>
  import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal }))
);

export default function App() {
  const [preloaderActive, setPreloaderActive] = useState(true);
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
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <MasterplanSection onOpenConsultation={openWithFocus} />
        </Suspense>
        <div className="content-visibility-auto">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <SectorSimulationSection onConsultSector={openWithFocus} />
          </Suspense>
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
