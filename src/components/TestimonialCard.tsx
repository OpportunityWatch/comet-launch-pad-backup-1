
import React from 'react';
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating: number;
  location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, rating, location }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-comet-blue/30 transition-all hover:shadow-lg hover:shadow-comet-blue/5">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-comet-yellow fill-comet-yellow' : 'text-white/20'}`} 
          />
        ))}
      </div>
      <p className="text-white/80 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-medium text-white">{author}</p>
        <p className="text-white/60 text-sm">{location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
