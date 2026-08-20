'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Profile, Business, RegisterOwnerInput } from '@/types/database';
import { mockDb } from '@/services/mockDb';

interface AuthContextType {
  user: Profile | null;
  business: Business | null;
  loading: boolean;
  register: (input: RegisterOwnerInput) => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => void;
  switchBusiness: (businessId: string) => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = () => {
    try {
      const session = mockDb.getCurrentSession();
      if (session) {
        setUser(session.profile);
        setBusiness(session.business);
      } else {
        setUser(null);
        setBusiness(null);
      }
    } catch (err) {
      console.error('Session load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const register = async (input: RegisterOwnerInput) => {
    setLoading(true);
    try {
      const { profile, business } = mockDb.registerOwner(input);
      setUser(profile);
      setBusiness(business);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    setLoading(true);
    try {
      const { profile, business } = mockDb.loginOwner(email);
      setUser(profile);
      setBusiness(business);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    mockDb.logoutOwner();
    setUser(null);
    setBusiness(null);
  };

  const switchBusiness = (businessId: string) => {
    mockDb.switchBusinessSession(businessId);
    refreshSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        loading,
        register,
        login,
        logout,
        switchBusiness,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
