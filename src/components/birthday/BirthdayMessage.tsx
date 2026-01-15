import { useEffect, useState } from 'react';

interface BirthdayMessageProps {
  onComplete: () => void;
}

const BirthdayMessage = ({ onComplete }: BirthdayMessageProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showWave, setShowWave] = useState(false);
  
  const message = "Heppyyeee Birthday Poojaaaa 🌸🎂";

  useEffect(() => {
    // Animate letters one by one
    const letterInterval = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev >= message.length) {
          clearInterval(letterInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

    // Start wave animation after all letters appear
    const waveTimer = setTimeout(() => {
      setShowWave(true);
    }, message.length * 80 + 500);

    // Notify completion
    const completeTimer = setTimeout(onComplete, message.length * 80 + 3000);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(waveTimer);
      clearTimeout(completeTimer);
    };
  }, [message.length, onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <h1 
        className="font-handwritten text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-glow-pink"
        style={{ color: 'hsl(var(--primary))' }}
      >
        {message.split('').map((letter, i) => (
          <span
            key={i}
            className={`inline-block ${showWave ? 'animate-text-wave' : ''}`}
            style={{
              opacity: i < visibleLetters ? 1 : 0,
              animation: i < visibleLetters 
                ? `letter-appear 0.4s ease-out forwards${showWave ? `, text-wave 2s ease-in-out infinite` : ''}` 
                : 'none',
              animationDelay: showWave ? `${i * 0.05}s` : '0s',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default BirthdayMessage;
