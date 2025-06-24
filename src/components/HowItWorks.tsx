
import React from 'react';

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
  return (
    <section className="py-20 bg-gradient-to-b from-comet-darkblue to-comet-space relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Getting your CometCopter ready for flight is easy! Follow these simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-16 last:mb-0`}>
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-comet-blue/20 to-comet-red/20 blur-lg opacity-70"></div>
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img 
                      src={step.image} 
                      alt={`Step ${step.number}: ${step.title}`} 
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-comet-blue text-white text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/70 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
