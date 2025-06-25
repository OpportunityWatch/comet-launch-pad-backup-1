
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useStars } from '../hooks/useStars';
import { useShootingStars } from '../hooks/useShootingStars';
import { useStaticStars } from '../hooks/useStaticStars';

const NightSkyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const { stars, getStarOpacity } = useStars(dimensions.width, dimensions.height, isMobile);
  const { shootingStars, getUpdatedShootingStars } = useShootingStars(dimensions.width, dimensions.height, isMobile);
  const { canvasRef: staticStarsRef } = useStaticStars(dimensions.width, dimensions.height);

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

  // Pause animations during document visibility changes (saves)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const animate = useCallback((timestamp: number) => {
    // Skip animation if document is hidden or paused
    if (document.hidden || isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Throttle updates to prevent excessive re-renders
    if (timestamp - lastUpdateRef.current < 16) { // ~60fps
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastUpdateRef.current = timestamp;

    // Create the gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16537e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    const time = Date.now() * 0.001;

    // Draw twinkling stars
    stars.forEach(star => {
      const opacity = getStarOpacity(star, time);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Draw shooting stars
    const currentShootingStars = getUpdatedShootingStars();
    currentShootingStars.forEach(star => {
      // Draw trail
      if (star.trail && star.trail.length > 1) {
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

    animationRef.current = requestAnimationFrame(animate);
  }, [stars, getStarOpacity, getUpdatedShootingStars, dimensions.width, dimensions.height, isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation loop
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0
      }}
    />
  );
};

export default NightSkyBackground;
