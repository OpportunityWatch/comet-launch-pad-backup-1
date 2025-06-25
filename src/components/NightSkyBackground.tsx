
import React, { useEffect, useRef, useCallback } from 'react';
import { useStars } from '../hooks/useStars';
import { useShootingStars } from '../hooks/useShootingStars';
import { useStaticStars } from '../hooks/useStaticStars';

const NightSkyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  
  const { stars, updateStars } = useStars();
  const { shootingStars, updateShootingStars } = useShootingStars();
  const { staticStars } = useStaticStars();

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Throttle updates to prevent excessive re-renders
    if (timestamp - lastUpdateRef.current < 16) { // ~60fps
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastUpdateRef.current = timestamp;

    // Clear canvas
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw static stars
    staticStars.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Draw twinkling stars
    stars.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Draw shooting stars
    shootingStars.forEach(star => {
      const gradient = ctx.createLinearGradient(
        star.x - star.length, star.y, star.x, star.y
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(star.x - star.length, star.y);
      ctx.lineTo(star.x, star.y);
      ctx.stroke();
    });

    // Update positions with throttling
    updateStars();
    updateShootingStars();

    animationRef.current = requestAnimationFrame(animate);
  }, [stars, shootingStars, staticStars, updateStars, updateShootingStars]);

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
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        zIndex: 0
      }}
    />
  );
};

export default NightSkyBackground;
