
import { useState, useEffect, useRef, useCallback } from 'react';
import { Star } from '../types/stars';
import { generateStars, updateStarTwinkle } from '../utils/starGeneration';

export const useStaticStars = (dimensions: { width: number; height: number }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width: canvasWidth, height: canvasHeight } = dimensions;

  // Reduce star count on mobile for performance
  const starCount = canvasWidth < 768 ? 75 : 150;

  // Generate stars when dimensions change
  useEffect(() => {
    if (canvasWidth > 0 && canvasHeight > 0) {
      console.log('Generating static stars:', { canvasWidth, canvasHeight, starCount });
      const newStars = generateStars(starCount, canvasWidth, canvasHeight);
      setStars(newStars);
    }
  }, [canvasWidth, canvasHeight, starCount]);

  // Animation function
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasWidth === 0 || canvasHeight === 0 || stars.length === 0) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const time = Date.now() * 0.001;

    // Draw stars
    stars.forEach((star) => {
      const twinkleOpacity = Math.max(0, Math.min(1, updateStarTwinkle(star, time)));
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
      ctx.fill();
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [canvasWidth, canvasHeight, stars]);

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
  }, [animate, stars.length]);

  return { canvasRef };
};
