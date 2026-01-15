import { useEffect, useState } from 'react';

interface FlowerProps {
  delay: number;
  left: string;
  height: string;
  scale: number;
}

const Flower = ({ delay, left, height, scale }: FlowerProps) => {
  const [showStem, setShowStem] = useState(false);
  const [showBud, setShowBud] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    const stemTimer = setTimeout(() => setShowStem(true), delay);
    const budTimer = setTimeout(() => setShowBud(true), delay + 4000);
    const petalTimer = setTimeout(() => setShowPetals(true), delay + 5000);
    const bloomTimer = setTimeout(() => setBloomed(true), delay + 7000);

    return () => {
      clearTimeout(stemTimer);
      clearTimeout(budTimer);
      clearTimeout(petalTimer);
      clearTimeout(bloomTimer);
    };
  }, [delay]);

  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerPetalAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <div
      className={`absolute bottom-0 ${bloomed ? 'animate-flower-sway' : ''}`}
      style={{
        left,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Stem */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 rounded-full origin-bottom"
        style={{
          height: showStem ? height : '0',
          background: 'linear-gradient(to top, hsl(120 40% 25%), hsl(120 50% 35%))',
          transition: 'height 4s ease-out',
          opacity: showStem ? 1 : 0,
        }}
      >
        {/* Leaves on stem */}
        {showStem && (
          <>
            <div
              className="absolute w-6 h-3 rounded-full"
              style={{
                bottom: '40%',
                left: '100%',
                background: 'linear-gradient(135deg, hsl(120 50% 35%), hsl(120 40% 25%))',
                transform: 'rotate(30deg)',
                transformOrigin: 'left center',
                animation: 'fade-in-up 1s ease-out forwards',
                animationDelay: '2s',
                opacity: 0,
              }}
            />
            <div
              className="absolute w-5 h-2.5 rounded-full"
              style={{
                bottom: '60%',
                right: '100%',
                background: 'linear-gradient(-135deg, hsl(120 50% 35%), hsl(120 40% 25%))',
                transform: 'rotate(-30deg)',
                transformOrigin: 'right center',
                animation: 'fade-in-up 1s ease-out forwards',
                animationDelay: '2.5s',
                opacity: 0,
              }}
            />
          </>
        )}
      </div>

      {/* Flower head container */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: height,
          opacity: showBud ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        {/* Outer petals */}
        {showPetals && petalAngles.map((angle, i) => (
          <div
            key={`outer-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              '--petal-angle': `${angle}deg`,
              width: '24px',
              height: '32px',
              marginLeft: '-12px',
              marginTop: '-16px',
              background: `linear-gradient(
                to top,
                hsl(340 80% 65%),
                hsl(340 70% 80%),
                hsl(340 60% 90%)
              )`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transformOrigin: 'center bottom',
              animation: `petal-bloom 2s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0,
              boxShadow: 'inset 0 -5px 10px hsl(340 90% 60% / 0.3)',
            } as React.CSSProperties}
          />
        ))}

        {/* Inner petals */}
        {showPetals && innerPetalAngles.map((angle, i) => (
          <div
            key={`inner-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              '--petal-angle': `${angle}deg`,
              width: '18px',
              height: '24px',
              marginLeft: '-9px',
              marginTop: '-12px',
              background: `linear-gradient(
                to top,
                hsl(340 85% 70%),
                hsl(340 75% 85%),
                hsl(340 65% 95%)
              )`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transformOrigin: 'center bottom',
              animation: `petal-bloom 2s ease-out forwards`,
              animationDelay: `${0.8 + i * 0.08}s`,
              opacity: 0,
              boxShadow: 'inset 0 -3px 8px hsl(340 90% 65% / 0.3)',
            } as React.CSSProperties}
          />
        ))}

        {/* Center of flower */}
        {showBud && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10"
            style={{
              background: 'radial-gradient(circle, hsl(45 80% 60%), hsl(40 70% 45%))',
              boxShadow: '0 0 10px hsl(340 80% 70% / 0.5)',
              animation: 'bud-appear 1s ease-out forwards',
            }}
          >
            {/* Pollen dots */}
            <div className="absolute inset-1 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(45 90% 70%) 2px, transparent 2px), radial-gradient(circle at 70% 40%, hsl(45 90% 70%) 2px, transparent 2px), radial-gradient(circle at 50% 70%, hsl(45 90% 70%) 2px, transparent 2px)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface FallingPetalProps {
  delay: number;
  left: string;
  duration: number;
}

const FallingPetal = ({ delay, left, duration }: FallingPetalProps) => (
  <div
    className="absolute top-0 w-3 h-4 rounded-full opacity-0"
    style={{
      left,
      background: 'linear-gradient(135deg, hsl(340 70% 80%), hsl(340 60% 90%))',
      animation: `petal-fall ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

interface FlowerGardenProps {
  onComplete: () => void;
}

const FlowerGarden = ({ onComplete }: FlowerGardenProps) => {
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    // Start falling petals after flowers bloom
    const petalTimer = setTimeout(() => setShowPetals(true), 8000);
    // Notify completion after all animations
    const completeTimer = setTimeout(onComplete, 12000);

    return () => {
      clearTimeout(petalTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const flowers: FlowerProps[] = [
    { delay: 0, left: '10%', height: '180px', scale: 0.9 },
    { delay: 500, left: '25%', height: '220px', scale: 1.1 },
    { delay: 1000, left: '40%', height: '200px', scale: 1 },
    { delay: 300, left: '55%', height: '240px', scale: 1.2 },
    { delay: 800, left: '70%', height: '190px', scale: 0.95 },
    { delay: 1200, left: '85%', height: '210px', scale: 1.05 },
    { delay: 600, left: '15%', height: '160px', scale: 0.8 },
    { delay: 1500, left: '80%', height: '170px', scale: 0.85 },
  ];

  const fallingPetals = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.5,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Flowers */}
      {flowers.map((flower, i) => (
        <Flower key={i} {...flower} />
      ))}

      {/* Falling petals */}
      {showPetals && fallingPetals.map((petal, i) => (
        <FallingPetal key={i} {...petal} />
      ))}
    </div>
  );
};

export default FlowerGarden;
