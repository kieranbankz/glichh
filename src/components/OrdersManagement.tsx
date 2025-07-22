import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, Edit, Truck, CheckCircle, 
  XCircle, Clock, Package, MapPin, Phone, Mail, Calendar,
  ArrowUp, ArrowDown, MoreHorizontal, RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+254712345678',
          address: 'Malindi, Kilifi County'
        },
        items: [
          { name: 'Gaming Laptop', quantity: 1, price: 125000 },
          { name: 'Wireless Mouse', quantity: 1, price: 4200 }
        ],
        total: 129200,
        status: 'processing',
        paymentMethod: 'M-Pesa',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T14:20:00Z'
      },
      {
        id: 'ORD-002',
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+254723456789',
          address: 'Watamu, Kilifi County'
        },
        items: [
          { name: 'iPhone 15 Pro', quantity: 1, price: 165000 }
        ],
        total: 165000,
        status: 'shipped',
        paymentMethod: 'Card',
        createdAt: '2024-01-14T15:45:00Z',
        updatedAt: '2024-01-15T09:15:00Z'
      },
      {
        id: 'ORD-003',
        customer: {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+254734567890',
          address: 'Gede, Kilifi County'
        },
        items: [
          { name: 'Wireless Headphones', quantity: 2, price: 28000 },
          { name: 'USB-C Cable', quantity: 3, price: 2500 }
        ],
        total: 63500,
        status: 'delivered',
        paymentMethod: 'M-Pesa',
        createdAt: '2024-01-13T08:20:00Z',
        updatedAt: '2024-01-14T16:30:00Z'
      },
      {
        id: 'ORD-004',
        customer: {
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+254745678901',
          address: 'Malindi Town, Kilifi County'
        },
        items: [
          { name: 'Gaming Controller', quantity: 1, price: 6500 }
        ],
        total: 6500,
        status: 'pending',
        paymentMethod: 'Cash',
        createdAt: '2024-01-15T16:10:00Z',
        updatedAt: '2024-01-15T16:10:00Z'
      }
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'customer':
          aValue = a.customer.name.toLowerCase();
          bValue = b.customer.name.toLowerCase();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'processing': return <RefreshCw size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Orders Management</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{orderStats.total}</p>
            <p className="text-gray-300 text-sm">Total Orders</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-500/10 backdrop-blur-md rounded-xl p-4 border border-yellow-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{orderStats.pending}</p>
            <p className="text-gray-300 text-sm">Pending</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-500/10 backdrop-blur-md rounded-xl p-4 border border-blue-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{orderStats.processing}</p>
            <p className="text-gray-300 text-sm">Processing</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{orderStats.shipped}</p>
            <p className="text-gray-300 text-sm">Shipped</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-500/10 backdrop-blur-md rounded-xl p-4 border border-green-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{orderStats.delivered}</p>
            <p className="text-gray-300 text-sm">Delivered</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{orderStats.cancelled}</p>
            <p className="text-gray-300 text-sm">Cancelled</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-emerald-500/10 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20"
        >
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-400">
              KES {orderStats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Revenue</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
            <option value="customer">Sort by Customer</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            {sortOrder === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Order ID</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Customer</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Items</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Total</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Status</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Payment</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Date</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="text-blue-400 font-medium">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">{order.customer.name}</p>
                      <p className="text-gray-400 text-sm">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-gray-300">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-400 font-bold">
                      KES {order.total.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)} bg-transparent focus:outline-none`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{order.paymentMethod}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="text-gray-300">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
                      <p className="text-gray-400">{format(new Date(order.createdAt), 'HH:mm')}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-green-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Phone</p>
                      <p className="text-white">{selectedOrder.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 md:col-span-2">
                    <MapPin className="text-red-400" size={18} />
                    <div>
                      <p className="text-gray-300 text-sm">Address</p>
                      <p className="text-white">{selectedOrder.customer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">KES {item.price.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Each</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-xl font-bold text-green-400">
                      KES {selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Status & Timeline */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Order Status</h4>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status}</span>
                  </div>
                  <span className="text-gray-400">Payment: {selectedOrder.paymentMethod}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-300">Created</p>
                    <p className="text-white">{format(new Date(selectedOrder.createdAt), 'PPpp')}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Last Updated</p>
                    <p className="text-white">{format(new Date(selectedOrder.updatedAt), 'PPpp')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default OrdersManagement;