import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, Edit, Mail, Phone, MapPin,
  Calendar, Star, Heart, ShoppingBag, TrendingUp, Users,
  MoreHorizontal, UserPlus, Ban, CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  joinDate: string;
  lastOrder: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  avatar?: string;
}

const CustomersManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('joinDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock data
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        address: 'Malindi Town',
        city: 'Malindi',
        joinDate: '2023-06-15T10:30:00Z',
        lastOrder: '2024-01-15T14:20:00Z',
        totalOrders: 12,
        totalSpent: 450000,
        status: 'active',
        loyaltyTier: 'gold'
      },
      {
        id: 'CUST-002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+254723456789',
        address: 'Watamu Beach',
        city: 'Watamu',
        joinDate: '2023-08-22T15:45:00Z',
        lastOrder: '2024-01-14T09:15:00Z',
        totalOrders: 8,
        totalSpent: 320000,
        status: 'active',
        loyaltyTier: 'silver'
      },
      {
        id: 'CUST-003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+254734567890',
        address: 'Gede Ruins Area',
        city: 'Gede',
        joinDate: '2023-03-10T08:20:00Z',
        lastOrder: '2024-01-10T16:30:00Z',
        totalOrders: 25,
        totalSpent: 850000,
        status: 'active',
        loyaltyTier: 'platinum'
      },
      {
        id: 'CUST-004',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+254745678901',
        address: 'Kilifi Creek',
        city: 'Kilifi',
        joinDate: '2023-11-05T16:10:00Z',
        lastOrder: '2023-12-20T12:45:00Z',
        totalOrders: 3,
        totalSpent: 95000,
        status: 'inactive',
        loyaltyTier: 'bronze'
      }
    ];
    
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    // Tier filter
    if (tierFilter !== 'all') {
      filtered = filtered.filter(customer => customer.loyaltyTier === tierFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime();
          bValue = new Date(b.joinDate).getTime();
          break;
        case 'totalSpent':
          aValue = a.totalSpent;
          bValue = b.totalSpent;
          break;
        case 'totalOrders':
          aValue = a.totalOrders;
          bValue = b.totalOrders;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter, tierFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'banned': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-600/20 text-amber-400 border-amber-600/30';
      case 'silver': return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'gold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'platinum': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return '💎';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  const updateCustomerStatus = (customerId: string, newStatus: Customer['status']) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: newStatus }
        : customer
    ));
  };

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    banned: customers.filter(c => c.status === 'banned').length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
    avgOrderValue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Customer Management</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus size={18} />
            <span>Add Customer</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
        >
          <div className="text-center">
            <Users className="text-blue-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{customerStats.total}</p>
            <p className="text-gray-300 text-sm">Total Customers</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-500/10 backdrop-blur-md rounded-xl p-4 border border-green-500/20"
        >
          <div className="text-center">
            <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-400">{customerStats.active}</p>
            <p className="text-gray-300 text-sm">Active</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-500/10 backdrop-blur-md rounded-xl p-4 border border-yellow-500/20"
        >
          <div className="text-center">
            <Calendar className="text-yellow-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-yellow-400">{customerStats.inactive}</p>
            <p className="text-gray-300 text-sm">Inactive</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20"
        >
          <div className="text-center">
            <Ban className="text-red-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-400">{customerStats.banned}</p>
            <p className="text-gray-300 text-sm">Banned</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-emerald-500/10 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20"
        >
          <div className="text-center">
            <TrendingUp className="text-emerald-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-emerald-400">
              KES {customerStats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Total Revenue</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20"
        >
          <div className="text-center">
            <ShoppingBag className="text-purple-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-purple-400">
              KES {Math.round(customerStats.avgOrderValue).toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Avg Order Value</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="joinDate">Sort by Join Date</option>
            <option value="totalSpent">Sort by Total Spent</option>
            <option value="totalOrders">Sort by Total Orders</option>
            <option value="name">Sort by Name</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Customer</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Contact</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Location</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Orders</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Total Spent</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Tier</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Status</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{customer.name}</p>
                        <p className="text-gray-400 text-sm">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-gray-400" />
                      <div>
                        <p className="text-gray-300 text-sm">{customer.address}</p>
                        <p className="text-gray-400 text-xs">{customer.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{customer.totalOrders}</p>
                      <p className="text-gray-400 text-xs">orders</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-400 font-bold">
                      KES {customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getTierColor(customer.loyaltyTier)}`}>
                      <span>{getTierIcon(customer.loyaltyTier)}</span>
                      <span className="capitalize text-xs font-semibold">{customer.loyaltyTier}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={customer.status}
                      onChange={(e) => updateCustomerStatus(customer.id, e.target.value as Customer['status'])}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(customer.status)} bg-transparent focus:outline-none`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-500/20 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-3xl border border-white/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Customer Profile</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white">{selectedCustomer.name}</h4>
                  <p className="text-gray-300">{selectedCustomer.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getTierColor(selectedCustomer.loyaltyTier)}`}>
                      <span>{getTierIcon(selectedCustomer.loyaltyTier)}</span>
                      <span className="capitalize text-xs font-semibold">{selectedCustomer.loyaltyTier}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full border ${getStatusColor(selectedCustomer.status)}`}>
                      <span className="capitalize text-xs font-semibold">{selectedCustomer.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <ShoppingBag className="text-blue-400 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-white">{selectedCustomer.totalOrders}</p>
                  <p className="text-gray-300 text-sm">Total Orders</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <TrendingUp className="text-green-400 mx-auto mb-2" size={24} />
                  <p className="text-lg font-bold text-green-400">KES {selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-gray-300 text-sm">Total Spent</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Calendar className="text-purple-400 mx-auto mb-2" size={24} />
                  <p className="text-sm font-bold text-white">{format(new Date(selectedCustomer.joinDate), 'MMM yyyy')}</p>
                  <p className="text-gray-300 text-sm">Member Since</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Star className="text-yellow-400 mx-auto mb-2" size={24} />
                  <p className="text-lg font-bold text-yellow-400">{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()}</p>
                  <p className="text-gray-300 text-sm">Avg Order</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white/5 rounded-lg p-6">
                <h5 className="text-lg font-semibold text-white mb-4">Contact Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-green-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Phone</p>
                      <p className="text-white">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 md:col-span-2">
                    <MapPin className="text-red-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Address</p>
                      <p className="text-white">{selectedCustomer.address}, {selectedCustomer.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail size={18} />
                  <span>Send Email</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Phone size={18} />
                  <span>Call Customer</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomersManagement;