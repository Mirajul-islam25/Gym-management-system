import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Mock login logic
    if (email === 'admin@gym.com' && password === 'admin123') {
      const adminUser = { id: 1, name: 'Admin', email: 'admin@gym.com', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    } else if (email === 'member@gym.com' && password === 'member123') {
      const memberUser = { id: 2, name: 'John Doe', email: 'member@gym.com', role: 'member' };
      setUser(memberUser);
      localStorage.setItem('user', JSON.stringify(memberUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Mock registration
    const newUser = { 
      id: Date.now(), 
      name: userData.name, 
      email: userData.email, 
      role: 'member'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};