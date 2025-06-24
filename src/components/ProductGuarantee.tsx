
import React from 'react';

const ProductGuarantee = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mt-16 border border-white/10 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mb-0 md:mr-6">
          <div className="w-16 h-16 bg-comet-blue/20 rounded-full flex items-center justify-center text-comet-blue">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">100% Product Replacement Guarantee</h3>
          <p className="text-white/70">
            We're confident you'll love your CometCopters. If you're not completely satisfied with your purchase, contact us within 30 days for a full product replacement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductGuarantee;
