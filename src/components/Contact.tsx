import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Contact cards animation
    if (contactCardsRef.current) {
      gsap.fromTo(contactCardsRef.current.children,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)"
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out"
        }
      );
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254720111889', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+254720111889', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:info@glichsolutions.com', '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Jamhuri+Street,+Malindi,+Kenya', '_blank');
  };

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Get in touch with our team for any inquiries, support, or service requests. 
              We're here to help with all your technology needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <Phone className="text-red-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">0720111889</p>
              <p className="text-sm text-gray-500 mb-4">Available 24/7</p>
              <button
                onClick={handleCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Call Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <MessageCircle className="text-green-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-2">0720111889</p>
              <p className="text-sm text-gray-500 mb-4">Quick responses</p>
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Chat Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <Mail className="text-blue-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">info@glichsolutions.com</p>
              <p className="text-sm text-gray-500 mb-4">Professional inquiries</p>
              <button
                onClick={handleEmail}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Email
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <MapPin className="text-purple-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Jamhuri Street, Malindi</p>
              <p className="text-sm text-gray-500 mb-4">Near Izumi Autospares</p>
              <button
                onClick={handleDirections}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Get Directions
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="0720111889"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
                    rows={5}
                    placeholder="Tell us about your requirements or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Business Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Clock className="text-red-500" size={24} />
                  <span>Business Hours</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-red-500">Emergency Only</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">
                    💡 <strong>Emergency Services:</strong> Available 24/7 for critical business systems
                  </p>
                </div>
              </div>

              {/* Quick Service */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">🚀 Quick Service Request</h3>
                <p className="text-red-100 mb-6">
                  Need immediate assistance? Call or WhatsApp us for faster response times.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-white text-red-500 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                  >
                    📞 Call
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    💬 WhatsApp
                  </button>
                </div>
              </div>

              {/* Find Us */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Find Us</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Address:</strong> Jamhuri Street, Malindi</p>
                  <p><strong>Landmark:</strong> Near Izumi Autospares</p>
                  <p><strong>City:</strong> Malindi, Kilifi County</p>
                  <p><strong>Country:</strong> Kenya</p>
                </div>
                <button
                  onClick={handleDirections}
                  className="mt-4 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;