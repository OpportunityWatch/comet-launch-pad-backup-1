
import React, { useEffect, useRef, useState } from 'react';
import { useStaticStars } from '../hooks/useStaticStars';
import { useShootingStars } from '../hooks/useShootingStars';

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { canvasRef: staticStarsRef } = useStaticStars(dimensions);
  const { canvasRef: shootingStarsRef } = useShootingStars(dimensions);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = rect.width || window.innerWidth;
        const newHeight = rect.height || window.innerHeight;
        
        console.log('StarBackground dimensions updated:', { width: newWidth, height: newHeight });
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    // Initial setup
    updateDimensions();

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Fallback for window resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    >
      {/* Gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        }}
      />
      
      {/* Only render canvases when we have valid dimensions */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <>
          {/* Static stars */}
          <canvas
            ref={staticStarsRef}
            width={dimensions.width}
            height={dimensions.height}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />
          
          {/* Shooting stars */}
          <canvas
            ref={shootingStarsRef}
            width={dimensions.width}
            height={dimensions.height}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />
        </>
      )}
    </div>
  );
};

export default StarBackground;
