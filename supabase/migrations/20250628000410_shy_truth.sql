/*
  # Update Product Images

  1. Updates
    - Update specific products with proper image URLs
    - Fix product images for networking equipment, gaming accessories, and cables
*/

-- Update Ubiquiti UniFi Access Point
UPDATE products 
SET image = 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Ubiquiti UniFi Access Point';

-- Update D-Link 24-Port Gigabit Switch
UPDATE products 
SET image = 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'D-Link 24-Port Gigabit Switch';

-- Update Ubiquiti Dream Machine Pro
UPDATE products 
SET image = 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Ubiquiti Dream Machine Pro';

-- Update Netgear ProSAFE 48-Port Switch
UPDATE products 
SET image = 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Netgear ProSAFE 48-Port Switch';

-- Update D-Link DGS-1016D 16-Port Switch
UPDATE products 
SET image = 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'D-Link DGS-1016D 16-Port Switch';

-- Update Xbox Wireless Controller
UPDATE products 
SET image = 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Xbox Wireless Controller';

-- Update USB-C to Lightning Cable 2m
UPDATE products 
SET image = 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'USB-C to Lightning Cable 2m';

-- Update HDMI 2.1 Cable 4K 120Hz
UPDATE products 
SET image = 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'HDMI 2.1 Cable 4K 120Hz';

-- Update USB-C Hub 7-in-1 Adapter
UPDATE products 
SET image = 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'USB-C Hub 7-in-1 Adapter';

-- Update Ethernet Cat 8 Cable 10m
UPDATE products 
SET image = 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Ethernet Cat 8 Cable 10m';

-- Update Wireless Charging Pad 15W
UPDATE products 
SET image = 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
WHERE name = 'Wireless Charging Pad 15W';