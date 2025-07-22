import { useState, useEffect } from 'react';

interface AdminCredentials {
  username: string;
  password: string;
}

interface AdminUser {
  username: string;
  role: 'admin';
  loginTime: string;
}

// Admin credentials - In production, these should be stored securely
const ADMIN_CREDENTIALS = {
  username: 'glichadmin',
  password: 'Glich2025@Admin'
};

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const savedAdmin = localStorage.getItem('glich-admin-session');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        // Check if session is still valid (24 hours)
        const loginTime = new Date(adminData.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setAdminUser(adminData);
        } else {
          // Session expired
          localStorage.removeItem('glich-admin-session');
        }
      } catch (error) {
        localStorage.removeItem('glich-admin-session');
      }
    }
  }, []);

  const login = async (credentials: AdminCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Verify credentials
      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        const adminData: AdminUser = {
          username: credentials.username,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        
        setAdminUser(adminData);
        localStorage.setItem('glich-admin-session', JSON.stringify(adminData));
        
        // Log successful login
        console.log(`Admin login successful: ${credentials.username} at ${new Date().toISOString()}`);
        
        setIsLoading(false);
        return true;
      } else {
        // Log failed login attempt
        console.warn(`Failed admin login attempt: ${credentials.username} at ${new Date().toISOString()}`);
        
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('glich-admin-session');
    
    // Log logout
    console.log(`Admin logout: ${adminUser?.username} at ${new Date().toISOString()}`);
  };

  const isAuthenticated = !!adminUser;

  return {
    adminUser,
    isLoading,
    login,
    logout,
    isAuthenticated
  };
};