import { useEffect, useRef, useState } from 'react';

interface CelebrationProps {
  onComplete: () => void;
}

const Celebration = ({ onComplete }: CelebrationProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showCrowd, setShowCrowd] = useState(false);

  useEffect(() => {
    // Play celebration music
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(console.error);
    }

    // Show crowd after a short delay
    const crowdTimer = setTimeout(() => setShowCrowd(true), 500);

    // Complete after 15 seconds
    const completeTimer = setTimeout(onComplete, 15000);

    return () => {
      clearTimeout(crowdTimer);
      clearTimeout(completeTimer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onComplete]);

  // Generate confetti pieces
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    color: ['hsl(340 80% 70%)', 'hsl(340 60% 80%)', 'hsl(45 80% 60%)', 'hsl(200 70% 60%)'][i % 4],
    size: 8 + Math.random() * 8,
  }));

  // Crowd silhouettes positions
  const crowdMembers = Array.from({ length: 12 }, (_, i) => ({
    left: `${5 + i * 8}%`,
    height: 60 + Math.random() * 40,
    delay: i * 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <audio ref={audioRef} src="/music1.mpeg" />

      {/* Pink glow effects */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-glow-pulse"
        style={{ background: 'hsl(340 80% 50% / 0.3)' }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl animate-glow-pulse"
        style={{ 
          background: 'hsl(340 70% 60% / 0.25)',
          animationDelay: '1s',
        }}
      />

      {/* Confetti */}
      {confetti.map((piece, i) => (
        <div
          key={i}
          className="absolute top-0 rounded-sm"
          style={{
            left: piece.left,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            animation: `confetti-fall ${piece.duration}s linear infinite`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Crowd silhouettes */}
      {showCrowd && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          {crowdMembers.map((member, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-full animate-fade-in-up"
              style={{
                left: member.left,
                width: '50px',
                height: `${member.height}px`,
                background: 'linear-gradient(to top, hsl(0 0% 8%), hsl(0 0% 12%))',
                animationDelay: `${member.delay}s`,
              }}
            >
              {/* Head */}
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                style={{ background: 'hsl(0 0% 10%)' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main dancing character */}
      {showCrowd && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-dance-bounce">
          <div className="relative animate-dance-sway">
            {/* Body */}
            <div 
              className="w-16 h-24 rounded-t-3xl rounded-b-lg relative"
              style={{ background: 'linear-gradient(to bottom, hsl(340 70% 50%), hsl(340 60% 40%))' }}
            >
              {/* Face */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10">
                {/* Eyes */}
                <div className="absolute top-2 left-1 w-2 h-2 rounded-full bg-black" />
                <div className="absolute top-2 right-1 w-2 h-2 rounded-full bg-black" />
                {/* Big smile */}
                <div 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-3 rounded-b-full"
                  style={{ 
                    border: '2px solid black',
                    borderTop: 'none',
                  }}
                />
              </div>
            </div>

            {/* Arms */}
            <div 
              className="absolute top-8 -left-6 w-8 h-3 rounded-full origin-right animate-dance-arms"
              style={{ background: 'hsl(340 70% 50%)' }}
            />
            <div 
              className="absolute top-8 -right-6 w-8 h-3 rounded-full origin-left animate-dance-arms"
              style={{ 
                background: 'hsl(340 70% 50%)',
                animationDelay: '0.15s',
              }}
            />

            {/* Legs */}
            <div 
              className="absolute -bottom-6 left-2 w-4 h-8 rounded-b-lg"
              style={{ background: 'hsl(25 50% 25%)' }}
            />
            <div 
              className="absolute -bottom-6 right-2 w-4 h-8 rounded-b-lg"
              style={{ background: 'hsl(25 50% 25%)' }}
            />

            {/* Party hat */}
            <div 
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: '24px solid hsl(45 80% 50%)',
              }}
            >
              {/* Hat pom */}
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: 'hsl(340 80% 70%)' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Celebration text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="font-handwritten text-3xl sm:text-4xl text-glow-pink animate-dance-sway"
          style={{ color: 'hsl(var(--primary))' }}
        >
          🎉 Party Time! 🎉
        </p>
      </div>
    </div>
  );
};

export default Celebration;
