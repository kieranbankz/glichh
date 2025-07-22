import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import FAQ from './components/FAQ';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import MyAccount from './components/MyAccount';
import Wishlist from './components/Wishlist';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { useAdminAuth } from './hooks/useAdminAuth';
import { useWishlist } from './hooks/useWishlist';
import { useProducts } from './hooks/useProducts';
import { useOrders } from './hooks/useOrders';
import { Customer } from './types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentView, setCurrentView] = useState<'shop' | 'checkout' | 'dashboard' | 'allProducts' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq' | 'login' | 'account' | 'wishlist'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const { user, isLoading: authLoading, login, register, logout, updateProfile, isAuthenticated, signInWithGoogle } = useAuth();
  const { adminUser, isLoading: adminLoading, login: adminLogin, logout: adminLogout, isAuthenticated: isAdminAuthenticated } = useAdminAuth();
  const { products, isLoading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { createOrder } = useOrders(user?.id);
  
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();
  
  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  } = useWishlist(user?.id);

  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Create smooth scroll effect
    gsap.to("body", {
      scrollBehavior: "smooth"
    });

    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for hero section
    gsap.to(".hero-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = async (customer: Customer) => {
    const order = await createOrder(cartItems, customer, user?.id);
    
    if (order) {
      alert(`Thank you ${customer.name}! Your order #${order.id.slice(0, 8)} has been placed. We'll contact you at ${customer.phone} to confirm delivery.`);
      clearCart();
      setCurrentView('shop');
    } else {
      alert('There was an error processing your order. Please try again.');
    }
  };

  const handleAddProduct = async (newProduct: Omit<any, 'id'>) => {
    await addProduct(newProduct);
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<any>) => {
    await updateProduct(id, updatedProduct);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    
    // Add a nice animation feedback
    const button = event?.target as HTMLElement;
    if (button) {
      gsap.to(button, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  };

  const handleWishlistToggle = async (product: any) => {
    if (!isAuthenticated) {
      setCurrentView('login');
      return;
    }
    
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const handleViewAllProducts = () => {
    setCurrentView('allProducts');
    setSelectedCategory('All');
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'home':
        setCurrentView('shop');
        break;
      case 'about':
        setCurrentView('about');
        break;
      case 'contact':
        setCurrentView('contact');
        break;
      case 'privacy':
        setCurrentView('privacy');
        break;
      case 'terms':
        setCurrentView('terms');
        break;
      case 'faq':
        setCurrentView('faq');
        break;
      default:
        setCurrentView('shop');
    }
  };

  const handleAccountAction = (action: string) => {
    switch (action) {
      case 'account':
        if (isAuthenticated) {
          setCurrentView('account');
        } else {
          setCurrentView('login');
        }
        break;
      case 'login':
        setCurrentView('login');
        break;
      case 'cart':
        setIsCartOpen(true);
        break;
      case 'wishlist':
        if (isAuthenticated) {
          setCurrentView('wishlist');
        } else {
          setCurrentView('login');
        }
        break;
      case 'shop':
        setCurrentView('shop');
        break;
      case 'allProducts':
        setCurrentView('allProducts');
        setSelectedCategory('All');
        break;
      case 'logout':
        logout();
        setCurrentView('shop');
        break;
    }
  };

  // Check if we should show dashboard (simple check - in real app you'd have proper auth)
  const showDashboard = window.location.hash === '#dashboard' || window.location.pathname === '/admin';

  if (showDashboard) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLogin={adminLogin}
          isLoading={adminLoading}
        />
      );
    }

    return (
      <Dashboard
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        adminUser={adminUser}
        onAdminLogout={adminLogout}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login
        onBack={handleBackToShop}
        onLogin={login}
        onRegister={register}
        onGoogleSignIn={signInWithGoogle}
        isLoading={authLoading}
      />
    );
  }

  if (currentView === 'account' && isAuthenticated && user) {
    return (
      <MyAccount
        user={user}
        onBack={handleBackToShop}
        onUpdateProfile={updateProfile}
        onLogout={() => {
          logout();
          setCurrentView('shop');
        }}
      />
    );
  }

  if (currentView === 'wishlist' && isAuthenticated) {
    return (
      <Wishlist
        wishlistItems={wishlistItems}
        onBack={handleBackToShop}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentView === 'about') {
    return <About onBack={handleBackToShop} />;
  }

  if (currentView === 'contact') {
    return <Contact onBack={handleBackToShop} />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicy onBack={handleBackToShop} />;
  }

  if (currentView === 'terms') {
    return <TermsOfUse onBack={handleBackToShop} />;
  }

  if (currentView === 'faq') {
    return <FAQ onBack={handleBackToShop} />;
  }

  if (currentView === 'checkout') {
    return (
      <Checkout
        cartItems={cartItems}
        total={getCartTotal()}
        onBack={() => setCurrentView('shop')}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === 'allProducts') {
    const filteredProducts = selectedCategory === 'All' 
      ? products 
      : products.filter(p => p.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          cartItemsCount={getCartItemsCount()} 
          onCartClick={() => setIsCartOpen(true)}
          onNavigate={handleNavigation}
          user={user}
          onAccountAction={handleAccountAction}
        />
        
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button and Title */}
            <div className="mb-8">
              <button
                onClick={handleBackToShop}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Shop</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600">Browse our complete collection of tech products</p>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {['All', 'Electronics', 'Computers & Laptops', 'Networking Equipment', 'Gaming Accessories', 'Mobile Phones', 'Audio & Headphones', 'Cables & Adapters', 'Storage Devices'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500 border border-gray-200'
                    }`}
                  >
                    {category} ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative bg-gray-100 rounded-t-lg p-6 overflow-hidden">
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                      NEW
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <button 
                        onClick={() => handleWishlistToggle(product)}
                        className={`p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-110 ${
                          isInWishlist(product.id) ? 'text-red-500' : 'hover:text-red-500'
                        }`}
                      >
                        <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
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
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-105"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-red-500 font-bold">KES {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">(65)</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && !productsLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            )}

            {productsLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            )}
          </div>
        </main>
        
        <Footer onNavigate={handleNavigation} onAccountAction={handleAccountAction} />
        
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
          total={getCartTotal()}
        />
        
        <WhatsAppButton />
      </div>
    );
  }

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Glich Solutions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getCartItemsCount()} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigation}
        user={user}
        onAccountAction={handleAccountAction}
      />
      
      <main>
        <Hero onViewAllProducts={handleViewAllProducts} />
        <ProductGrid 
          products={products} 
          onAddToCart={handleAddToCart}
          onWishlistToggle={handleWishlistToggle}
          isInWishlist={isInWishlist}
          isAuthenticated={isAuthenticated}
        />
      </main>
      
      <Footer onNavigate={handleNavigation} onAccountAction={handleAccountAction} />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
        total={getCartTotal()}
      />
      
      <WhatsAppButton />
    </div>
  );
}

export default App;