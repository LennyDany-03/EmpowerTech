import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  Award,
  Info,
  Download,
  ChevronRight,
  BookOpen,
  UserCheck,
  Scale,
  Bot
} from 'lucide-react';
import NavBar from '../components/NavBar';

const Legal = () => {
  // Add scroll-to-top effect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // Function to handle navigation with scroll reset
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Sophisticated Color Palette (same as HomePage)
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

  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [complaintData, setComplaintData] = useState({
    name: '',
    email: '',
    phone: '',
    complaintType: '',
    description: '',
  });

  // Legal guides data - Updated links to use navigate function
  const legalGuides = [
    {
      id: 1,
      title: "Workers' Rights",
      description: "Minimum wage, working hours, harassment policies.",
      icon: <UserCheck className="w-6 h-6" />,
      link: "/workers-rights", // Updated path
    },
    {
      id: 2,
      title: "Tenant Rights",
      description: "Rental agreements, eviction laws.",
      icon: <Info className="w-6 h-6" />,
      link: "/tenant-rights",
    },
    {
      id: 3,
      title: "Consumer Rights",
      description: "Refund policies, fraud complaints.",
      icon: <Award className="w-6 h-6" />,
      link: "/consumer-rights",
    },
    {
      id: 4,
      title: "Cyber Laws",
      description: "Online scams, social media privacy, data protection.",
      icon: <AlertTriangle className="w-6 h-6" />,
      link: "/cyber-laws",
    },
    {
      id: 5,
      title: "Women's Rights",
      description: "Protection against harassment, maternity benefits.",
      icon: <Award className="w-6 h-6" />,
      link: "/womens-rights",
    },
    {
      id: 6,
      title: "Senior Citizens' Rights",
      description: "Pension, elderly abuse protection.",
      icon: <Info className="w-6 h-6" />,
      link: "/senior-rights",
    },
    {
      id: 7,
      title: "Right to Information (RTI)",
      description: "How to request government data.",
      icon: <FileText className="w-6 h-6" />,
      link: "/rti",
    },
    {
      id: 8,
      title: "Legal Aid for Low-Income Groups",
      description: "Free legal support programs.",
      icon: <Scale className="w-6 h-6" />,
      link: "/legal-aid",
    },
  ];

  // Mock AI response function
  const handleAskAI = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Simple mock responses based on keywords
    const responses = {
      rent: "Landlords typically must provide notice before increasing rent. The exact requirements depend on your local laws, but generally 30-90 days notice is required. Check your rental agreement for specific terms. Ref: Tenant Protection Act, Section 12.",
      salary: "If your salary is delayed, you should first submit a written complaint to your employer. If unresolved, file a complaint with your local labor department. You may be entitled to interest on delayed wages. Ref: Labor Standards Act, Section 35.",
      default: "I'd need more specific information about your legal question. Consider consulting with a legal aid provider for personalized advice.",
    };

    // Check which response to provide
    const keywordFound = Object.keys(responses).find(k => 
      question.toLowerCase().includes(k)
    );
    
    setAiResponse(keywordFound ? responses[keywordFound] : responses.default);
  };

  // Handle complaint form changes
  const handleComplaintChange = (e) => {
    const { name, value } = e.target;
    setComplaintData(prev => ({ ...prev, [name]: value }));
  };

  // Mock submit complaint
  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    // This would normally submit to a backend
    alert("Your complaint has been submitted. Reference number: " + Math.floor(Math.random() * 1000000));
  };

  // Mock generate PDF
  const generatePDF = () => {
    alert("PDF complaint letter would be generated and downloaded here.");
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
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}30`,
                color: colors.accent
              }}
            >
              Know Your Rights!
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Understand Your Legal Rights
              <br />
              <span style={{ color: colors.primary }}>
                in Simple Terms!
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: `${colors.text}90` }}>
              Access easy-to-read legal guides, file complaints, and get free legal assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: colors.primary, 
                  color: colors.background 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="mr-2" size={20} />
                Browse Legal Guides
              </motion.button>
              <motion.button 
                className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: colors.accent, 
                  color: colors.background 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="mr-2" size={20} />
                File a Complaint
              </motion.button>
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
                  Ask Our AI
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Legal Rights & Guides */}
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
              Simplified Explanations
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Common Legal Rights & Guides
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Essential legal information explained in straightforward language
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {legalGuides.map((guide) => (
              <motion.div
                key={guide.id}
                className="rounded-xl p-6 text-center relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  backgroundColor: `${colors.secondary}30`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="mb-4 p-3 rounded-full"
                    style={{ 
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary
                    }}
                  >
                    {guide.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {guide.title}
                  </h3>
                  <p className="opacity-80 mb-4">{guide.description}</p>
                  <button 
                    onClick={() => handleNavigation(guide.link)}
                    className="flex items-center text-sm font-medium"
                    style={{ color: colors.primary }}
                  >
                    Read More <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rest of the Legal.jsx component remains the same */}
      {/* File a Complaint Section */}
      {/* AI-Powered Legal Advisor Section */}
      {/* Find a Lawyer Section */}
      {/* Footer Section */}
    </div>
  );
};

export default Legal;