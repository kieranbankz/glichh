import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onAccountAction?: (action: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onAccountAction }) => {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleAccountAction = (action: string) => {
    if (onAccountAction) {
      onAccountAction(action);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h3 className="text-xl font-bold">Glich Solutions</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Your trusted IT and electronics partner in Malindi. Quality products, expert services, competitive prices.
            </p>
            <h4 className="text-lg font-semibold mb-4">Get Updates</h4>
            <p className="text-gray-300 mb-4">Stay informed about our latest products and offers</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/254720111889" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="flex-shrink-0 mt-1" size={16} />
                <span className="text-sm">Jamhuri Street, Malindi<br />Near Izumi Autospares</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="flex-shrink-0" size={16} />
                <span className="text-sm">info@glichsolutions.co.ke</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="flex-shrink-0" size={16} />
                <span className="text-sm">0720111889</span>
              </div>
              <div className="text-sm">
                <p className="text-red-400 font-semibold">Delivery: KES 200</p>
                <p className="text-xs text-gray-400">Within Malindi and surrounding areas</p>
              </div>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Account</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => handleAccountAction('account')}
                  className="hover:text-white transition-colors text-left"
                >
                  My Account
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAccountAction('login')}
                  className="hover:text-white transition-colors text-left"
                >
                  Login / Register
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAccountAction('cart')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cart
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAccountAction('wishlist')}
                  className="hover:text-white transition-colors text-left"
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAccountAction('shop')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shop
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Link</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => handleNavigation('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms Of Use
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>• Computer Repairs</li>
              <li>• Network Installation</li>
              <li>• Data Recovery</li>
              <li>• IT Consultation</li>
              <li>• Hardware Sales</li>
              <li>• Software Support</li>
            </ul>
            <div className="mt-6 p-3 bg-red-500/20 rounded-lg">
              <p className="text-red-400 font-semibold text-sm">24/7 Emergency Support</p>
              <p className="text-xs text-gray-300">For critical business systems</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © Copyright Glich Solutions 2025. All rights reserved | Made by <span className="text-red-500 font-semibold">Zamu Interactive</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;