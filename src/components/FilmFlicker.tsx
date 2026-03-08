import { useEffect, useState } from 'react';

export function FilmFlicker() {
  const [opacity, setOpacity] = useState(0.02);

  useEffect(() => {
    const flicker = () => {
      // Random flicker intensity - more mild
      const newOpacity = Math.random() * 0.05 + 0.01;
      setOpacity(newOpacity);
    };

    // Slower, more subtle flicker intervals
    const interval = setInterval(() => {
      flicker();
    }, 100 + Math.random() * 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Grain/noise overlay — CSS-only, works in Android WebView */}
      <div 
        className="fixed inset-0 z-30 pointer-events-none film-grain"
        style={{
          opacity: opacity,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 2px),' +
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 2px)',
          backgroundSize: '3px 3px',
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      
      {/* Light flicker overlay */}
      <div 
        className="fixed inset-0 z-25 pointer-events-none animate-flicker"
        style={{
          background: 'rgba(255, 255, 255, 0.008)',
        }}
      />
    </>
  );
}
