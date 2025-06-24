
import { ShootingStar, ShootingStarCluster } from '../types/shootingStars';

const COMET_COLORS = ['#00A0E4', '#00A651', '#FFF200', '#FF8C00', '#D946EF', '#ea384c'];

export const generateShootingStar = (
  id: number,
  canvasWidth: number,
  canvasHeight: number
): ShootingStar => {
  const startSide = Math.floor(Math.random() * 4);
  let x, y, angle;

  switch (startSide) {
    case 0: // Top
      x = Math.random() * canvasWidth;
      y = -50;
      angle = Math.random() * Math.PI/3 + Math.PI/3;
      break;
    case 1: // Right
      x = canvasWidth + 50;
      y = Math.random() * canvasHeight;
      angle = Math.random() * Math.PI/3 + Math.PI * 2/3;
      break;
    case 2: // Bottom
      x = Math.random() * canvasWidth;
      y = canvasHeight + 50;
      angle = Math.random() * Math.PI/3 + Math.PI * 4/3;
      break;
    default: // Left
      x = -50;
      y = Math.random() * canvasHeight;
      angle = Math.random() * Math.PI/3 + Math.PI * 5/3;
      break;
  }

  return {
    id,
    x,
    y,
    angle,
    speed: Math.random() * 3 + 2,
    length: Math.random() * 100 + 50,
    opacity: Math.random() * 0.8 + 0.2,
    color: COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)],
    createdAt: Date.now(),
  };
};

export const generateShootingStarCluster = (
  clusterId: number,
  count: number,
  canvasWidth: number,
  canvasHeight: number
): ShootingStarCluster => {
  const stars: ShootingStar[] = [];
  
  for (let i = 0; i < count; i++) {
    stars.push(generateShootingStar(clusterId * 100 + i, canvasWidth, canvasHeight));
  }

  return {
    id: clusterId,
    stars,
    triggerTime: Date.now(),
    isActive: true,
  };
};
