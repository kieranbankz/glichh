import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What types of products do you sell?",
      answer: "We offer a wide range of technology products including laptops, computers, networking equipment, gaming accessories, mobile phones, audio devices, cables, adapters, and storage devices. All our products are genuine and come with manufacturer warranties."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes! We provide professional installation services for networking equipment, computer setups, software installation, and business IT infrastructure. Our certified technicians ensure everything is properly configured and optimized for your needs."
    },
    {
      question: "What is your warranty policy?",
      answer: "All products come with manufacturer warranties. Additionally, we provide our own service warranty for repairs and installations. Warranty periods vary by product type - typically 1-3 years for hardware and 6 months for our service work."
    },
    {
      question: "Do you offer computer repair services?",
      answer: "Absolutely! We specialize in computer and laptop repairs including hardware replacement, software troubleshooting, virus removal, data recovery, and performance optimization. We service all major brands and provide free diagnostics."
    },
    {
      question: "What are your delivery options?",
      answer: "We offer free delivery within Malindi town for orders over KES 2,000. For other areas in Kilifi County, delivery charges apply based on distance. We also provide same-day delivery for urgent orders placed before 2 PM."
    },
    {
      question: "Do you provide business IT support?",
      answer: "Yes, we offer comprehensive business IT support including network setup, server maintenance, cybersecurity solutions, and ongoing technical support contracts. We work with businesses of all sizes from small offices to large enterprises."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, M-Pesa, bank transfers, and major credit/debit cards. For business customers, we also offer credit terms and bulk purchase discounts. Payment plans are available for high-value purchases."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, we'll provide you with tracking information via SMS and WhatsApp. You can also call or message us directly for real-time updates on your order status and delivery time."
    },
    {
      question: "Do you buy used equipment?",
      answer: "Yes, we purchase used computers, laptops, and networking equipment in good condition. We offer competitive prices and can provide trade-in credits toward new purchases. Contact us for a free evaluation of your equipment."
    },
    {
      question: "What if I need emergency IT support?",
      answer: "We provide 24/7 emergency support for critical business systems. Call or WhatsApp us anytime for urgent issues. Emergency service charges apply for after-hours support, but we're always ready to help when you need us most."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="text-red-500 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-red-500 flex-shrink-0" size={20} />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-red-100 mb-6">
            Can't find what you're looking for? Our team is here to help with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('tel:+254720111889', '_blank')}
              className="bg-white text-red-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              📞 Call Us: 0720111889
            </button>
            <button
              onClick={() => window.open('https://wa.me/254720111889', '_blank')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;