import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const navItems = [
    { icon: <Home size={20} />, text: 'Home', link: '/' },
    { icon: <Search size={20} />, text: 'Find', link: '/find-policies' },
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

  return (
    <header 
      className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md fixed top-0 left-0 right-0 z-40"
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
            <span className="text-white font-bold text-xl" aria-label="PolicyNavigator">PolicyNavigator</span>
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
                className="flex items-center text-blue-100 hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors"
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.text}
              >
                <span className="mr-2" aria-hidden="true">{item.icon}</span>
                {item.text}
              </motion.a>
            ))}
            
            {/* Sign In Button */}
            <motion.a
              href="/signin"
              className="flex items-center bg-white text-blue-700 px-4 py-2 rounded-md text-sm font-medium shadow-md"
              whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sign In"
            >
              <LogIn size={20} className="mr-2" aria-hidden="true" />
              Sign In
            </motion.a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-blue-100 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
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
        className="md:hidden fixed inset-x-0 top-16 bg-blue-800 shadow-lg z-50 overflow-hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        style={{ 
          maxHeight: isOpen ? 'calc(100vh - 4rem)' : 0,
          top: '4rem' // Ensures menu starts below the header
        }}
        aria-label="Mobile Navigation"
        role="navigation"
      >
        <div className="px-4 py-4 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="flex items-center text-blue-100 hover:text-white hover:bg-blue-700 px-3 py-3 rounded-md text-base font-medium transition-colors"
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={toggleMenu}
              aria-label={item.text}
            >
              <span className="mr-3" aria-hidden="true">{item.icon}</span>
              {item.text}
            </motion.a>
          ))}
          
          {/* Sign In Button */}
          <motion.a
            href="/signin"
            className="flex items-center justify-center w-full bg-white text-blue-700 mt-6 px-4 py-3 rounded-md text-base font-medium shadow-md"
            variants={itemVariants}
            whileHover={{ backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.98 }}
            aria-label="Sign In"
          >
            <LogIn size={20} className="mr-2" aria-hidden="true" />
            Sign In
          </motion.a>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;