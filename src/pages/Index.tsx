import { useState, useCallback } from 'react';
import FlowerGarden from '@/components/birthday/FlowerGarden';
import BirthdayMessage from '@/components/birthday/BirthdayMessage';
import ChocolateCake from '@/components/birthday/ChocolateCake';
import Celebration from '@/components/birthday/Celebration';
import ThankYouSection from '@/components/birthday/ThankYouSection';

type Phase = 'flowers' | 'message' | 'cake' | 'celebration' | 'thankyou';

const Index = () => {
  const [phase, setPhase] = useState<Phase>('flowers');
  const [flowersFading, setFlowersFading] = useState(false);

  const handleFlowersComplete = useCallback(() => {
    setPhase('message');
  }, []);

  const handleMessageComplete = useCallback(() => {
    // Start fading out flowers
    setFlowersFading(true);
    // After fade completes, switch to cake phase
    setTimeout(() => {
      setPhase('cake');
    }, 1000);
  }, []);

  const handleCakeCut = useCallback(() => {
    setPhase('celebration');
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    setPhase('thankyou');
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Flower Garden with fade out transition */}
      {(phase === 'flowers' || phase === 'message' || (phase === 'cake' && flowersFading)) && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            flowersFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <FlowerGarden onComplete={handleFlowersComplete} />
        </div>
      )}

      {/* Birthday Message - overlays on flowers */}
      {phase === 'message' && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            flowersFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <BirthdayMessage onComplete={handleMessageComplete} />
        </div>
      )}

      {/* Cake Phase - Full black screen with fade in */}
      {phase === 'cake' && (
        <div 
          className="absolute inset-0 bg-background flex items-center justify-center animate-fade-in-up"
        >
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
