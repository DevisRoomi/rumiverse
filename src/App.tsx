import { useState, lazy, Suspense } from 'react';
import { Preloader } from './components/Preloader';
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
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationFocus, setConsultationFocus] =
    useState<ConsultationFormValues['focus']>('integrated');

  const openWithFocus = (focus: ConsultationFormValues['focus'] = 'integrated') => {
    setConsultationFocus(focus);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#121311]">
      {preloaderActive && (
        <Preloader onComplete={() => setPreloaderActive(false)} />
      )}
      <TopBar onOpenConsultation={() => openWithFocus('integrated')} />
      <main>
        <HeroSection />
        <AboutSection />
        <PillarsSection onOpenConsultation={openWithFocus} />
        <MasterplanSection onOpenConsultation={openWithFocus} />
        <SectorSimulationSection onConsultSector={openWithFocus} />
        <EngagementRoadmapSection />
        <SecurityReliabilityBar />
        <ExecutiveProfileSection />
      </main>
      <FooterSection onOpenConsultation={() => openWithFocus('integrated')} />
      {consultationOpen && (
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
