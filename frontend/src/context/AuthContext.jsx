import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login for now
    const mockUser = {
      _id: 'mock_123',
      name: 'Guest User',
      email: email,
      role: 'student'
    };
    setUser(mockUser);
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (name, email, password, role) => {
    // Mock registration for now
    const mockUser = {
      _id: 'mock_123',
      name: name,
      email: email,
      role: role
    };
    setUser(mockUser);
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
