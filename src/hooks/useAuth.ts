import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User as AppUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: authUser.email || '',
          phone: profile.phone || '',
          address: profile.address || '',
          city: profile.city || 'Malindi',
          created_at: profile.created_at,
          updated_at: profile.updated_at
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        await fetchUserProfile(data.user);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      // Get the current URL without any hash or query parameters
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: baseUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        return false;
      }

      // The redirect will handle the authentication
      return true;
    } catch (error) {
      console.error('Google sign-in error:', error);
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address?: string;
    city?: string;
  }): Promise<{ success: boolean; needsVerification?: boolean }> => {
    setIsLoading(true);
    
    try {
      // Get the current URL without any hash or query parameters
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: baseUrl,
          data: {
            name: userData.name,
            phone: userData.phone,
            address: userData.address || '',
            city: userData.city || 'Malindi'
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        setIsLoading(false);
        return { success: false };
      }

      if (data.user) {
        // Check if email confirmation is required
        if (!data.session) {
          setIsLoading(false);
          return { success: true, needsVerification: true };
        }
        
        // If session exists, user is automatically logged in
        await fetchUserProfile(data.user);
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
    
    setIsLoading(false);
    return { success: false };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          phone: updates.phone,
          address: updates.address,
          city: updates.city
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
    user,
    isLoading,
    login,
    signInWithGoogle,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};