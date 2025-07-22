import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onViewAllProducts?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewAllProducts }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const flashSalesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero banner animation
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

    // Categories sidebar animation
    if (categoriesRef.current) {
      const categoryItems = categoriesRef.current.querySelectorAll('a');
      gsap.fromTo(categoryItems,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }

    // Flash sales animation
    if (flashSalesRef.current) {
      gsap.fromTo(flashSalesRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.8,
          scrollTrigger: {
            trigger: flashSalesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Floating animation for banner elements
    if (bannerRef.current) {
      const floatingElement = bannerRef.current.querySelector('.floating-element');
      if (floatingElement) {
        gsap.to(floatingElement, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger category filter (this would need to be passed as a prop in a real implementation)
    }
  };

  const handleViewAllProducts = () => {
    if (onViewAllProducts) {
      onViewAllProducts();
    } else {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div ref={categoriesRef} className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Categories</h3>
              <nav className="space-y-3">
                {[
                  'Electronics',
                  'Computers & Laptops',
                  'Networking Equipment',
                  'Gaming Accessories',
                  'Mobile Phones',
                  'Audio & Headphones',
                  'Cables & Adapters',
                  'Storage Devices'
                ].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
                  >
                    <span>{category}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Banner */}
            <div ref={bannerRef} className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-red-500 font-bold text-lg">G</span>
                  </div>
                  <span className="text-lg font-bold">Glich Solutions</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  Up to 15%<br />
                  off Voucher
                </h1>
                <button 
                  onClick={handleViewAllProducts}
                  className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-lg"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="floating-element absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="w-48 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl backdrop-blur-sm"></div>
              </div>
              {/* Dots indicator */}
              <div className="absolute bottom-6 left-8 flex space-x-2">
                {[0, 1, 2, 3, 4].map((dot, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* Flash Sales Section */}
            <div ref={flashSalesRef} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-8 bg-red-500 rounded"></div>
                  <h2 className="text-xl font-bold text-gray-900">Today's Flash Sales</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="bg-red-500 text-white px-2 py-1 rounded font-bold">03</div>
                    <span className="font-bold">:</span>
                    <div className="bg-red-500 text-white px-2 py-1 rounded font-bold">23</div>
                    <span className="font-bold">:</span>
                    <div className="bg-red-500 text-white px-2 py-1 rounded font-bold">19</div>
                    <span className="font-bold">:</span>
                    <div className="bg-red-500 text-white px-2 py-1 rounded font-bold">56</div>
                  </div>
                </div>
              </div>

              {/* Flash Sale Products */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { 
                    name: 'Xbox Wireless Controller', 
                    price: 6500, 
                    originalPrice: 7800, 
                    discount: '-17%', 
                    rating: 4.5, 
                    reviews: 88,
                    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                  },
                  { 
                    name: 'Mechanical Keyboard', 
                    price: 8900, 
                    originalPrice: 11000, 
                    discount: '-19%', 
                    rating: 4.8, 
                    reviews: 75,
                    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                  },
                  { 
                    name: 'Gaming Monitor', 
                    price: 18500, 
                    originalPrice: 22000, 
                    discount: '-16%', 
                    rating: 4.6, 
                    reviews: 99,
                    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                  }
                ].map((product, index) => (
                  <div key={index} className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                    <div className="relative bg-gray-100 rounded-lg p-4 mb-3 group-hover:shadow-lg transition-shadow">
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                        {product.discount}
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-red-500 font-bold">KES {product.price.toLocaleString()}</span>
                      <span className="text-gray-400 line-through text-sm">KES {product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button 
                  onClick={handleViewAllProducts}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 transform hover:scale-105 transition-transform duration-300">
              <MapPin size={32} className="text-white" />
              <h3 className="font-bold text-lg">Visit Our Store</h3>
              <p className="text-sm text-red-100">Jamhuri Street, Malindi</p>
              <p className="text-xs text-red-200">Delivery charges: KES 200</p>
            </div>
            <div className="flex flex-col items-center space-y-2 transform hover:scale-105 transition-transform duration-300">
              <Phone size={32} className="text-white" />
              <h3 className="font-bold text-lg">Call Us</h3>
              <p className="text-sm text-red-100">0720111889</p>
              <p className="text-xs text-red-200">24/7 Support Available</p>
            </div>
            <div className="flex flex-col items-center space-y-2 transform hover:scale-105 transition-transform duration-300">
              <MessageCircle size={32} className="text-white" />
              <h3 className="font-bold text-lg">WhatsApp</h3>
              <p className="text-sm text-red-100">Quick Support</p>
              <p className="text-xs text-red-200">Fast Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;