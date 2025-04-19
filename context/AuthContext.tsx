import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { User, Language, ProficiencyLevel } from '@/types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setProficiencyLevel: (level: ProficiencyLevel) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for storage based on platform
const storeData = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store data to localStorage', error);
    }
  } else {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to store data to SecureStore', error);
    }
  }
};

const getData = async (key: string) => {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to get data from localStorage', error);
      return null;
    }
  } else {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Failed to get data from SecureStore', error);
      return null;
    }
  }
};

const removeData = async (key: string) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove data from localStorage', error);
    }
  } else {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to remove data from SecureStore', error);
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJSON = await getData('user');
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: 'user-1',
        name: 'John Doe',
        email,
        streak: 0,
        xp: 0
      };
      setUser(mockUser);
      await storeData('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful signup
      const mockUser: User = {
        id: 'user-' + new Date().getTime(),
        name,
        email,
        streak: 0,
        xp: 0
      };
      setUser(mockUser);
      await storeData('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed', error);
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await removeData('user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (language: Language) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, selectedLanguage: language };
      setUser(updatedUser);
      await storeData('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to set language', error);
    }
  };

  const setProficiencyLevel = async (level: ProficiencyLevel) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, proficiencyLevel: level };
      setUser(updatedUser);
      await storeData('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to set proficiency level', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, setLanguage, setProficiencyLevel }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};