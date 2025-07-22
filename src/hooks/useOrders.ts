import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Order, OrderItem, CartItem, Customer } from '../types';

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [userId]);

  const fetchOrders = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items:order_items(
            *,
            product:products(*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      const ordersWithItems = data.map(order => ({
        ...order,
        total: order.total / 100, // Convert from cents to KES
        items: order.order_items?.map((item: any) => ({
          ...item,
          price: item.price / 100, // Convert from cents to KES
          product: {
            ...item.product,
            price: item.product.price / 100 // Convert from cents to KES
          }
        })) || []
      }));

      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (
    cartItems: CartItem[],
    customer: Customer,
    userId?: string
  ): Promise<Order | null> => {
    try {
      const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId || null,
          total: total * 100, // Convert to cents
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_address: customer.address,
          customer_city: customer.city,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        return null;
      }

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price * 100 // Convert to cents
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        return null;
      }

      const newOrder = {
        ...order,
        total: order.total / 100, // Convert back to KES
        items: cartItems.map((item, index) => ({
          id: `temp-${index}`,
          order_id: order.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          created_at: new Date().toISOString(),
          product: item.product
        }))
      };

      if (userId) {
        setOrders(prev => [newOrder, ...prev]);
      }

      return newOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      return null;
    }
  };

  return {
    orders,
    isLoading,
    fetchOrders,
    createOrder
  };
};