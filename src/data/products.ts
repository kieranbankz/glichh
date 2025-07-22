import { Product } from '../types';

export const products: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'TP-Link Wi-Fi 6 Router AX1800',
    description: 'High-speed wireless router with Wi-Fi 6 technology for seamless connectivity',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Ubiquiti UniFi Access Point',
    description: 'Enterprise-grade wireless access point for professional networks',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Netgear Nighthawk Gaming Router',
    description: 'Ultra-fast gaming router with advanced QoS and Wi-Fi 6E',
    price: 14800,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'D-Link 24-Port Gigabit Switch',
    description: 'Managed Gigabit switch for enterprise network infrastructure',
    price: 11200,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Asus TUF Gaming Laptop Ryzen 7',
    description: 'High-performance gaming laptop with AMD Ryzen 7 processor',
    price: 122000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    category: 'Electronics'
  },

  // Computers & Laptops
  {
    id: '6',
    name: 'Lenovo ThinkCentre Tiny i5 Desktop',
    description: 'Compact desktop computer with Intel i5 processor for business use',
    price: 32999,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop',
    category: 'Computers & Laptops'
  },
  {
    id: '7',
    name: 'Asus TUF Gaming Laptop A15',
    description: 'Powerful gaming laptop with AMD Ryzen 7 and RTX graphics',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    category: 'Computers & Laptops'
  },
  {
    id: '8',
    name: 'HP Pavilion Desktop PC - Ryzen 5',
    description: 'Powerful desktop computer with AMD Ryzen 5 for home and office',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop',
    category: 'Computers & Laptops'
  },
  {
    id: '9',
    name: 'Dell Inspiron 15 3000',
    description: 'Reliable laptop for everyday computing with Intel Core i3',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'Computers & Laptops'
  },
  {
    id: '10',
    name: 'Apple MacBook Pro 13-inch M2',
    description: 'Professional laptop with Apple M2 chip and Retina display',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'Computers & Laptops'
  },

  // Networking Equipment
  {
    id: '11',
    name: 'TP-Link Archer AX73 Wi-Fi 6 Router',
    description: 'Advanced Wi-Fi 6 router with high-speed connectivity',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop',
    category: 'Networking Equipment'
  },
  {
    id: '12',
    name: 'Ubiquiti Dream Machine Pro',
    description: 'Enterprise security gateway with advanced threat management',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Networking Equipment'
  },
  {
    id: '13',
    name: 'Netgear ProSAFE 48-Port Switch',
    description: 'Professional managed switch for enterprise networks',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Networking Equipment'
  },
  {
    id: '14',
    name: 'D-Link DGS-1016D 16-Port Switch',
    description: 'Unmanaged Gigabit switch for small office networks',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Networking Equipment'
  },
  {
    id: '15',
    name: 'Mikrotik RouterBoard hEX S',
    description: 'Professional router with advanced routing and firewall features',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop',
    category: 'Networking Equipment'
  },

  // Gaming Accessories
  {
    id: '16',
    name: 'Xbox Wireless Controller',
    description: 'Premium gaming controller with haptic feedback and precision',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1592840062661-2c5ad4d62b8a?w=400&h=300&fit=crop',
    category: 'Gaming Accessories'
  },
  {
    id: '17',
    name: 'Razer BlackWidow V3 Mechanical Keyboard',
    description: 'Professional mechanical gaming keyboard with RGB lighting',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
    category: 'Gaming Accessories'
  },
  {
    id: '18',
    name: 'RGB Gaming Headset Stand',
    description: 'Premium headset stand with wireless charging and RGB lighting',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
    category: 'Gaming Accessories'
  },
  {
    id: '19',
    name: 'Logitech G Pro X Gaming Mouse',
    description: 'Ultra-lightweight gaming mouse with HERO sensor',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    category: 'Gaming Accessories'
  },
  {
    id: '20',
    name: 'Meta Quest 3 VR Headset',
    description: 'Next-generation VR headset with mixed reality capabilities',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop',
    category: 'Gaming Accessories'
  },

  // Mobile Phones
  {
    id: '21',
    name: 'iPhone 15 Pro Max',
    description: 'Latest iPhone with titanium design and A17 Pro chip',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'Mobile Phones'
  },
  {
    id: '22',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android phone with S Pen and AI features',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Mobile Phones'
  },
  {
    id: '23',
    name: 'Nokia XR20 Rugged Phone',
    description: 'Durable smartphone built for extreme conditions',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Mobile Phones'
  },
  {
    id: '24',
    name: 'Google Pixel 8 Pro',
    description: 'AI-powered smartphone with advanced camera system',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Mobile Phones'
  },
  {
    id: '25',
    name: 'Tecno Phantom X2 Pro',
    description: 'Premium smartphone with portrait photography features',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Mobile Phones'
  },

  // Audio & Headphones
  {
    id: '26',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling wireless headphones',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Audio & Headphones'
  },
  {
    id: '27',
    name: 'Apple AirPods Pro 2nd Gen',
    description: 'Premium wireless earbuds with adaptive transparency',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
    category: 'Audio & Headphones'
  },
  {
    id: '28',
    name: 'JBL Charge 5 Bluetooth Speaker',
    description: 'Portable waterproof speaker with powerful bass',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: 'Audio & Headphones'
  },
  {
    id: '29',
    name: 'Bose QuietComfort 45',
    description: 'Premium noise-canceling headphones for all-day comfort',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Audio & Headphones'
  },
  {
    id: '30',
    name: 'Audio-Technica ATH-M50x',
    description: 'Professional studio monitor headphones',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Audio & Headphones'
  },

  // Cables & Adapters
  {
    id: '31',
    name: 'USB-C to Lightning Cable 2m',
    description: 'Fast charging cable for iPhone and iPad devices',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Cables & Adapters'
  },
  {
    id: '32',
    name: 'HDMI 2.1 Cable 4K 120Hz',
    description: 'High-speed HDMI cable for 4K gaming and streaming',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Cables & Adapters'
  },
  {
    id: '33',
    name: 'USB-C Hub 7-in-1 Adapter',
    description: 'Multi-port hub with HDMI, USB 3.0, and SD card slots',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Cables & Adapters'
  },
  {
    id: '34',
    name: 'Ethernet Cat 8 Cable 10m',
    description: 'High-speed network cable for gigabit connections',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Cables & Adapters'
  },
  {
    id: '35',
    name: 'Wireless Charging Pad 15W',
    description: 'Fast wireless charger compatible with Qi devices',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Cables & Adapters'
  },

  // Storage Devices
  {
    id: '36',
    name: 'Samsung 980 PRO SSD 1TB',
    description: 'High-performance NVMe SSD for gaming and professional work',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage Devices'
  },
  {
    id: '37',
    name: 'WD Black External HDD 4TB',
    description: 'High-capacity external hard drive for backup and storage',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage Devices'
  },
  {
    id: '38',
    name: 'SanDisk Ultra USB 3.0 Flash Drive 128GB',
    description: 'Fast and reliable USB flash drive for data transfer',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage Devices'
  },
  {
    id: '39',
    name: 'Seagate Backup Plus Slim 2TB',
    description: 'Portable external drive with automatic backup software',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage Devices'
  },
  {
    id: '40',
    name: 'Kingston DataTraveler Micro 64GB',
    description: 'Ultra-compact USB drive perfect for laptops and tablets',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage Devices'
  }
];