import React, { useState } from 'react';
import { Rocket, Moon, Users, Gift, Award, Zap } from "lucide-react";
import VideoPlayer from './VideoPlayer';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-comet-blue/30 transition-all hover:shadow-lg hover:shadow-comet-blue/5 group">
      <div className="w-12 h-12 bg-comet-blue/20 rounded-lg flex items-center justify-center mb-4 text-comet-blue group-hover:bg-comet-blue group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const [isFullscreenFeatures, setIsFullscreenFeatures] = useState(false);

  const videoSrc = "https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false";

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black/50 to-black/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Amazing Features</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover why CometCopters are the ultimate LED slingshot helicopters for unforgettable light shows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <FeatureCard
            icon={<Rocket size={24} />}
            title="150+ Feet Flight"
            description="Shoots high into the sky with our powerful slingshot technology for spectacular aerial displays."
          />
          <FeatureCard
            icon={<Moon size={24} />}
            title="Spectacular at Night"
            description="Bright LED lights create dazzling comet-like streaks across the night sky."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Fun for Everyone"
            description="Perfect for ages 5+ and great for family gatherings and outdoor events."
          />
          <FeatureCard
            icon={<Gift size={24} />}
            title="Batteries Included"
            description="Ready to use right out of the package with free additional batteries included."
          />
          <FeatureCard
            icon={<Award size={24} />}
            title="Premium Quality"
            description="Made with the highest quality materials for extended durability and playtime."
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Easy Setup"
            description="Simple to assemble and launch for instant fun wherever you go."
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Getting your CometCopter ready for flight is easy! Follow these simple steps
          </p>
        </div>

        <div id="experience-magic" className="mt-8">
          <div className="relative max-w-md mx-auto md:max-w-2xl px-4">
            <VideoPlayer
              src={videoSrc}
              title="Gumlet video player"
              isFullscreen={isFullscreenFeatures}
              onToggleFullscreen={() => setIsFullscreenFeatures(!isFullscreenFeatures)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
