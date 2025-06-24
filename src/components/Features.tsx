
import React, { useState } from 'react';
import { Rocket, Moon, Users, Gift, Award, Zap, Maximize2, X } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="features" className="py-20 space-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Amazing Features</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover why CometCopters are the ultimate LED slingshot helicopters for unforgettable light shows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

        <div id="experience-magic" className="mt-16">
          {/* Text section above video */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience the Magic</h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Watch as CometCopters transform an ordinary night into an extraordinary light show.
            </p>
          </div>

          {/* Video section with yellow glow */}
          <div className="relative max-w-4xl mx-auto">
            <div 
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(255,242,0,0.3)] hover:shadow-[0_0_40px_rgba(255,242,0,0.5)] transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400/50"
              onClick={toggleFullscreen}
            >
              <div className="relative" style={{ position: 'relative', aspectRatio: '53/30' }}>
                <iframe 
                  loading="lazy" 
                  title="Gumlet video player"
                  src="https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                />
                {/* Fullscreen button overlay */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-black/70 transition-colors">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full max-w-6xl max-h-[90vh] relative">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <iframe 
                  loading="lazy" 
                  title="Gumlet video player - Fullscreen"
                  src="https://play.gumlet.io/embed/685a9523db962067e0e7667e?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
