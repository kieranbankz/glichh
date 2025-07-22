import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import { CartItem, Customer } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  total: number;
  onBack: () => void;
  onOrderComplete: (customer: Customer) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, total, onBack, onOrderComplete }) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Malindi'
  });

  const deliveryFee = 200;
  const finalTotal = total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderComplete(customer);
  };

  const handleInputChange = (field: keyof Customer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <CreditCard size={24} />
              <span>Customer Information</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="07XXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <textarea
                    required
                    value={customer.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
                    rows={3}
                    placeholder="Enter your delivery address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="City"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-4 px-6 rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold text-lg"
              >
                Place Order - KES {finalTotal.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-sm">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Qty: {item.quantity} × KES {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-red-500 font-bold">
                    KES {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">KES {total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-lg mt-2">
                <span className="text-gray-600">Delivery:</span>
                <span className="text-red-500 font-semibold">KES {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-bold mt-4 pt-4 border-t border-gray-200">
                <span className="text-gray-900">Total:</span>
                <span className="text-red-500">
                  KES {finalTotal.toLocaleString()}
                </span>
              </div>
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-600 text-sm">
                  <strong>Delivery Info:</strong> KES 200 delivery charge applies to all orders within Malindi and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;