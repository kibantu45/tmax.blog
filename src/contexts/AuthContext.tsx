
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle email verification redirect
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          // Only redirect if this is specifically from email verification
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('type') === 'confirmation') {
            // Clear any URL parameters and redirect to login
            window.history.replaceState({}, document.title, window.location.pathname);
            // Small delay to ensure state is updated
            setTimeout(() => {
              window.location.href = '/login';
            }, 100);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Check if user already exists
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy_password' // Just to check if user exists
    });

    // If we get back any user data, it means the account exists
    if (existingUser?.user) {
      return { error: { message: 'Account already exists. Please go to login page.' } };
    }

    // Check for existing user by email through profiles table
    const { data: profiles } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email);

    if (profiles && profiles.length > 0) {
      return { error: { message: 'Account already exists. Please go to login page.' } };
    }

    const redirectUrl = `${window.location.origin}/login`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
