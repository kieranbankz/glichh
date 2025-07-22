import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, Search, Heart, User, ChevronDown, X } from 'lucide-react';
import { User as UserType } from '../types';
import { gsap } from 'gsap';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onNavigate?: (page: string) => void;
  user?: UserType | null;
  onAccountAction?: (action: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onNavigate, user, onAccountAction }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Header entrance animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Logo animation
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
      );
    }

    // Cart bounce animation when count changes
    const cartButton = document.querySelector('.cart-button');
    if (cartButton && cartItemsCount > 0) {
      gsap.to(cartButton, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  }, [cartItemsCount]);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setShowMobileMenu(false);
  };

  const handleAccountAction = (action: string) => {
    if (onAccountAction) {
      onAccountAction(action);
    }
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleViewAllProducts = () => {
    if (onAccountAction) {
      onAccountAction('allProducts');
    }
    setShowMobileMenu(false);
  };

  const menuItems = [
    { label: 'Home', action: () => handleNavigation('home') },
    { label: 'All Products', action: handleViewAllProducts },
    { label: 'About', action: () => handleNavigation('about') },
    { label: 'Contact', action: () => handleNavigation('contact') },
    { label: 'FAQ', action: () => handleNavigation('faq') },
    { label: 'Privacy Policy', action: () => handleNavigation('privacy') },
    { label: 'Terms of Use', action: () => handleNavigation('terms') },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>July Sale For All Tech Products with Express Delivery - OFF 13%!</span>
              <button 
                onClick={handleViewAllProducts}
                className="underline hover:no-underline transition-all duration-300 hover:text-red-300"
              >
                ShopNow
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span>English</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header ref={headerRef} className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                ref={logoRef}
                src="/G S_20250611_183737_0000 (1) copy.png"
                alt="Glich Solutions" 
                className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-gray-900 hover:text-red-500 transition-all duration-300 border-b-2 border-red-500 pb-1 font-semibold transform hover:scale-105"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-gray-700 hover:text-red-500 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Contact
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-700 hover:text-red-500 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                About
              </button>
              {!user && (
                <button 
                  onClick={() => handleAccountAction('login')}
                  className="text-gray-700 hover:text-red-500 transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Sign Up
                </button>
              )}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'} hidden md:block`}>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => handleAccountAction('wishlist')}
                  className="p-2 text-gray-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Heart size={20} />
                </button>
                
                <button
                  onClick={onCartClick}
                  className="cart-button relative p-2 text-gray-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="relative hidden md:block">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-gray-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110 flex items-center space-x-1"
                  >
                    <User size={20} />
                    {user && <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {user ? (
                        <>
                          <button
                            onClick={() => handleAccountAction('account')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            My Account
                          </button>
                          <button
                            onClick={() => handleAccountAction('wishlist')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            Wishlist
                          </button>
                          <button
                            onClick={() => handleAccountAction('cart')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            Cart
                          </button>
                          <hr className="my-2" />
                          <button
                            onClick={() => handleAccountAction('logout')}
                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccountAction('login')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            Login
                          </button>
                          <button
                            onClick={() => handleAccountAction('login')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            Register
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-gray-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => window.location.hash = '#dashboard'}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
              >
                Admin Dashboard
              </button>
            </div>

            {/* User Actions */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {user ? (
                <>
                  <button
                    onClick={() => handleAccountAction('account')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => handleAccountAction('wishlist')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => handleAccountAction('logout')}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAccountAction('login')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAccountAction('login')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors rounded-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;