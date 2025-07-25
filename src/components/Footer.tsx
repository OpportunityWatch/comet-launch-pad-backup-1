
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-comet-darkblue border-t border-comet-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img
              src="/lovable-uploads/4e3425ae-5ea4-4ed5-9c53-bd25805743f0.png"
              alt="CometCopters Logo"
              className="h-10 mb-4"
            />
            <p className="text-white/70 mb-4 max-w-md">
              The Original San Diego-based LED Slingshot Helicopter. CometCopters uses only the highest quality materials for extended durability and countless hours of fun.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-comet-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-white/60 hover:text-comet-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white/60 hover:text-comet-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-white/60 hover:text-comet-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/70 hover:text-comet-blue">Features</a></li>
              <li><a href="#pricing" className="text-white/70 hover:text-comet-blue">Pricing</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-comet-blue">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-comet-blue">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-comet-blue">Shipping Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-comet-blue">Return Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-comet-blue">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-comet-blue">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} CometCopters. All rights reserved. Based in San Diego, CA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
