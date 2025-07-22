import React, { useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { gsap } from 'gsap';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  total
}) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && cartRef.current && backdropRef.current) {
      // Animate cart opening
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(cartRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: "power3.out" }
      );

      // Animate cart items
      const items = cartRef.current.querySelectorAll('.cart-item');
      gsap.fromTo(items,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen, cartItems]);

  const handleClose = () => {
    if (cartRef.current && backdropRef.current) {
      gsap.to(cartRef.current, {
        x: '100%',
        duration: 0.3,
        ease: "power3.in"
      });
      
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={handleClose} 
      />
      
      {/* Cart Drawer */}
      <div 
        ref={cartRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <ShoppingBag size={24} />
              <span>Your Cart</span>
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="cart-item bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-semibold text-sm truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-red-500 font-bold text-sm mt-1">
                          KES {item.product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 rounded bg-red-500 hover:bg-red-600 text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-gray-900 font-semibold px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 rounded bg-red-500 hover:bg-red-600 text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 text-sm font-medium transition-all duration-300 transform hover:scale-105"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-red-500">
                  KES {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;