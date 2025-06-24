
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useStaticStars } from '../hooks/useStaticStars';
import { useShootingStars } from '../hooks/useShootingStars';

const StarBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { canvasRef: staticStarsRef } = useStaticStars(dimensions.width, dimensions.height);
  const { shootingStars, getUpdatedShootingStars } = useShootingStars(dimensions.width, dimensions.height, isMobile);
  const shootingStarsRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setIsMobile(width < 768);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const animateShootingStars = useCallback(() => {
    const canvas = shootingStarsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const updatedStars = getUpdatedShootingStars();
    
    updatedStars.forEach((star) => {
      // Draw trail
      if (star.trail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(100, 150, 255, ${star.trail[0]?.opacity || 0})`;
        ctx.lineWidth = 2;
        ctx.moveTo(star.trail[0].x, star.trail[0].y);
        
        for (let i = 1; i < star.trail.length; i++) {
          ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        ctx.stroke();
      }

      // Draw star head
      ctx.beginPath();
      ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    });

    animationFrameRef.current = requestAnimationFrame(animateShootingStars);
  }, [getUpdatedShootingStars, dimensions.width, dimensions.height]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animateShootingStars();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateShootingStars]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Static twinkling stars layer */}
      <canvas
        ref={staticStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />
      
      {/* Shooting stars layer */}
      <canvas
        ref={shootingStarsRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

export default StarBackground;
