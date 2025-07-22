import React, { useRef, useEffect } from 'react';
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { WishlistItem, Product } from '../types';
import { gsap } from 'gsap';

interface WishlistProps {
  wishlistItems: WishlistItem[];
  onBack: () => void;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  wishlistItems, 
  onBack, 
  onRemoveFromWishlist, 
  onAddToCart 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current && wishlistItems.length > 0) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [wishlistItems]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Heart className="text-red-500 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="text-gray-300 mx-auto mb-6" size={64} />
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love to buy them later</p>
            <button
              onClick={onBack}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative bg-gray-100 rounded-t-lg p-6 overflow-hidden">
                  <button
                    onClick={() => onRemoveFromWishlist(item.product_id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-red-500 transition-all transform hover:scale-110 z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onAddToCart(item.product)}
                    className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={16} />
                    <span>Add To Cart</span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-500 font-bold">KES {item.product.price.toLocaleString()}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.product.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Added {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;