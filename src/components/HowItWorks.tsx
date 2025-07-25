
import React, { useState } from 'react';
import StepCard from './StepCard';
import VideoPlayer from './VideoPlayer';

const steps = [
  {
    number: 1,
    title: "Unpack & Prepare",
    description: "Remove your CometCopter from the package. Each one comes with a launcher handle, rubber band, and batteries already installed.",
    image: "/lovable-uploads/dc9a1266-de63-4c7e-91a3-d159ce8835a9.png"
  },
  {
    number: 2,
    title: "Fold Wings",
    description: "Bend each wing at the fold line and ensure the tips are at a slight angle where the colors meet for optimal flight.",
    image: "/lovable-uploads/e65364ed-0005-4dfd-a4e5-e51218af1a6b.png"
  },
  {
    number: 3,
    title: "Load & Launch",
    description: "Hook the CometCopter to the launcher's rubber band, pull back, aim upward, and release to watch it soar!",
    image: "/lovable-uploads/7d991db5-a476-408e-9786-74379a7b9a3b.png"
  },
  {
    number: 4,
    title: "Watch It Fly",
    description: "Marvel as your CometCopter shoots up to 150+ feet, then transforms into a helicopter and gently floats back down.",
    image: "/lovable-uploads/217be915-754c-4635-9150-bcc991cbee80.png"
  }
];

const HowItWorks = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoSrc = "https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false";

  return (
    <section className="py-20 bg-gradient-to-b from-comet-darkblue to-comet-space">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h3>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Watch as CometCopters transform an ordinary night into an extraordinary light show.
          </p>
        </div>

        <div className="relative max-w-md mx-auto md:max-w-2xl px-4 mb-24">
          <VideoPlayer
            src={videoSrc}
            title="Gumlet video player - How It Works"
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              {...step} 
              isReversed={index % 2 !== 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
