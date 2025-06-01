import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@TravelAssistant:user');
      const storedToken = await AsyncStorage.getItem('@TravelAssistant:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem('@TravelAssistant:token', token);
      await AsyncStorage.setItem('@TravelAssistant:user', JSON.stringify(user));

      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem('@TravelAssistant:token', token);
      await AsyncStorage.setItem('@TravelAssistant:user', JSON.stringify(user));

      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@TravelAssistant:token');
      await AsyncStorage.removeItem('@TravelAssistant:user');
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 