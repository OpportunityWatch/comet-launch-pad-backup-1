
export interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  color: string;
  createdAt: number;
}

export interface ShootingStarCluster {
  id: number;
  stars: ShootingStar[];
  triggerTime: number;
  isActive: boolean;
}
