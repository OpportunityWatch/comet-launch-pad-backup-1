
import React, { useEffect, useState } from 'react';
import { useStaticStars } from '../hooks/useStaticStars';
import { useShootingStars } from '../hooks/useShootingStars';

const StarBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { canvasRef: staticStarsRef } = useStaticStars(dimensions.width, dimensions.height);
  const { canvasRef: shootingStarsRef } = useShootingStars(dimensions.width, dimensions.height);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Gradient background layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          zIndex: 1
        }}
      />
      
      {/* Static twinkling stars layer */}
      <canvas
        ref={staticStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
      />
      
      {/* Shooting stars layer */}
      <canvas
        ref={shootingStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ zIndex: 3 }}
      />
    </div>
  );
};

export default StarBackground;
