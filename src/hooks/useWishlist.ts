import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, WishlistItem } from '../types';

export const useWishlist = (userId?: string) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [userId]);

  const fetchWishlist = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wishlist:', error);
        return;
      }

      const wishlistWithProducts = data.map(item => ({
        ...item,
        product: {
          ...item.product,
          price: item.product.price / 100 // Convert from cents to KES
        }
      }));

      setWishlistItems(wishlistWithProducts);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!userId) return false;
    
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .insert([{
          user_id: userId,
          product_id: product.id
        }])
        .select(`
          *,
          product:products(*)
        `)
        .single();

      if (error) {
        console.error('Error adding to wishlist:', error);
        return false;
      }

      const newWishlistItem = {
        ...data,
        product: {
          ...data.product,
          price: data.product.price / 100 // Convert from cents to KES
        }
      };

      setWishlistItems(prev => [newWishlistItem, ...prev]);
      return true;
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      return false;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        return false;
      }

      setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
      return true;
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      return false;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const clearWishlist = async () => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error clearing wishlist:', error);
        return false;
      }

      setWishlistItems([]);
      return true;
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      return false;
    }
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount: () => wishlistItems.length,
    fetchWishlist
  };
};