import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, RefreshCw, CreditCard,
  Smartphone, DollarSign, TrendingUp, Calendar, CheckCircle,
  XCircle, Clock, AlertTriangle, MoreHorizontal, FileText
} from 'lucide-react';
import { format } from 'date-fns';

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: 'M-Pesa' | 'Card' | 'Bank Transfer' | 'Cash' | 'PayPal';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
  completedAt?: string;
  description: string;
  fees: number;
  netAmount: number;
}

const PaymentsManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Mock data
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: 'PAY-001',
        orderId: 'ORD-001',
        customer: 'John Doe',
        amount: 129200,
        method: 'M-Pesa',
        status: 'completed',
        transactionId: 'MP240115001',
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T10:31:00Z',
        description: 'Gaming Laptop + Wireless Mouse',
        fees: 1292,
        netAmount: 127908
      },
      {
        id: 'PAY-002',
        orderId: 'ORD-002',
        customer: 'Jane Smith',
        amount: 165000,
        method: 'Card',
        status: 'completed',
        transactionId: 'CARD240114001',
        createdAt: '2024-01-14T15:45:00Z',
        completedAt: '2024-01-14T15:46:00Z',
        description: 'iPhone 15 Pro',
        fees: 4950,
        netAmount: 160050
      },
      {
        id: 'PAY-003',
        orderId: 'ORD-003',
        customer: 'Mike Johnson',
        amount: 63500,
        method: 'M-Pesa',
        status: 'completed',
        transactionId: 'MP240113001',
        createdAt: '2024-01-13T08:20:00Z',
        completedAt: '2024-01-13T08:21:00Z',
        description: 'Wireless Headphones + USB-C Cables',
        fees: 635,
        netAmount: 62865
      },
      {
        id: 'PAY-004',
        orderId: 'ORD-004',
        customer: 'Sarah Wilson',
        amount: 6500,
        method: 'Cash',
        status: 'pending',
        transactionId: 'CASH240115001',
        createdAt: '2024-01-15T16:10:00Z',
        description: 'Gaming Controller',
        fees: 0,
        netAmount: 6500
      },
      {
        id: 'PAY-005',
        orderId: 'ORD-005',
        customer: 'David Brown',
        amount: 45000,
        method: 'Bank Transfer',
        status: 'failed',
        transactionId: 'BT240115001',
        createdAt: '2024-01-15T12:00:00Z',
        description: 'Mechanical Keyboard',
        fees: 450,
        netAmount: 44550
      }
    ];
    
    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Method filter
    if (methodFilter !== 'all') {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'customer':
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
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

    setFilteredPayments(filtered);
  }, [payments, searchTerm, methodFilter, statusFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'refunded': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'failed': return <XCircle size={16} />;
      case 'refunded': return <RefreshCw size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'M-Pesa': return <Smartphone className="text-green-400" size={18} />;
      case 'Card': return <CreditCard className="text-blue-400" size={18} />;
      case 'Bank Transfer': return <DollarSign className="text-purple-400" size={18} />;
      case 'PayPal': return <DollarSign className="text-blue-600" size={18} />;
      case 'Cash': return <DollarSign className="text-gray-400" size={18} />;
      default: return <DollarSign className="text-gray-400" size={18} />;
    }
  };

  const paymentStats = {
    totalPayments: payments.length,
    totalAmount: payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0),
    totalFees: payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.fees, 0),
    netAmount: payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.netAmount, 0),
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    refunded: payments.filter(p => p.status === 'refunded').length
  };

  const methodBreakdown = {
    'M-Pesa': payments.filter(p => p.method === 'M-Pesa' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    'Card': payments.filter(p => p.method === 'Card' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    'Bank Transfer': payments.filter(p => p.method === 'Bank Transfer' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    'Cash': payments.filter(p => p.method === 'Cash' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    'PayPal': payments.filter(p => p.method === 'PayPal' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Payments Management</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw size={18} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
        >
          <div className="text-center">
            <FileText className="text-blue-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{paymentStats.totalPayments}</p>
            <p className="text-gray-300 text-sm">Total Payments</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-emerald-500/10 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20"
        >
          <div className="text-center">
            <TrendingUp className="text-emerald-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-emerald-400">
              KES {paymentStats.totalAmount.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Total Amount</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-500/10 backdrop-blur-md rounded-xl p-4 border border-green-500/20"
        >
          <div className="text-center">
            <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-400">{paymentStats.completed}</p>
            <p className="text-gray-300 text-sm">Completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-500/10 backdrop-blur-md rounded-xl p-4 border border-yellow-500/20"
        >
          <div className="text-center">
            <Clock className="text-yellow-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-yellow-400">{paymentStats.pending}</p>
            <p className="text-gray-300 text-sm">Pending</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20"
        >
          <div className="text-center">
            <XCircle className="text-red-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-400">{paymentStats.failed}</p>
            <p className="text-gray-300 text-sm">Failed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-500/10 backdrop-blur-md rounded-xl p-4 border border-blue-500/20"
        >
          <div className="text-center">
            <RefreshCw className="text-blue-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-400">{paymentStats.refunded}</p>
            <p className="text-gray-300 text-sm">Refunded</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-orange-500/10 backdrop-blur-md rounded-xl p-4 border border-orange-500/20"
        >
          <div className="text-center">
            <DollarSign className="text-orange-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-orange-400">
              KES {paymentStats.totalFees.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Total Fees</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20"
        >
          <div className="text-center">
            <TrendingUp className="text-purple-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-purple-400">
              KES {paymentStats.netAmount.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Net Amount</p>
          </div>
        </motion.div>
      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Methods Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(methodBreakdown).map(([method, amount], index) => (
            <motion.div
              key={method}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                {getMethodIcon(method)}
              </div>
              <p className="text-white font-semibold">{method}</p>
              <p className="text-green-400 font-bold">KES {amount.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Methods</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="customer">Sort by Customer</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Payment ID</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Customer</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Order</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Amount</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Method</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Status</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Date</th>
                <th className="text-left text-gray-300 py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="text-blue-400 font-medium">{payment.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white font-medium">{payment.customer}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-purple-400 font-medium">{payment.orderId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-green-400 font-bold">KES {payment.amount.toLocaleString()}</p>
                      {payment.fees > 0 && (
                        <p className="text-gray-400 text-sm">Fee: KES {payment.fees.toLocaleString()}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-white">{payment.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="capitalize text-xs font-semibold">{payment.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="text-gray-300">{format(new Date(payment.createdAt), 'MMM dd, yyyy')}</p>
                      <p className="text-gray-400">{format(new Date(payment.createdAt), 'HH:mm')}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
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

      {/* Payment Details Modal */}
      {selectedPayment && (
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
              <h3 className="text-xl font-bold text-white">Payment Details - {selectedPayment.id}</h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Payment Status */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Payment Status</h4>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(selectedPayment.status)}`}>
                    {getStatusIcon(selectedPayment.status)}
                    <span className="capitalize font-semibold">{selectedPayment.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Transaction ID</p>
                    <p className="text-white font-mono">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Order ID</p>
                    <p className="text-purple-400 font-medium">{selectedPayment.orderId}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Payment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Customer</p>
                    <p className="text-white font-medium">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(selectedPayment.method)}
                      <span className="text-white">{selectedPayment.method}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Description</p>
                    <p className="text-white">{selectedPayment.description}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Created</p>
                    <p className="text-white">{format(new Date(selectedPayment.createdAt), 'PPpp')}</p>
                  </div>
                  {selectedPayment.completedAt && (
                    <div>
                      <p className="text-gray-400 text-sm">Completed</p>
                      <p className="text-white">{format(new Date(selectedPayment.completedAt), 'PPpp')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Financial Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Amount</span>
                    <span className="text-green-400 font-bold text-lg">KES {selectedPayment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Processing Fees</span>
                    <span className="text-orange-400 font-medium">- KES {selectedPayment.fees.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Net Amount</span>
                      <span className="text-blue-400 font-bold text-xl">KES {selectedPayment.netAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {selectedPayment.status === 'completed' && (
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <RefreshCw size={18} />
                    <span>Refund</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Download size={18} />
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentsManagement;