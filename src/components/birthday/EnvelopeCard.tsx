import { useState, useEffect, useRef } from 'react';

const EnvelopeCard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  const messageLines = [
    "Happy Birthday to you, Pooja 🎂",
    "",
    "I don't know much about you yet.",
    "I only know that you are a HnCC member",
    "and an OG friend of madam.",
    "",
    "Hope you enjoy your day,",
    "keep smiling,",
    "and have a good year ahead.",
    "",
    "-- Shubh"
  ];

  const handleEnvelopeClick = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    
    // Start music when envelope opens
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(console.error);
      
      // Fade in audio
      let volume = 0;
      const fadeInterval = setInterval(() => {
        if (audioRef.current && volume < 0.5) {
          volume += 0.03;
          audioRef.current.volume = Math.min(volume, 0.5);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }

    // Show card after envelope opens
    setTimeout(() => {
      setShowCard(true);
    }, 800);
  };

  useEffect(() => {
    if (showCard) {
      // Animate lines one by one
      const interval = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= messageLines.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [showCard, messageLines.length]);

  // Sparkles for background
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background overflow-hidden">
      <audio ref={audioRef} src="/music3.mpeg" loop />

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-glow-pulse"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: 'hsl(var(--pink-glow))',
            animationDelay: `${sparkle.delay}s`,
            boxShadow: '0 0 6px hsl(var(--pink-glow))',
          }}
        />
      ))}

      {/* Envelope Container */}
      <div 
        className={`relative cursor-pointer transition-all duration-700 ${
          isEnvelopeOpen ? 'scale-90 -translate-y-20' : 'hover:scale-105'
        }`}
        onClick={handleEnvelopeClick}
        style={{
          animation: !isEnvelopeOpen ? 'float-zoom 3s ease-in-out infinite' : 'none',
        }}
      >
        {/* Envelope Body */}
        <div 
          className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-lg box-glow-pink"
          style={{
            background: 'linear-gradient(145deg, hsl(340 30% 25%), hsl(340 25% 18%))',
            boxShadow: '0 10px 40px hsl(0 0% 0% / 0.5), 0 0 20px hsl(var(--pink-glow) / 0.2)',
          }}
        >
          {/* Envelope Flap */}
          <div 
            className={`absolute inset-x-0 top-0 origin-top transition-transform duration-700 ease-in-out ${
              isEnvelopeOpen ? 'rotate-x-180' : ''
            }`}
            style={{
              height: '50%',
              transformStyle: 'preserve-3d',
              transform: isEnvelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Flap Front */}
            <div 
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: 'linear-gradient(180deg, hsl(340 35% 30%), hsl(340 30% 22%))',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                backfaceVisibility: 'hidden',
              }}
            />
            {/* Flap Back */}
            <div 
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: 'hsl(340 25% 20%)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            />
          </div>

          {/* Envelope Bottom Fold */}
          <div 
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '60%',
              background: 'linear-gradient(0deg, hsl(340 28% 22%), hsl(340 30% 25%))',
              clipPath: 'polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%)',
            }}
          />

          {/* Heart Seal */}
          {!isEnvelopeOpen && (
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl animate-glow-pulse"
              style={{
                filter: 'drop-shadow(0 0 8px hsl(var(--pink-glow)))',
              }}
            >
              💌
            </div>
          )}

          {/* Click hint */}
          {!isEnvelopeOpen && (
            <p 
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-handwritten text-sm whitespace-nowrap"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Tap to open
            </p>
          )}
        </div>
      </div>

      {/* Card sliding out */}
      {showCard && (
        <div 
          className="absolute inset-x-4 sm:inset-x-auto sm:w-96 max-h-[70vh] overflow-y-auto p-6 sm:p-8 rounded-xl animate-fade-in-up"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 8%), hsl(0 0% 5%))',
            border: '1px solid hsl(340 30% 25%)',
            boxShadow: '0 20px 60px hsl(0 0% 0% / 0.6), 0 0 30px hsl(var(--pink-glow) / 0.15)',
          }}
        >
          {messageLines.map((line, index) => (
            <p
              key={index}
              className={`font-handwritten text-lg sm:text-xl leading-relaxed transition-all duration-500 ${
                index < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                color: index === 0 || index === messageLines.length - 1 
                  ? 'hsl(var(--primary))' 
                  : 'hsl(var(--foreground))',
                minHeight: line === '' ? '1rem' : 'auto',
                textShadow: index === 0 ? '0 0 20px hsl(var(--pink-glow) / 0.5)' : 'none',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnvelopeCard;
