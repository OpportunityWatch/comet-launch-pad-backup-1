
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoBridge = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoSrc = "https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false";

  return (
    <section className="relative z-20 -mt-16 md:-mt-20 mb-16 md:mb-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-md mx-auto md:max-w-2xl px-4">
          <VideoPlayer
            src={videoSrc}
            title="Gumlet video player - Hero Bridge"
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoBridge;
