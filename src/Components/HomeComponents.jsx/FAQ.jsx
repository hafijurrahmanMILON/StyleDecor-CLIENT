import React from "react";

const FAQ = () => {
  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "It depends on the scale. Small residential sessions take 2-3 weeks, while grand venue transformations can take up to 2 months from planning to execution."
    },
    {
      q: "Do you offer custom furniture design?",
      a: "Yes, our Signature Decor includes bespoke furniture pieces tailored to your room's dimensions and your personal aesthetic preference."
    },
    {
      q: "Can I choose my own decorators?",
      a: "Absolutely! You can browse our 'Best Decorators' section and request a specific professional for your consultation."
    },
    {
      q: "Is there any initial consultation fee?",
      a: "Our first discovery call is completely free. Detailed site visits and concept sketches are part of our premium consultation package."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Common Doubts</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mt-4 tracking-tighter">
            Frequently Asked <br />
            <span className="text-primary italic font-light">Questions</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-8 rounded-[2rem] border border-gray-100 hover:border-primary/20 transition-all bg-gray-50/30">
              <h4 className="text-lg font-black text-gray-900 mb-3 flex items-start gap-4">
                <span className="text-primary">0{index + 1}.</span> {faq.q}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium pl-10">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;