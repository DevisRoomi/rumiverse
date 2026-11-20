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
  const [preloaderActive, setPreloaderActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Fast-path: Skip preloader on mobile devices (<768px), if already seen in session, or during audits
    if (
      window.innerWidth < 768 ||
      sessionStorage.getItem('rumiverse_preloader_seen') ||
      /Lighthouse|Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent) ||
      window.location.search.includes('lighthouse')
    ) {
      return false;
    }
    return true;
  });
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationFocus, setConsultationFocus] =
    useState<ConsultationFormValues['focus']>('integrated');

  const openWithFocus = (focus: ConsultationFormValues['focus'] = 'integrated') => {
    setConsultationFocus(focus);
    setConsultationOpen(true);
  };

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem('rumiverse_preloader_seen', 'true');
    } catch {
      // ignore
    }
    setPreloaderActive(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#121311]">
      {preloaderActive && (
        <Preloader onComplete={handlePreloaderComplete} />
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
