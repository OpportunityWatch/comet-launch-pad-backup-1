import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useStars } from '../hooks/useStars';
import { useShootingStars } from '../hooks/useShootingStars';
import { useIsMobile } from '../hooks/use-mobile';

const NightSkyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  
  const { stars, getStarOpacity } = useStars(dimensions.width, dimensions.height, isMobile);
  const { getUpdatedShootingStars } = useShootingStars(dimensions.width, dimensions.height, isMobile);

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
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    let startTime = Date.now();
    
    const animate = () => {
      // Skip animation if document is hidden (during saves/builds)
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16537e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw twinkling stars
      stars.forEach(star => {
        const opacity = getStarOpacity(star, elapsed);
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Get updated shooting stars and draw them
      const currentShootingStars = getUpdatedShootingStars();
      
      currentShootingStars.forEach(star => {
        // Calculate fade factor based on position near top of screen
        const fadeZoneHeight = dimensions.height * 0.05;
        const fadeStartY = fadeZoneHeight;
        let globalFadeMultiplier = 1;
        
        if (star.y < fadeStartY) {
          globalFadeMultiplier = Math.max(0, star.y / fadeStartY);
        }
        
        // Draw trail with fade effect - smaller, more contiguous dots
        star.trail.forEach((point, index) => {
          if (point.opacity > 0) {
            ctx.save();
            ctx.globalAlpha = point.opacity * 0.9 * globalFadeMultiplier;
            
            // Create lighter blue glow effect with smaller radius for smoother trail
            const trailSize = isMobile ? 2 : 3;
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, trailSize);
            gradient.addColorStop(0, '#7dc8ff');
            gradient.addColorStop(0.3, 'rgba(125, 200, 255, 0.7)');
            gradient.addColorStop(1, 'rgba(125, 200, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, trailSize * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
        
        // Draw shooting star core with fade effect
        ctx.save();
        ctx.globalAlpha = 1 * globalFadeMultiplier;
        ctx.fillStyle = '#7dc8ff';
        ctx.shadowColor = '#7dc8ff';
        ctx.shadowBlur = (isMobile ? 12 : 16) * globalFadeMultiplier;
        ctx.beginPath();
        const coreSize = isMobile ? 2 : 3;
        ctx.arc(star.x, star.y, coreSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, stars, getStarOpacity, getUpdatedShootingStars]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NightSkyBackground;
