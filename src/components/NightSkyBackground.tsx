import React from 'react';

const NightSkyBackground: React.FC = () => {
  console.log('🚀 SIMPLE TEST - Component loaded!');
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      background: 'linear-gradient(to bottom, #1a1a2e, #16537e)',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <p style={{ color: 'white', padding: '20px' }}>Background Test</p>
    </div>
  );
};

export default NightSkyBackground;
