import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Users, Award, Shield, Zap, ShoppingBag, Wrench, Briefcase, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Values animation
    if (valuesRef.current) {
      gsap.fromTo(valuesRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Services animation
    if (servicesRef.current) {
      gsap.fromTo(servicesRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

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
            <h1 className="text-5xl font-bold mb-6">About Glich Solutions</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Your trusted technology partner in Malindi, providing comprehensive IT solutions, 
              quality products, and expert services since 2019.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2019, Glich Solutions began as a small computer repair shop in Malindi 
                  with a simple mission: to provide reliable, affordable technology services to our 
                  local community.
                </p>
                <p>
                  Over the years, we've grown into a comprehensive IT solutions provider, serving 
                  hundreds of satisfied customers across Malindi and the coastal region. From 
                  individual computer repairs to complete business network installations, we've 
                  handled it all.
                </p>
                <p>
                  Today, we're proud to be known as the go-to technology experts in the area, 
                  offering everything from the latest hardware and software to professional 
                  installation and ongoing support services.
                </p>
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Location</h4>
                    <p className="text-gray-600">Jamhuri Street, Malindi<br />Near Izumi Autospares<br />Kilifi County, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 8:00 AM - 5:00 PM<br />
                      Sunday: Emergency calls only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By the Numbers</h2>
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-red-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center bg-red-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center bg-red-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="text-center bg-red-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Users className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">We prioritize our customers' needs and satisfaction above everything else.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Award className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Service</h3>
              <p className="text-gray-600">We deliver high-quality solutions that exceed expectations every time.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">We stay ahead of technology trends to provide cutting-edge solutions.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Shield className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">You can count on us for consistent, dependable service and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-2xl p-8">
              <ShoppingBag className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-4">🛒 Quality Products</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Latest laptops and computers</li>
                <li>• Networking equipment</li>
                <li>• Mobile devices and accessories</li>
                <li>• Gaming gear and peripherals</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-8">
              <Wrench className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 Professional Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Computer and laptop repairs</li>
                <li>• Network installation and setup</li>
                <li>• Data recovery and backup</li>
                <li>• Cybersecurity solutions</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-8">
              <Briefcase className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 Business Solutions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Office network setup</li>
                <li>• Server installation and maintenance</li>
                <li>• Bulk hardware procurement</li>
                <li>• Ongoing IT support contracts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-red-100 max-w-4xl mx-auto">
            To empower individuals and businesses in Malindi with reliable, cutting-edge technology 
            solutions that enhance productivity, connectivity, and digital experiences while providing 
            exceptional customer service and ongoing support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;