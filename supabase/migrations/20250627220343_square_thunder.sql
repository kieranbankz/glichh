/*
  # Seed Products Data

  1. Insert sample products for all categories
  2. Products with realistic pricing and descriptions
*/

INSERT INTO products (name, description, price, image, category) VALUES
-- Electronics
('TP-Link Wi-Fi 6 Router AX1800', 'High-speed wireless router with Wi-Fi 6 technology for seamless connectivity', 850000, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop', 'Electronics'),
('Ubiquiti UniFi Access Point', 'Enterprise-grade wireless access point for professional networks', 1900000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Electronics'),
('Netgear Nighthawk Gaming Router', 'Ultra-fast gaming router with advanced QoS and Wi-Fi 6E', 1480000, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop', 'Electronics'),
('D-Link 24-Port Gigabit Switch', 'Managed Gigabit switch for enterprise network infrastructure', 1120000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Electronics'),
('Asus TUF Gaming Laptop Ryzen 7', 'High-performance gaming laptop with AMD Ryzen 7 processor', 12200000, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', 'Electronics'),

-- Computers & Laptops
('Lenovo ThinkCentre Tiny i5 Desktop', 'Compact desktop computer with Intel i5 processor for business use', 3299900, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop', 'Computers & Laptops'),
('Asus TUF Gaming Laptop A15', 'Powerful gaming laptop with AMD Ryzen 7 and RTX graphics', 12500000, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', 'Computers & Laptops'),
('HP Pavilion Desktop PC - Ryzen 5', 'Powerful desktop computer with AMD Ryzen 5 for home and office', 5800000, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop', 'Computers & Laptops'),
('Dell Inspiron 15 3000', 'Reliable laptop for everyday computing with Intel Core i3', 4500000, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', 'Computers & Laptops'),
('Apple MacBook Pro 13-inch M2', 'Professional laptop with Apple M2 chip and Retina display', 18500000, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', 'Computers & Laptops'),

-- Networking Equipment
('TP-Link Archer AX73 Wi-Fi 6 Router', 'Advanced Wi-Fi 6 router with high-speed connectivity', 1250000, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop', 'Networking Equipment'),
('Ubiquiti Dream Machine Pro', 'Enterprise security gateway with advanced threat management', 4500000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Networking Equipment'),
('Netgear ProSAFE 48-Port Switch', 'Professional managed switch for enterprise networks', 2800000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Networking Equipment'),
('D-Link DGS-1016D 16-Port Switch', 'Unmanaged Gigabit switch for small office networks', 850000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Networking Equipment'),
('Mikrotik RouterBoard hEX S', 'Professional router with advanced routing and firewall features', 749900, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop', 'Networking Equipment'),

-- Gaming Accessories
('Xbox Wireless Controller', 'Premium gaming controller with haptic feedback and precision', 650000, 'https://images.unsplash.com/photo-1592840062661-2c5ad4d62b8a?w=400&h=300&fit=crop', 'Gaming Accessories'),
('Razer BlackWidow V3 Mechanical Keyboard', 'Professional mechanical gaming keyboard with RGB lighting', 890000, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop', 'Gaming Accessories'),
('RGB Gaming Headset Stand', 'Premium headset stand with wireless charging and RGB lighting', 350000, 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop', 'Gaming Accessories'),
('Logitech G Pro X Gaming Mouse', 'Ultra-lightweight gaming mouse with HERO sensor', 420000, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop', 'Gaming Accessories'),
('Meta Quest 3 VR Headset', 'Next-generation VR headset with mixed reality capabilities', 6500000, 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop', 'Gaming Accessories'),

-- Mobile Phones
('iPhone 15 Pro Max', 'Latest iPhone with titanium design and A17 Pro chip', 16500000, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'Mobile Phones'),
('Samsung Galaxy S24 Ultra', 'Premium Android phone with S Pen and AI features', 14500000, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Mobile Phones'),
('Nokia XR20 Rugged Phone', 'Durable smartphone built for extreme conditions', 4200000, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Mobile Phones'),
('Google Pixel 8 Pro', 'AI-powered smartphone with advanced camera system', 9500000, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Mobile Phones'),
('Tecno Phantom X2 Pro', 'Premium smartphone with portrait photography features', 3800000, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Mobile Phones'),

-- Audio & Headphones
('Sony WH-1000XM5 Headphones', 'Industry-leading noise canceling wireless headphones', 2800000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', 'Audio & Headphones'),
('Apple AirPods Pro 2nd Gen', 'Premium wireless earbuds with adaptive transparency', 3200000, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop', 'Audio & Headphones'),
('JBL Charge 5 Bluetooth Speaker', 'Portable waterproof speaker with powerful bass', 1250000, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop', 'Audio & Headphones'),
('Bose QuietComfort 45', 'Premium noise-canceling headphones for all-day comfort', 3500000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', 'Audio & Headphones'),
('Audio-Technica ATH-M50x', 'Professional studio monitor headphones', 1850000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', 'Audio & Headphones'),

-- Cables & Adapters
('USB-C to Lightning Cable 2m', 'Fast charging cable for iPhone and iPad devices', 250000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Cables & Adapters'),
('HDMI 2.1 Cable 4K 120Hz', 'High-speed HDMI cable for 4K gaming and streaming', 180000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Cables & Adapters'),
('USB-C Hub 7-in-1 Adapter', 'Multi-port hub with HDMI, USB 3.0, and SD card slots', 420000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Cables & Adapters'),
('Ethernet Cat 8 Cable 10m', 'High-speed network cable for gigabit connections', 150000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Cables & Adapters'),
('Wireless Charging Pad 15W', 'Fast wireless charger compatible with Qi devices', 320000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', 'Cables & Adapters'),

-- Storage Devices
('Samsung 980 PRO SSD 1TB', 'High-performance NVMe SSD for gaming and professional work', 1200000, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 'Storage Devices'),
('WD Black External HDD 4TB', 'High-capacity external hard drive for backup and storage', 850000, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 'Storage Devices'),
('SanDisk Ultra USB 3.0 Flash Drive 128GB', 'Fast and reliable USB flash drive for data transfer', 220000, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 'Storage Devices'),
('Seagate Backup Plus Slim 2TB', 'Portable external drive with automatic backup software', 680000, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 'Storage Devices'),
('Kingston DataTraveler Micro 64GB', 'Ultra-compact USB drive perfect for laptops and tablets', 120000, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 'Storage Devices');