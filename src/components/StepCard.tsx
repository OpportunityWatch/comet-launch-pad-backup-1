
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  image: string;
  isReversed?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, image, isReversed = false }) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16 last:mb-0`}>
      <div className="w-full md:w-1/2">
        <div className="relative">
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-comet-blue/20 to-comet-red/20 blur-lg opacity-70"></div>
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img 
              src={image} 
              alt={`Step ${number}: ${title}`} 
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-comet-blue text-white text-xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/70 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
