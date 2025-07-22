import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onWishlistToggle?: (product: Product) => void;
  isInWishlist?: (productId: string) => boolean;
  isAuthenticated?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onAddToCart, 
  onWishlistToggle,
  isInWishlist,
  isAuthenticated 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    'All',
    'Electronics',
    'Computers & Laptops',
    'Networking Equipment',
    'Gaming Accessories',
    'Mobile Phones',
    'Audio & Headphones',
    'Cables & Adapters',
    'Storage Devices'
  ];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const displayProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 5);

  const featuredProducts = products.slice(0, 8);
  const bestSellingProducts = products.slice(2, 6);

  useEffect(() => {
    // Animate section entrance
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate product cards
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [displayProducts, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAllProducts(false);
    
    // Animate category change
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    }
  };

  const handleViewAllProducts = () => {
    setShowAllProducts(true);
    
    // Animate new products appearing
    setTimeout(() => {
      if (cardsRef.current) {
        const newCards = Array.from(cardsRef.current.children).slice(5);
        gsap.fromTo(newCards,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      }
    }, 50);
  };

  const handleWishlistClick = (product: Product) => {
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  return (
    <section ref={sectionRef} id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-4 h-8 bg-red-500 rounded"></div>
            <h2 ref={titleRef} className="text-2xl font-bold text-gray-900">Browse by Category</h2>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {displayProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative bg-gray-100 rounded-t-lg p-6 overflow-hidden">
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                    NEW
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => handleWishlistClick(product)}
                      className={`p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-110 ${
                        isInWishlist && isInWishlist(product.id) ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-red-500 transition-all transform hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-105"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold">KES {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(65)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products Button */}
          {!showAllProducts && filteredProducts.length > 5 && (
            <div className="text-center">
              <button
                onClick={handleViewAllProducts}
                className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Products ({filteredProducts.length})
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllProducts && (
            <div className="text-center">
              <button
                onClick={() => setShowAllProducts(false)}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Show Less
              </button>
            </div>
          )}
        </div>

        {/* Explore Our Products Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-8 bg-red-500 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                <ArrowLeft size={20} />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-8">Explore Our Products</h3>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative bg-gray-100 rounded-t-lg p-6 overflow-hidden">
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                    NEW
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => handleWishlistClick(product)}
                      className={`p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-110 ${
                        isInWishlist && isInWishlist(product.id) ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-red-500 transition-all transform hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-105"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold">KES {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(65)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCategoryChange('All')}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-8 bg-red-500 rounded"></div>
              <h2 className="text-lg text-red-500 font-bold">This Month</h2>
            </div>
            <button
              onClick={() => handleCategoryChange('All')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              View All
            </button>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-8">Best Selling Products</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative bg-gray-100 rounded-t-lg p-6 overflow-hidden">
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => handleWishlistClick(product)}
                      className={`p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-110 ${
                        isInWishlist && isInWishlist(product.id) ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-red-500 transition-all transform hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-105"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold">KES {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(88)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">FAST DELIVERY</h3>
                <p className="text-sm text-gray-600">Quick and reliable delivery service</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 CUSTOMER SERVICE</h3>
                <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">MONEY BACK GUARANTEE</h3>
                <p className="text-sm text-gray-600">We return money within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;