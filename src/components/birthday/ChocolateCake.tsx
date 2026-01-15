import { useState, useEffect } from 'react';
import chocolateCakeImg from '@/assets/chocolate-cake.png';

interface ChocolateCakeProps {
  onCut: () => void;
}

const ChocolateCake = ({ onCut }: ChocolateCakeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCut, setIsCut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCut = () => {
    if (!isCut) {
      setIsCut(true);
      onCut();
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
    >
      {/* Cake container with 3D perspective */}
      <div 
        className="relative cursor-pointer"
        style={{ 
          perspective: '1000px',
        }}
        onClick={handleCut}
      >
        <div 
          className={`relative transition-transform duration-500 ${isCut ? '' : 'animate-cake-3d-rotate'}`}
          style={{ 
            transformStyle: 'preserve-3d',
          }}
        >
          {isCut ? (
            // Sliced cake pieces
            <div className="flex gap-4 items-end">
              <div 
                className="animate-cake-slice"
                style={{ '--slice-x': '-40px', '--slice-rotate': '-12deg' } as React.CSSProperties}
              >
                <img 
                  src={chocolateCakeImg} 
                  alt="Cake slice" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-80"
                  style={{ clipPath: 'polygon(0% 0%, 35% 0%, 50% 100%, 0% 100%)' }}
                />
              </div>
              <div 
                className="animate-cake-slice"
                style={{ '--slice-x': '0px', '--slice-rotate': '0deg' } as React.CSSProperties}
              >
                <img 
                  src={chocolateCakeImg} 
                  alt="Cake slice" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                  style={{ clipPath: 'polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)' }}
                />
              </div>
              <div 
                className="animate-cake-slice"
                style={{ '--slice-x': '40px', '--slice-rotate': '12deg' } as React.CSSProperties}
              >
                <img 
                  src={chocolateCakeImg} 
                  alt="Cake slice" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-80"
                  style={{ clipPath: 'polygon(65% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
                />
              </div>
            </div>
          ) : (
            // Whole rotating cake
            <img 
              src={chocolateCakeImg} 
              alt="Chocolate Birthday Cake" 
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            />
          )}
        </div>
      </div>

      {/* Cut the cake text */}
      {!isCut && (
        <p 
          className="font-handwritten text-2xl sm:text-3xl text-glow-pink animate-pulse"
          style={{ color: 'hsl(var(--primary))' }}
        >
          Cut the cake
        </p>
      )}
    </div>
  );
};

export default ChocolateCake;
