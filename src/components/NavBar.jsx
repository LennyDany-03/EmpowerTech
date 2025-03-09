import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  Bot, 
  BarChart2, 
  FileText, 
  Gamepad2, 
  Mail, 
  LogIn,
  Menu,
  X,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (use environment variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Navbar = () => {
  // Improved Color Palette for better readability
  const colors = {
    background: '#F5E6E0',  // Lighter background
    secondary: '#2C1B3A',   // Deeper, more saturated background
    primary: '#8B2D5A',     // Brighter primary color
    accent: '#C7556D',      // More vibrant accent
    text: '#FFFFFF',        // White text for better contrast
    iconColor: '#E9BCB9'    // Soft icon color
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const dropdownRef = useRef(null);

  // Check for user session and set up auth listener
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    
    getSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Improved scroll prevention and cleanup
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Close dropdown
    setIsDropdownOpen(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const navItems = [
    { icon: <Home size={20} />, text: 'Home', link: '/' },
    { icon: <Search size={20} />, text: 'Find', link: '/find' },
    { icon: <Bot size={20} />, text: 'AI', link: '/chatbot' },
    { icon: <BarChart2 size={20} />, text: 'Dashboard', link: '/dashboard' },
    { icon: <FileText size={20} />, text: 'Legal', link: '/legal' },
    { icon: <Gamepad2 size={20} />, text: 'Learn', link: '/learn' },
    { icon: <Mail size={20} />, text: 'Contact', link: '/contact' },
  ];

  const navVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: 'tween',
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  const backdropVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <header 
      className="shadow-md fixed top-0 left-0 right-0 z-40"
      style={{ 
        backgroundColor: colors.secondary,
        color: colors.text
      }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span 
              className="font-bold text-xl" 
              aria-label="PolicyNavigator"
              style={{ color: colors.text }}
            >
              PolicyNavigator
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex space-x-6" 
            aria-label="Desktop Navigation"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="flex items-center px-2 py-1 rounded-md text-sm font-medium transition-colors"
                style={{ 
                  color: colors.text,
                  opacity: 0.9
                }}
                whileHover={{ 
                  backgroundColor: `${colors.accent}20`,
                  scale: 1.05,
                  opacity: 1
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.text}
              >
                <span 
                  className="mr-2" 
                  aria-hidden="true"
                  style={{ color: colors.iconColor }}
                >
                  {item.icon}
                </span>
                {item.text}
              </motion.a>
            ))}
            
            {/* Sign In Button or User Profile */}
            {!loading && (
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt="User profile" 
                        className="w-9 h-9 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div 
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center border-2 border-white"
                      >
                        <span className="text-white font-medium">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </motion.button>
                  
                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50"
                        style={{ color: colors.secondary }}
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium">
                            {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        
                        <a 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User size={16} className="mr-2" style={{ color: colors.primary }} />
                          My Profile
                        </a>
                        
                        <a 
                          href="/settings" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings size={16} className="mr-2" style={{ color: colors.primary }} />
                          Settings
                        </a>
                        
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" style={{ color: colors.primary }} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.a
                  href="/signin"
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium shadow-lg"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.text
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Sign In"
                >
                  <LogIn size={20} className="mr-2" aria-hidden="true" />
                  Sign In
                </motion.a>
              )
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            {!loading && user ? (
              <div className="flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt="User profile" 
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center border-2 border-white"
                      >
                        <span className="text-white font-medium text-xs">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </motion.button>
                  
                  {/* Mobile User Dropdown */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50"
                        style={{ color: colors.secondary }}
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium">
                            {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        
                        <a 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User size={16} className="mr-2" style={{ color: colors.primary }} />
                          My Profile
                        </a>
                        
                        <a 
                          href="/settings" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings size={16} className="mr-2" style={{ color: colors.primary }} />
                          Settings
                        </a>
                        
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" style={{ color: colors.primary }} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 focus:outline-none focus:ring-2"
                  style={{
                    color: colors.text
                  }}
                  whileHover={{ color: colors.iconColor }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={toggleMenu}
                className="p-2 focus:outline-none focus:ring-2"
                style={{
                  color: colors.text
                }}
                whileHover={{ color: colors.iconColor }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <motion.nav
        id="mobile-menu"
        className="md:hidden fixed inset-x-0 top-16 shadow-lg z-50 overflow-hidden"
        style={{
          backgroundColor: colors.secondary,
          maxHeight: isOpen ? 'calc(100vh - 4rem)' : 0,
          top: '4rem'
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        aria-label="Mobile Navigation"
        role="navigation"
      >
        <div className="px-4 py-4 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors"
              style={{ 
                color: colors.text,
                opacity: 0.9
              }}
              variants={itemVariants}
              whileHover={{ 
                backgroundColor: `${colors.accent}20`,
                opacity: 1
              }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleMenu}
              aria-label={item.text}
            >
              <span 
                className="mr-3" 
                aria-hidden="true"
                style={{ color: colors.iconColor }}
              >
                {item.icon}
              </span>
              {item.text}
            </motion.a>
          ))}
          
          {/* Sign In Button (mobile) */}
          {!user && (
            <motion.a
              href="/signin"
              className="flex items-center justify-center w-full mt-6 px-4 py-3 rounded-md text-base font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.text
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Sign In"
            >
              <LogIn size={20} className="mr-2" aria-hidden="true" />
              Sign In
            </motion.a>
          )}
          
          {/* Profile options for mobile when user is logged in */}
          {user && (
            <>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center px-3 py-3">
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="User profile" 
                      className="w-10 h-10 rounded-full object-cover border-2"
                      style={{ borderColor: colors.accent }}
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center border-2"
                      style={{ borderColor: colors.accent }}
                    >
                      <span className="text-white font-medium">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                <motion.a
                  href="/profile"
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors"
                  style={{ color: colors.text, opacity: 0.9 }}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: `${colors.accent}20`, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleMenu}
                >
                  <User size={20} className="mr-3" style={{ color: colors.iconColor }} />
                  My Profile
                </motion.a>
                
                <motion.a
                  href="/settings"
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors"
                  style={{ color: colors.text, opacity: 0.9 }}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: `${colors.accent}20`, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleMenu}
                >
                  <Settings size={20} className="mr-3" style={{ color: colors.iconColor }} />
                  Settings
                </motion.a>
                
                <motion.button
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium transition-colors text-left"
                  style={{ color: colors.text, opacity: 0.9 }}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: `${colors.accent}20`, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={20} className="mr-3" style={{ color: colors.iconColor }} />
                  Sign Out
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;