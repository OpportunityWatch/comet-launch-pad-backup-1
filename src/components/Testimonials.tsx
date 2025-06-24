
import React from 'react';
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  rating: number;
  location: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, rating, location }) => {
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

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-comet-darkblue to-comet-space relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Hear from people who've experienced the CometCopters magic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Testimonial 
            quote="These fly very high at night, you can easily see the blue LED light. My daughter loves them. These are for ages 5+, but I would recommend parents help the younger ones. These are easy to operate."
            author="Belinda"
            rating={5}
            location="Verified Buyer"
          />
          <Testimonial 
            quote="They're incredibly fun, and I'm really impressed with how durable they are. They withstand many crashes and are easy to straighten out when bent."
            author="Amber H."
            rating={5}
            location="San Diego, CA"
          />
          <Testimonial 
            quote="A friend had these at a get-together and all the kids went crazy for them. Great customer service! Product received shortly after ordered."
            author="Steve M."
            rating={5}
            location="Verified Buyer"
          />
          <Testimonial 
            quote="Great family fun for our camping trip! They really do fly over 100 feet when launched correctly. The LED makes them fantastic to use at night."
            author="Darren W."
            rating={5}
            location="Portland, OR"
          />
          <Testimonial 
            quote="Amazing! My nephews love these. We took them to the beach and the park and they were a huge hit wherever we went. Very cool and entertaining!"
            author="Melissa T."
            rating={5}
            location="Verified Buyer"
          />
          <Testimonial 
            quote="We got these for a family gathering and they were the hit of the evening. The kids (and adults) had a blast launching them into the night sky. They really do soar!"
            author="James K."
            rating={5}
            location="Chicago, IL"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
