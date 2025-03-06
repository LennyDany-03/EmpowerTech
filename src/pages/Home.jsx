import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bot, 
  BarChart2, 
  FileText, 
  Gamepad2,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import NavBar from '../components/NavBar';

const HomePage = () => {
  // Animation variants for staggered animations
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B0B2A] to-[#1A1A4A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B2A] to-[#1A1A4A]"></div>
          {/* Abstract pattern background */}
          <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1920 1080" fill="none">
            <path d="M0 0L1920 0L1920 1080L0 1080L0 0Z" fill="url(#paint0_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" x1="960" y1="0" x2="960" y2="1080" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.1"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold">
                Empowering Citizens Through Knowledge
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-300">Access Government Policies Easily.</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Simplified explanations of financial, social, and legal policies tailored for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="bg-white text-[#1A1A4A] px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="mr-2" size={20} />
                  Find Policies for You
                </motion.button>
                <motion.button 
                  className="bg-transparent border-2 border-blue-300 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bot className="mr-2" size={20} />
                  Ask Our AI
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-96 w-full">
                {/* Layered shapes for 3D effect */}
                <motion.div 
                  className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-800 to-indigo-900 rounded-lg transform rotate-3"
                  whileHover={{ rotate: 6 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-6 right-6 w-full h-full bg-gradient-to-br from-[#0B0B2A] to-[#1A1A4A] rounded-lg transform -rotate-3"
                  whileHover={{ rotate: -6 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute top-3 right-3 w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  {/* Placeholder for illustration */}
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Diverse people interacting with policies" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B2A] to-transparent opacity-60"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { count: "30K+", label: "Citizens Helped", icon: <Users className="w-6 h-6 text-blue-200" /> },
              { count: "500+", label: "Policies Simplified", icon: <FileText className="w-6 h-6 text-blue-200" /> },
              { count: "97%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6 text-blue-200" /> },
              { count: "24/7", label: "AI Support", icon: <Bot className="w-6 h-6 text-blue-200" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.count}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Timeline */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Three simple steps to navigate complex government policies</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: "Enter your details",
                description: "Input your income, profession, location, and other relevant information.",
                icon: <Users className="w-10 h-10 text-white" />,
                iconBg: "bg-[#1A1A4A]"
              },
              {
                step: 2,
                title: "Get simplified explanations",
                description: "Receive easy-to-understand breakdowns of policies affecting you.",
                icon: <FileText className="w-10 h-10 text-white" />,
                iconBg: "bg-blue-700"
              },
              {
                step: 3,
                title: "Take action",
                description: "Apply for benefits, file complaints, or connect with experts.",
                icon: <Zap className="w-10 h-10 text-white" />,
                iconBg: "bg-indigo-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 relative shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center z-10 shadow-lg`}>
                  {item.icon}
                </div>
                <div className="text-center pt-8 pb-4">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">Step {item.step}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B0B2A] to-[#1A1A4A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-blue-900 text-blue-300 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Key Features</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">Tools designed to empower you with knowledge and actionable insights</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Search className="w-12 h-12 text-blue-300" />,
                title: "Personalized Policy Finder",
                description: "Find policies tailored to your needs based on your specific situation and demographics.",
                color: "bg-gradient-to-br from-blue-900 to-[#1A1A4A] border-blue-800"
              },
              {
                icon: <Bot className="w-12 h-12 text-indigo-300" />,
                title: "AI Chatbot",
                description: "Get instant answers about government schemes and policies from our intelligent assistant.",
                color: "bg-gradient-to-br from-indigo-900 to-[#1A1A4A] border-indigo-800"
              },
              {
                icon: <BarChart2 className="w-12 h-12 text-blue-300" />,
                title: "Impact Dashboard",
                description: "See real-time effects of policies in your area with interactive visualizations.",
                color: "bg-gradient-to-br from-blue-900 to-[#1A1A4A] border-blue-800"
              },
              {
                icon: <FileText className="w-12 h-12 text-indigo-300" />,
                title: "Legal Assistance",
                description: "Understand your rights with simplified guides and legal resources.",
                color: "bg-gradient-to-br from-indigo-900 to-[#1A1A4A] border-indigo-800"
              },
              {
                icon: <Gamepad2 className="w-12 h-12 text-blue-300" />,
                title: "Gamified Learning",
                description: "Earn rewards and badges by learning about policies through interactive quizzes.",
                color: "bg-gradient-to-br from-blue-900 to-[#1A1A4A] border-blue-800"
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-indigo-300" />,
                title: "Policy Alerts",
                description: "Stay informed with notifications about new policies that affect you.",
                color: "bg-gradient-to-br from-indigo-900 to-[#1A1A4A] border-indigo-800"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border ${feature.color} relative overflow-hidden`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-white/10 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B0B2A] to-[#1A1A4A] text-white relative overflow-hidden">
        {/* Angled Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" fillOpacity=".25"></path>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold">
              Take The First Step
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Navigate Government Policies?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Start exploring policies that matter to you and take control of your benefits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-[#1A1A4A] px-8 py-4 rounded-lg text-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring Now
              </motion.button>
              <motion.button 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Demo
              </motion.button>
            </div>
            
            <div className="mt-12">
              <p className="text-white/80 mb-4">Connect with us on social media</p>
              <div className="flex justify-center space-x-6">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform, index) => (
                  <motion.a 
                    key={index}
                    href={`#${platform.toLowerCase()}`}
                    className="text-white/80 hover:text-white bg-white/10 p-3 rounded-full"
                    whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0B0B2A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PolicyNavigator</h3>
              <p className="text-blue-200 mb-4">Making government policies accessible and understandable for everyone.</p>
              <p className="text-blue-200">© 2025 PolicyNavigator. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Policy Database</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Legal Guides</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Benefit Calculator</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Our Mission</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
              <p className="text-blue-200 mb-4">Stay updated with the latest policy changes and platform features.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg bg-blue-900 border border-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-r-lg text-white">
                  Subscribe
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