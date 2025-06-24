
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How high do CometCopters actually fly?",
    answer: "CometCopters can soar up to 150 feet or more into the air, depending on how you launch them. The powerful rubber band launcher helps propel them to impressive heights, creating a spectacular light trail as they ascend."
  },
  {
    question: "Are CometCopters safe for children?",
    answer: "Yes, CometCopters are designed for ages 5 and up with adult supervision. The materials are lightweight and safe, but we recommend supervising younger children during play to ensure proper use of the launcher."
  },
  {
    question: "How long do the batteries last?",
    answer: "The included batteries typically provide several hours of active play time. Each CometCopter comes with a free additional set of batteries, so you'll have plenty of flight time right out of the package."
  },
  {
    question: "Can CometCopters be used during the day?",
    answer: "Absolutely! While CometCopters create their most spectacular visual effects at night with the LED lights, they're still fun to use during daylight hours as flying toys."
  },
  {
    question: "What's the difference between CometCopters and other similar products?",
    answer: "CometCopters are made with higher quality materials for extended durability, feature brighter LED lights for better visibility, and come with free extra batteries. Our design has been refined for optimal flight performance and helicopter-like descent."
  },
  {
    question: "How do I qualify for free shipping?",
    answer: "Any order over $17 qualifies for free shipping. This includes our 3-pack + 1 bonus ($15.95) and larger packages. For single CometCopter purchases, there is a $4.95 shipping and handling fee."
  },
  {
    question: "Can I use CometCopters indoors?",
    answer: "CometCopters are designed for outdoor use due to the height they can reach. We don't recommend using them indoors unless you have an extremely high ceiling and plenty of open space."
  },
  {
    question: "How do I replace the batteries?",
    answer: "Each CometCopter has a small battery compartment at the base. Gently slide it open to access and replace the batteries with the included extras when needed."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-comet-space to-comet-darkblue relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Got questions? We've got answers to help you get the most out of your CometCopters
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-comet-blue hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
