
import { useState, useEffect, useRef, useCallback } from 'react';
import { ShootingStarCluster } from '../types/shootingStars';
import { generateShootingStarCluster } from '../utils/shootingStarGeneration';

export const useShootingStars = (dimensions: { width: number; height: number }) => {
  const [clusters, setClusters] = useState<ShootingStarCluster[]>([]);
  const animationFrameRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextClusterTimeRef = useRef<number>(0);
  const { width: canvasWidth, height: canvasHeight } = dimensions;

  // Initialize next cluster time
  useEffect(() => {
    if (canvasWidth > 0 && canvasHeight > 0 && nextClusterTimeRef.current === 0) {
      nextClusterTimeRef.current = Date.now() + Math.random() * 3000 + 2000;
      console.log('Shooting stars initialized for dimensions:', { canvasWidth, canvasHeight });
    }
  }, [canvasWidth, canvasHeight]);

  // Animation function
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasWidth === 0 || canvasHeight === 0) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const now = Date.now();

    // Generate new cluster if it's time
    if (now >= nextClusterTimeRef.current) {
      console.log('Creating new shooting star cluster');
      const newCluster = generateShootingStarCluster(
        Math.floor(now),
        Math.floor(Math.random() * 3) + 2,
        canvasWidth,
        canvasHeight
      );
      
      setClusters(prev => [...prev, newCluster]);
      nextClusterTimeRef.current = now + Math.random() * 8000 + 5000;
    }

    // Update and draw clusters
    setClusters(prevClusters => {
      const updatedClusters = prevClusters.map(cluster => {
        const updatedStars = cluster.stars.map(star => ({
          ...star,
          x: star.x + Math.cos(star.angle) * star.speed,
          y: star.y + Math.sin(star.angle) * star.speed,
          opacity: Math.max(0, star.opacity - 0.008),
        }));

        return { ...cluster, stars: updatedStars };
      }).filter(cluster => 
        cluster.stars.some(star => 
          star.opacity > 0 &&
          star.x > -200 && star.x < canvasWidth + 200 &&
          star.y > -200 && star.y < canvasHeight + 200
        )
      );

      // Draw shooting stars
      updatedClusters.forEach(cluster => {
        cluster.stars.forEach(star => {
          if (star.opacity > 0) {
            const gradient = ctx.createLinearGradient(
              star.x,
              star.y,
              star.x - Math.cos(star.angle) * star.length,
              star.y - Math.sin(star.angle) * star.length
            );
            
            gradient.addColorStop(0, `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${star.color}00`);

            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(
              star.x - Math.cos(star.angle) * star.length,
              star.y - Math.sin(star.angle) * star.length
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      return updatedClusters;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [canvasWidth, canvasHeight]);

  // Start animation when dimensions are available
  useEffect(() => {
    if (canvasWidth > 0 && canvasHeight > 0) {
      console.log('Starting shooting stars animation');
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return { canvasRef };
};
