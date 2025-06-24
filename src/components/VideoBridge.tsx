
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoBridge = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoSrc = "https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false";

  return (
    <section className="relative z-20 -mt-8 md:-mt-12 mb-16 md:mb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience the Magic</h3>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Watch as CometCopters transform an ordinary night into an extraordinary light show.
          </p>
        </div>

        <div className="relative max-w-md mx-auto md:max-w-2xl px-4 pt-8 md:pt-0">
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
