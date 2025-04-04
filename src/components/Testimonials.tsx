
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
    <section className="py-20 bg-gradient-to-b from-comet-space to-comet-darkblue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Hear from people who've experienced the CometCopters magic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Testimonial 
            quote="My kids are absolutely obsessed with these! We take them to the park every weekend and they've become the coolest family in the neighborhood."
            author="Sarah M."
            rating={5}
            location="San Diego, CA"
          />
          <Testimonial 
            quote="Bought these for my nephew's birthday and now I'm the favorite uncle. The light show these things create at night is genuinely impressive."
            author="Michael T."
            rating={5}
            location="Phoenix, AZ"
          />
          <Testimonial 
            quote="We used these at our community event and they were the highlight of the night. Worth every penny - they really do fly super high!"
            author="Jessica L."
            rating={5}
            location="Portland, OR"
          />
          <Testimonial 
            quote="I've tried other LED helicopter toys before, but CometCopters are far more durable and create a much more impressive light display."
            author="Robert K."
            rating={4}
            location="Chicago, IL"
          />
          <Testimonial 
            quote="Best outdoor toy purchase I've made in years! My whole family loves them and they're surprisingly durable even after many launches."
            author="Amanda B."
            rating={5}
            location="Miami, FL"
          />
          <Testimonial 
            quote="Bought these for a camping trip and they created the most amazing atmosphere at night. Our friends were all asking where they could get their own!"
            author="David W."
            rating={5}
            location="Austin, TX"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
