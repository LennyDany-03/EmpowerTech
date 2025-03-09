import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, Loader } from 'lucide-react';
import NavBar from '../components/NavBar';
import { createClient } from '@supabase/supabase-js';

// Getting environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Using the same color palette from HomePage
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
    text: '#451851'
  };

  // Initialize Google Sign-In when component mounts
  useEffect(() => {
    // Check if user is already signed in with Supabase
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        // Navigate to dashboard if successfully signed in
        if (event === 'SIGNED_IN') {
          window.location.href = '/dashboard';
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      // Clean up
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Check if user is already signed in
  const checkUser = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    }
  };

  // Handle Google Sign-In
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use Supabase's built-in Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: window.location.origin + '/dashboard',
        }
      });
      
      if (error) throw error;
      
      // This won't be reached immediately as the page will redirect to Google
      // and then back to the redirectTo URL after authentication
    } catch (error) {
      console.error('Error initiating Google sign-in:', error);
      setError(error.message || 'Failed to initiate Google sign-in');
      setLoading(false);
    }
  };

  // Handle Continue as Guest
  const continueAsGuest = () => {
    // Redirect to the app without authentication
    window.location.href = '/dashboard?guest=true';
  };

  // If user is already signed in, redirect to dashboard
  if (user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: colors.secondary,
          color: '#fff'
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You're already signed in!</h2>
          <p className="mb-6">Redirecting to your dashboard...</p>
          <Loader className="animate-spin mx-auto" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.secondary,
        color: '#fff'
      }}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Sign In Section */}
      <div className="py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Information */}
            <motion.div 
              className="md:w-1/2 p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.background }}>
                Welcome to <span style={{ color: colors.accent }}>PolicyNavigator</span>
              </h1>
              
              <p className="text-xl mb-8 opacity-80">
                Access personalized policy information and take control of your benefits.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { 
                    title: "Simplified Policy Access",
                    description: "Find the government policies that matter to you, explained in plain language"
                  },
                  { 
                    title: "Personalized Recommendations",
                    description: "Get tailored benefits and schemes based on your profile and needs"
                  },
                  { 
                    title: "Secure & Private",
                    description: "Your data is encrypted and never shared with third parties"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">
                      <ShieldCheck size={20} style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: colors.background }}>
                        {item.title}
                      </h3>
                      <p className="opacity-70 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Side - Sign In */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div 
                className="rounded-xl p-8 shadow-xl mx-auto max-w-md"
                style={{
                  backgroundColor: colors.background,
                }}
              >
                <div className="text-center mb-8">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{ 
                      backgroundColor: colors.accent,
                    }}
                  >
                    <LogIn size={28} color="#fff" />
                  </div>
                  
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                    Sign in to your account
                  </h2>
                  <p style={{ color: `${colors.text}80` }} className="mt-2">
                    Continue with Google to access your dashboard
                  </p>
                </div>

                {error && (
                  <div 
                    className="mb-6 p-3 rounded-lg text-white text-sm"
                    style={{ backgroundColor: '#f44336' }}
                  >
                    {error}
                  </div>
                )}

                <motion.button
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium shadow-md mb-6"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#444444',
                    border: '1px solid #dddddd'
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={signInWithGoogle}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="animate-spin mr-2" size={20} />
                  ) : (
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                  )}
                  {loading ? 'Signing in...' : 'Sign in with Google'}
                </motion.button>

                <div className="py-6 flex items-center text-center">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="px-4 text-sm" style={{ color: `${colors.text}60` }}>OR</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <motion.button 
                  className="w-full flex items-center justify-center px-6 py-4 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={continueAsGuest}
                  disabled={loading}
                >
                  Continue as Guest
                </motion.button>

                <div className="text-center mt-6">
                  <p style={{ color: `${colors.text}60` }} className="text-sm">
                    By continuing, you agree to PolicyNavigator's <a href="#" style={{ color: colors.primary, textDecoration: 'underline' }}>Terms</a> and <a href="#" style={{ color: colors.primary, textDecoration: 'underline' }}>Privacy</a>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2025 PolicyNavigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;