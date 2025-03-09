import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bot, 
  BarChart2, 
  FileText, 
  Gamepad2,
  Users,
  Star,
  TrendingUp
} from 'lucide-react';
import NavBar from '../components/NavBar';
import Discuess from '../assets/Discuess.jpg'

const HomePage = () => {
  // Sophisticated Color Palette
  const colors = {
    // Light Dusty Rose
    background: '#E9BCB9',
    // Deep Plum Background
    secondary: '#1C1938',
    // Dark Raspberry
    primary: '#67254B',
    // Muted Terracotta
    accent: '#AD445A',
    // Deep Aubergine
    text: '#451851'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12 mb-12 md:mb-0 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-semibold"
                style={{ 
                  backgroundColor: `${colors.accent}30`,
                  color: colors.accent
                }}
              >
                Empowering Citizens Through Knowledge
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights. <br />
                <span style={{ color: colors.primary }}>
                  Access Government Policies
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Simplified explanations of financial, social, and legal policies tailored for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="/find">
                  <motion.button 
                    className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: colors.primary, 
                      color: colors.background 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="mr-2" size={20} />
                    Find Policies
                  </motion.button>
                </a>
                <a href="/chatbot">
                  <motion.button 
                    className="border-2 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
                    style={{ 
                      borderColor: colors.primary, 
                      color: colors.text 
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: `${colors.primary}20` 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bot className="mr-2" size={20} />
                    Ask AI
                  </motion.button>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={Discuess}
                  alt="Diverse people interacting with policies" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{ 
                    background: `linear-gradient(to bottom, transparent, ${colors.secondary})` 
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                count: "30K+", 
                label: "Citizens Helped", 
                icon: <Users className="w-6 h-6" style={{ color: colors.accent }} /> 
              },
              { 
                count: "500+", 
                label: "Policies Simplified", 
                icon: <FileText className="w-6 h-6" style={{ color: colors.accent }} /> 
              },
              { 
                count: "97%", 
                label: "Satisfaction Rate", 
                icon: <Star className="w-6 h-6" style={{ color: colors.accent }} /> 
              },
              { 
                count: "24/7", 
                label: "AI Support", 
                icon: <Bot className="w-6 h-6" style={{ color: colors.accent }} /> 
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="rounded-lg p-6 text-center"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
              >
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.count}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Simple Process
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              How It Works
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Three simple steps to navigate complex government policies
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: "Enter Details",
                description: "Input your income, profession, location, and other relevant information.",
                icon: <Users className="w-10 h-10" style={{ color: colors.text }} />
              },
              {
                step: 2,
                title: "Get Explanations",
                description: "Receive easy-to-understand breakdowns of policies affecting you.",
                icon: <FileText className="w-10 h-10" style={{ color: colors.text }} />
              },
              {
                step: 3,
                title: "Take Action",
                description: "Apply for benefits, file complaints, or connect with experts.",
                icon: <TrendingUp className="w-10 h-10" style={{ color: colors.text }} />
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="rounded-xl p-8 text-center relative"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: colors.accent,
                    color: colors.background
                  }}
                >
                  {item.icon}
                </div>
                <div className="pt-8">
                  <div 
                    className="text-sm font-bold uppercase tracking-wide mb-2 opacity-80"
                    style={{ color: colors.primary }}
                  >
                    Step {item.step}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="opacity-80"
                    style={{ color: colors.text }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              What We Offer
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Key Features
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Tools designed to empower you with knowledge and actionable insights
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Search className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Personalized Policy Finder",
                description: "Find policies tailored to your needs based on your specific situation and demographics."
              },
              {
                icon: <Bot className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "AI Chatbot",
                description: "Get instant answers about government schemes and policies from our intelligent assistant."
              },
              {
                icon: <BarChart2 className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Impact Dashboard",
                description: "See real-time effects of policies in your area with interactive visualizations."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="rounded-xl p-6 text-center relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-3 rounded-full bg-white/10">
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {feature.title}
                  </h3>
                  <p className="opacity-80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                PolicyNavigator
              </h3>
              <p 
                className="opacity-80 mb-4"
                style={{ color: colors.text }}
              >
                Making government policies accessible and understandable for everyone.
              </p>
              <p 
                className="opacity-60"
                style={{ color: colors.text }}
              >
                © 2025 PolicyNavigator. All rights reserved.
              </p>
            </div>
            <div>
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Resources
              </h4>
              <ul className="space-y-2">
                {['Policy Database', 'Legal Guides', 'Benefit Calculator', 'Success Stories'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="opacity-80 hover:opacity-100 transition-opacity"
                      style={{ color: colors.text }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Company
              </h4>
              <ul className="space-y-2">
                {['About Us', 'Our Mission', 'Careers', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="opacity-80 hover:opacity-100 transition-opacity"
                      style={{ color: colors.text }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Subscribe
              </h4>
              <p 
                className="opacity-80 mb-4"
                style={{ color: colors.text }}
              >
                Stay updated with the latest policy changes and platform features.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg w-full"
                  style={{ 
                    backgroundColor: `${colors.secondary}20`,
                    color: colors.text,
                    borderColor: `${colors.primary}30`
                  }}
                />
                <button 
                  className="px-4 py-2 rounded-r-lg"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;