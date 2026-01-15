import { useState, useEffect } from 'react';

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
      className={`flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
    >
      {/* Cake container with 3D perspective */}
      <div 
        className={`relative cursor-pointer transform-gpu ${!isCut ? 'animate-cake-rotate' : ''}`}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        onClick={handleCut}
      >
        {/* Main cake body */}
        <div className={`relative ${isCut ? 'flex gap-4' : ''}`}>
          {isCut ? (
            // Sliced cake pieces
            <>
              <div 
                className="relative animate-cake-slice"
                style={{ '--slice-x': '-30px', '--slice-rotate': '-15deg' } as React.CSSProperties}
              >
                <CakeSlice rotation={-10} />
              </div>
              <div 
                className="relative animate-cake-slice"
                style={{ '--slice-x': '0px', '--slice-rotate': '0deg' } as React.CSSProperties}
              >
                <CakeSlice rotation={0} />
              </div>
              <div 
                className="relative animate-cake-slice"
                style={{ '--slice-x': '30px', '--slice-rotate': '15deg' } as React.CSSProperties}
              >
                <CakeSlice rotation={10} />
              </div>
            </>
          ) : (
            // Whole cake
            <div className="relative">
              {/* Bottom layer */}
              <div 
                className="w-48 h-16 rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, hsl(25 50% 28%) 0%, hsl(25 50% 20%) 100%)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                }}
              >
                {/* Chocolate drip effect */}
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-around">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-b-full"
                      style={{
                        height: `${12 + Math.random() * 10}px`,
                        background: 'linear-gradient(180deg, hsl(25 60% 22%), hsl(25 50% 18%))',
                      }}
                    />
                  ))}
                </div>
                {/* Frosting swirls */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, hsl(25 45% 35%), hsl(25 50% 25%))',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Middle layer */}
              <div 
                className="w-40 h-14 mx-auto -mt-1 rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, hsl(25 55% 32%) 0%, hsl(25 50% 24%) 100%)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-3 flex justify-around">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 rounded-b-full"
                      style={{
                        height: `${8 + Math.random() * 8}px`,
                        background: 'linear-gradient(180deg, hsl(25 60% 26%), hsl(25 50% 20%))',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Top layer */}
              <div 
                className="w-32 h-12 mx-auto -mt-1 rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, hsl(25 55% 35%) 0%, hsl(25 50% 28%) 100%)',
                }}
              >
                {/* Chocolate ganache on top */}
                <div 
                  className="absolute inset-x-2 top-1 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(25 60% 20%), hsl(25 55% 30%), hsl(25 60% 20%))',
                  }}
                />
              </div>

              {/* Candles */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative">
                    {/* Candle body */}
                    <div 
                      className="w-2 h-8 rounded-sm"
                      style={{
                        background: `linear-gradient(90deg, hsl(340 70% ${70 + i * 5}%), hsl(340 60% ${60 + i * 5}%))`,
                      }}
                    />
                    {/* Flame */}
                    <div 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4"
                      style={{
                        background: 'radial-gradient(ellipse at bottom, hsl(45 100% 60%), hsl(30 100% 50%), transparent)',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        animation: 'glow-pulse 0.5s ease-in-out infinite',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Cherry on top */}
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, hsl(0 70% 50%), hsl(0 80% 35%))',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {/* Cherry stem */}
                <div 
                  className="absolute -top-2 left-1/2 w-0.5 h-3 rounded"
                  style={{ background: 'hsl(120 30% 30%)' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cut the cake text */}
      {!isCut && (
        <p 
          className="font-handwritten text-2xl sm:text-3xl text-glow-pink animate-pulse"
          style={{ color: 'hsl(var(--primary))' }}
        >
          Cut the cake 🎂
        </p>
      )}
    </div>
  );
};

const CakeSlice = ({ rotation }: { rotation: number }) => (
  <div 
    className="relative"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Slice shape - triangular */}
    <div 
      className="w-12 h-24 relative"
      style={{
        background: 'linear-gradient(180deg, hsl(25 55% 35%) 0%, hsl(25 50% 22%) 100%)',
        clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      }}
    >
      {/* Layer lines */}
      <div 
        className="absolute left-0 right-0 h-0.5"
        style={{ 
          top: '40%',
          background: 'hsl(40 50% 85%)',
        }}
      />
      <div 
        className="absolute left-0 right-0 h-0.5"
        style={{ 
          top: '70%',
          background: 'hsl(40 50% 85%)',
        }}
      />
    </div>
  </div>
);

export default ChocolateCake;
