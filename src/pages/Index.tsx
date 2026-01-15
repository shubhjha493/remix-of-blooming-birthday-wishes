import { useState, useCallback } from 'react';
import FlowerGarden from '@/components/birthday/FlowerGarden';
import BirthdayMessage from '@/components/birthday/BirthdayMessage';
import ChocolateCake from '@/components/birthday/ChocolateCake';
import Celebration from '@/components/birthday/Celebration';
import ThankYouSection from '@/components/birthday/ThankYouSection';

type Phase = 'flowers' | 'message' | 'cake' | 'celebration' | 'thankyou';

const Index = () => {
  const [phase, setPhase] = useState<Phase>('flowers');

  const handleFlowersComplete = useCallback(() => {
    setPhase('message');
  }, []);

  const handleMessageComplete = useCallback(() => {
    setPhase('cake');
  }, []);

  const handleCakeCut = useCallback(() => {
    setPhase('celebration');
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    setPhase('thankyou');
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Flower Garden - always visible as base layer */}
      {(phase === 'flowers' || phase === 'message' || phase === 'cake') && (
        <FlowerGarden onComplete={handleFlowersComplete} />
      )}

      {/* Birthday Message - overlays on flowers */}
      {phase === 'message' && (
        <BirthdayMessage onComplete={handleMessageComplete} />
      )}

      {/* Cake Phase */}
      {phase === 'cake' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ChocolateCake onCut={handleCakeCut} />
        </div>
      )}

      {/* Celebration Phase */}
      {phase === 'celebration' && (
        <Celebration onComplete={handleCelebrationComplete} />
      )}

      {/* Thank You Phase */}
      {phase === 'thankyou' && (
        <ThankYouSection />
      )}
    </div>
  );
};

export default Index;
