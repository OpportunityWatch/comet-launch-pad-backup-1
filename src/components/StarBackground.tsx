
import React, { useEffect, useRef, useMemo } from 'react';
import { useStaticStars } from '../hooks/useStaticStars';
import { useShootingStars } from '../hooks/useShootingStars';

const StarBackground = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  
  // Memoize dimensions to prevent unnecessary re-renders
  const stableDimensions = useMemo(() => dimensions, [dimensions.width, dimensions.height]);
  
  const { canvasRef: staticStarsRef } = useStaticStars(stableDimensions);
  const { canvasRef: shootingStarsRef } = useShootingStars(stableDimensions);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = rect.width || window.innerWidth;
        const newHeight = rect.height || window.innerHeight;
        
        console.log('StarBackground dimensions:', { width: newWidth, height: newHeight });
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial setup
    updateDimensions();

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
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
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
});

StarBackground.displayName = 'StarBackground';

export default StarBackground;
