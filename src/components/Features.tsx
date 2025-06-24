
import React from 'react';
import { Rocket, Moon, Users, Gift, Award, Zap } from "lucide-react";

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
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-comet-darkblue via-comet-space to-comet-darkblue relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Amazing Features</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover why CometCopters are the ultimate LED slingshot helicopters for unforgettable light shows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <div className="mt-16 relative">
          <div className="rounded-xl overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src="/lovable-uploads/7799f13d-b7be-4962-9a63-1224ae453060.png" 
                alt="CometCopters in action at night" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-comet-darkblue/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Experience the Magic</h3>
                <p className="text-white/80 mb-4 max-w-xl">
                  Watch as CometCopters transform an ordinary night into an extraordinary light show.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
