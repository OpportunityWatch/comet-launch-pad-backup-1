
import React, { useEffect, useState } from 'react';
import { useStaticStars } from '../hooks/useStaticStars';
import { useShootingStars } from '../hooks/useShootingStars';

const StarBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { canvasRef: staticStarsRef } = useStaticStars(dimensions.width, dimensions.height);
  const { canvasRef: shootingStarsRef } = useShootingStars(dimensions.width, dimensions.height);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      console.log('Setting dimensions:', { width, height });
      setDimensions({ width, height });
    };

    // Set dimensions immediately
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  console.log('StarBackground render - dimensions:', dimensions);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient background layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        }}
      />
      
      {/* Static twinkling stars layer */}
      <canvas
        ref={staticStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-10"
        style={{ display: 'block' }}
      />
      
      {/* Shooting stars layer */}
      <canvas
        ref={shootingStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-20"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default StarBackground;
