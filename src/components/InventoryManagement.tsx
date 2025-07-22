import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Plus, Edit, Trash2, AlertTriangle,
  Package, TrendingUp, TrendingDown, BarChart3, RefreshCw,
  Upload, Eye, MoreHorizontal, Zap, Clock
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
  image?: string;
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  useEffect(() => {
    const mockInventory: InventoryItem[] = [
      {
        id: 'INV-001',
        name: 'Gaming Laptop ASUS ROG',
        sku: 'ASUS-ROG-001',
        category: 'Computers & Laptops',
        currentStock: 15,
        minStock: 5,
        maxStock: 50,
        unitPrice: 125000,
        totalValue: 1875000,
        supplier: 'ASUS Kenya',
        lastRestocked: '2024-01-10T10:30:00Z',
        status: 'in-stock'
      },
      {
        id: 'INV-002',
        name: 'Wireless Gaming Mouse',
        sku: 'LOG-G502-001',
        category: 'Gaming Accessories',
        currentStock: 3,
        minStock: 10,
        maxStock: 100,
        unitPrice: 4200,
        totalValue: 12600,
        supplier: 'Logitech Distributors',
        lastRestocked: '2024-01-05T14:20:00Z',
        status: 'low-stock'
      },
      {
        id: 'INV-003',
        name: 'iPhone 15 Pro Max',
        sku: 'APPL-IP15PM-001',
        category: 'Mobile Phones',
        currentStock: 0,
        minStock: 5,
        maxStock: 30,
        unitPrice: 165000,
        totalValue: 0,
        supplier: 'Apple Kenya',
        lastRestocked: '2023-12-20T09:15:00Z',
        status: 'out-of-stock'
      },
      {
        id: 'INV-004',
        name: 'USB-C Cables',
        sku: 'CABLE-USBC-001',
        category: 'Cables & Adapters',
        currentStock: 150,
        minStock: 20,
        maxStock: 100,
        unitPrice: 2500,
        totalValue: 375000,
        supplier: 'Tech Accessories Ltd',
        lastRestocked: '2024-01-12T16:45:00Z',
        status: 'overstocked'
      },
      {
        id: 'INV-005',
        name: 'Wireless Headphones Sony',
        sku: 'SONY-WH1000XM5',
        category: 'Audio & Headphones',
        currentStock: 25,
        minStock: 10,
        maxStock: 50,
        unitPrice: 28000,
        totalValue: 700000,
        supplier: 'Sony Electronics',
        lastRestocked: '2024-01-08T11:20:00Z',
        status: 'in-stock'
      }
    ];
    
    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = inventory;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'stock':
          aValue = a.currentStock;
          bValue = b.currentStock;
          break;
        case 'value':
          aValue = a.totalValue;
          bValue = b.totalValue;
          break;
        case 'lastRestocked':
          aValue = new Date(a.lastRestocked).getTime();
          bValue = new Date(b.lastRestocked).getTime();
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

    setFilteredInventory(filtered);
  }, [inventory, searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'low-stock': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'out-of-stock': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'overstocked': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <Package className="text-green-400" size={16} />;
      case 'low-stock': return <AlertTriangle className="text-yellow-400" size={16} />;
      case 'out-of-stock': return <AlertTriangle className="text-red-400" size={16} />;
      case 'overstocked': return <TrendingUp className="text-blue-400" size={16} />;
      default: return <Package className="text-gray-400" size={16} />;
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const inventoryStats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, item) => sum + item.totalValue, 0),
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    inStock: inventory.filter(item => item.status === 'in-stock').length,
    overstocked: inventory.filter(item => item.status === 'overstocked').length
  };

  const categories = [...new Set(inventory.map(item => item.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            <span>Add Item</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Upload size={18} />
            <span>Import</span>
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
            <Package className="text-blue-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{inventoryStats.totalItems}</p>
            <p className="text-gray-300 text-sm">Total Items</p>
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
              KES {inventoryStats.totalValue.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Total Value</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-500/10 backdrop-blur-md rounded-xl p-4 border border-green-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{inventoryStats.inStock}</p>
            <p className="text-gray-300 text-sm">In Stock</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-500/10 backdrop-blur-md rounded-xl p-4 border border-yellow-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{inventoryStats.lowStock}</p>
            <p className="text-gray-300 text-sm">Low Stock</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{inventoryStats.outOfStock}</p>
            <p className="text-gray-300 text-sm">Out of Stock</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-500/10 backdrop-blur-md rounded-xl p-4 border border-blue-500/20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{inventoryStats.overstocked}</p>
            <p className="text-gray-300 text-sm">Overstocked</p>
          </div>
        </motion.div>
      </div>

      {/* Alerts */}
      {(inventoryStats.lowStock > 0 || inventoryStats.outOfStock > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-red-400" size={24} />
            <div>
              <h3 className="text-red-400 font-semibold">Inventory Alerts</h3>
              <p className="text-gray-300 text-sm">
                {inventoryStats.outOfStock > 0 && `${inventoryStats.outOfStock} items out of stock. `}
                {inventoryStats.lowStock > 0 && `${inventoryStats.lowStock} items running low.`}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="overstocked">Overstocked</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
            <option value="value">Sort by Value</option>
            <option value="lastRestocked">Sort by Last Restocked</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredInventory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            {/* Item Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-gray-400 text-sm">SKU: {item.sku}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Eye size={16} />
                </button>
                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <Edit size={16} />
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border mb-4 ${getStatusColor(item.status)}`}>
              {getStatusIcon(item.status)}
              <span className="capitalize text-xs font-semibold">{item.status.replace('-', ' ')}</span>
            </div>

            {/* Stock Information */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300 text-sm">Current Stock</span>
                  <span className="text-white font-bold">{item.currentStock}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'out-of-stock' ? 'bg-red-500' :
                      item.status === 'low-stock' ? 'bg-yellow-500' :
                      item.status === 'overstocked' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                  <span>Min: {item.minStock}</span>
                  <span>Max: {item.maxStock}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">Unit Price</p>
                  <p className="text-green-400 font-bold">KES {item.unitPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Value</p>
                  <p className="text-blue-400 font-bold">KES {item.totalValue.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Supplier</p>
                <p className="text-white text-sm">{item.supplier}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Last Restocked</p>
                <p className="text-white text-sm">{new Date(item.lastRestocked).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/10">
              <button className="flex-1 bg-blue-500/20 text-blue-400 py-2 px-3 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
                Restock
              </button>
              <button className="flex-1 bg-green-500/20 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium">
                Adjust
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
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
              <h3 className="text-xl font-bold text-white">Inventory Item Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Item Info */}
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">{selectedItem.name}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">SKU</p>
                    <p className="text-white">{selectedItem.sku}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white">{selectedItem.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Supplier</p>
                    <p className="text-white">{selectedItem.supplier}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(selectedItem.status)}`}>
                      {getStatusIcon(selectedItem.status)}
                      <span className="capitalize text-xs font-semibold">{selectedItem.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Details */}
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Stock Information</h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{selectedItem.currentStock}</p>
                    <p className="text-gray-400 text-sm">Current Stock</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{selectedItem.minStock}</p>
                    <p className="text-gray-400 text-sm">Minimum Stock</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{selectedItem.maxStock}</p>
                    <p className="text-gray-400 text-sm">Maximum Stock</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      selectedItem.status === 'out-of-stock' ? 'bg-red-500' :
                      selectedItem.status === 'low-stock' ? 'bg-yellow-500' :
                      selectedItem.status === 'overstocked' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${getStockPercentage(selectedItem.currentStock, selectedItem.maxStock)}%` }}
                  ></div>
                </div>
                <p className="text-center text-gray-400 text-sm">
                  {Math.round(getStockPercentage(selectedItem.currentStock, selectedItem.maxStock))}% of maximum capacity
                </p>
              </div>

              {/* Financial Info */}
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Financial Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Unit Price</p>
                    <p className="text-green-400 font-bold text-xl">KES {selectedItem.unitPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Value</p>
                    <p className="text-blue-400 font-bold text-xl">KES {selectedItem.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <RefreshCw size={18} />
                  <span>Restock</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Edit size={18} />
                  <span>Edit Item</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <BarChart3 size={18} />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InventoryManagement;