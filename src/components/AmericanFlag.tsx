
import React from 'react';

interface AmericanFlagProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AmericanFlag: React.FC<AmericanFlagProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-sm shadow-md`}>
      {/* Blue field with stars */}
      <div className="absolute top-0 left-0 w-2/5 h-3/5 bg-blue-800 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-px">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-px h-px bg-white rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* Red and white stripes */}
      <div className="absolute top-0 right-0 w-3/5 h-full flex flex-col">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}></div>
        ))}
      </div>
      
      {/* Full width stripes for bottom portion */}
      <div className="absolute bottom-0 left-0 w-full h-2/5 flex flex-col">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default AmericanFlag;
