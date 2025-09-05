"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  riskProfile?: {
    experience: 'beginner' | 'intermediate' | 'advanced';
    tolerance: 'conservative' | 'moderate' | 'aggressive';
    timeline: 'day-trading' | 'short-term' | 'mixed';
    capital: string;
    maxLoss: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateRiskProfile: (profile: User['riskProfile']) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('tradepulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Demo Trader',
        email,
        riskProfile: {
          experience: 'intermediate',
          tolerance: 'moderate',
          timeline: 'day-trading',
          capital: '$10,000 - $50,000',
          maxLoss: 2
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('tradepulse_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem('tradepulse_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tradepulse_user');
  };

  const updateRiskProfile = (profile: User['riskProfile']) => {
    if (user) {
      const updatedUser = { ...user, riskProfile: profile };
      setUser(updatedUser);
      localStorage.setItem('tradepulse_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateRiskProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}