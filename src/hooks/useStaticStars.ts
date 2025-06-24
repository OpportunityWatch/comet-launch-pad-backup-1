
import { useState, useEffect, useRef, useCallback } from 'react';
import { Star } from '../types/stars';
import { generateStars, updateStarTwinkle } from '../utils/starGeneration';

export const useStaticStars = (canvasWidth: number, canvasHeight: number) => {
  const [stars, setStars] = useState<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reduce star count on mobile for performance
  const starCount = canvasWidth < 768 ? 75 : 150;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasWidth === 0 || canvasHeight === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const time = Date.now() * 0.001;

    stars.forEach((star) => {
      const twinkleOpacity = Math.max(0, Math.min(1, updateStarTwinkle(star, time)));
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
      ctx.fill();
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [stars, canvasWidth, canvasHeight]);

  // Generate stars when dimensions are available
  useEffect(() => {
    if (canvasWidth > 0 && canvasHeight > 0) {
      console.log('Generating stars with dimensions:', { canvasWidth, canvasHeight, starCount });
      const newStars = generateStars(starCount, canvasWidth, canvasHeight);
      setStars(newStars);
    }
  }, [canvasWidth, canvasHeight, starCount]);

  // Start animation when stars are ready
  useEffect(() => {
    if (stars.length > 0 && canvasWidth > 0 && canvasHeight > 0) {
      console.log('Starting static stars animation with', stars.length, 'stars');
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, stars.length, canvasWidth, canvasHeight]);

  return { canvasRef };
};
