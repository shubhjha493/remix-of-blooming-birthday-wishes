import { useEffect, useRef, useState } from 'react';

interface ThankYouSectionProps {
  onSkip?: () => void;
}

const ThankYouSection = ({ onSkip }: ThankYouSectionProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in effect
    const visibleTimer = setTimeout(() => setIsVisible(true), 500);

    // Play music with fade in
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(console.error);
      
      // Fade in audio
      let volume = 0;
      const fadeInterval = setInterval(() => {
        if (audioRef.current && volume < 0.6) {
          volume += 0.05;
          audioRef.current.volume = Math.min(volume, 0.6);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }

    return () => {
      clearTimeout(visibleTimer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Falling petals for background
  const petals = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 overflow-hidden">
      <audio ref={audioRef} src="/music2.mp3" loop />

      {/* Falling petals */}
      {petals.map((petal, i) => (
        <div
          key={i}
          className="absolute top-0 w-3 h-4 rounded-full"
          style={{
            left: petal.left,
            background: 'linear-gradient(135deg, hsl(340 70% 80%), hsl(340 60% 90%))',
            animation: `petal-fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}

      {/* Main content container */}
      <div 
        className={`relative max-w-md w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Image with text overlay */}
        <div className="relative animate-float-zoom rounded-2xl overflow-hidden box-glow-pink">
          <img 
            src="/thankyou-image.jpeg" 
            alt="Thank you"
            className="w-full h-auto object-cover"
          />
          
          {/* Text overlay */}
          <div 
            className="absolute inset-0 flex items-end justify-center pb-6 px-4"
            style={{
              background: 'linear-gradient(to top, hsl(0 0% 0% / 0.8), hsl(0 0% 0% / 0.3), transparent)',
            }}
          >
            <p 
              className="font-handwritten text-xl sm:text-2xl text-center leading-relaxed"
              style={{ color: 'hsl(var(--primary))' }}
            >
              Abb Smjh nhi aa rha Party ke liye Thankyou kaise bolu
            </p>
          </div>
        </div>
      </div>

      {/* Signature */}
      <p 
        className={`mt-8 font-fancy text-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        – Shubh
      </p>

      {/* Skip Button */}
      {onSkip && (
        <button
          onClick={onSkip}
          className={`absolute bottom-6 right-6 font-handwritten text-base px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/50 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            color: 'hsl(var(--primary))',
            border: '1px solid hsl(340 30% 30%)',
          }}
        >
          Skip →
        </button>
      )}
    </div>
  );
};

export default ThankYouSection;
