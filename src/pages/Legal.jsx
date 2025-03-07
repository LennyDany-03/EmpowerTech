import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  // Legal guides data
  const legalGuides = [
    {
      id: 1,
      title: "Workers' Rights",
      description: "Minimum wage, working hours, harassment policies.",
      icon: <UserCheck className="w-6 h-6" />,
      link: "/legal/workers-rights",
    },
    {
      id: 2,
      title: "Tenant Rights",
      description: "Rental agreements, eviction laws.",
      icon: <Info className="w-6 h-6" />,
      link: "/legal/tenant-rights",
    },
    {
      id: 3,
      title: "Consumer Rights",
      description: "Refund policies, fraud complaints.",
      icon: <Award className="w-6 h-6" />,
      link: "/legal/consumer-rights",
    },
    {
      id: 4,
      title: "Cyber Laws",
      description: "Online scams, social media privacy, data protection.",
      icon: <AlertTriangle className="w-6 h-6" />,
      link: "/legal/cyber-laws",
    },
    {
      id: 5,
      title: "Women's Rights",
      description: "Protection against harassment, maternity benefits.",
      icon: <Award className="w-6 h-6" />,
      link: "/legal/womens-rights",
    },
    {
      id: 6,
      title: "Senior Citizens' Rights",
      description: "Pension, elderly abuse protection.",
      icon: <Info className="w-6 h-6" />,
      link: "/legal/senior-rights",
    },
    {
      id: 7,
      title: "Right to Information (RTI)",
      description: "How to request government data.",
      icon: <FileText className="w-6 h-6" />,
      link: "/legal/rti",
    },
    {
      id: 8,
      title: "Legal Aid for Low-Income Groups",
      description: "Free legal support programs.",
      icon: <Scale className="w-6 h-6" />,
      link: "/legal/legal-aid",
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
                  <Link 
                    to={guide.link}
                    className="flex items-center text-sm font-medium"
                    style={{ color: colors.primary }}
                  >
                    Read More <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* File a Complaint */}
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
              Report Violations
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              File a Complaint
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Submit your legal grievances and track their resolution status
            </p>
          </div>

          <motion.div 
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3">
              <div 
                className="p-8 md:p-12"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.background
                }}
              >
                <h3 className="text-2xl font-bold mb-6">What to Include</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Clear Details</h4>
                      <p className="opacity-80">Provide specific dates, names, and event descriptions.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Supporting Evidence</h4>
                      <p className="opacity-80">Attach any relevant documents, photos, or receipts.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Desired Outcome</h4>
                      <p className="opacity-80">State what resolution you're seeking from this complaint.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <button 
                    className="flex items-center mt-4 px-4 py-2 rounded-lg font-medium"
                    style={{ 
                      backgroundColor: colors.background, 
                      color: colors.primary
                    }}
                    onClick={generatePDF}
                  >
                    <Download size={16} className="mr-2" />
                    Download Template
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-12">
                <form onSubmit={handleSubmitComplaint}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={complaintData.name}
                        onChange={handleComplaintChange}
                        className="w-full px-4 py-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${colors.secondary}10`,
                          color: colors.text,
                          borderColor: `${colors.primary}30`
                        }}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={complaintData.email}
                        onChange={handleComplaintChange}
                        className="w-full px-4 py-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${colors.secondary}10`,
                          color: colors.text,
                          borderColor: `${colors.primary}30`
                        }}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={complaintData.phone}
                        onChange={handleComplaintChange}
                        className="w-full px-4 py-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${colors.secondary}10`,
                          color: colors.text,
                          borderColor: `${colors.primary}30`
                        }}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Complaint Type
                      </label>
                      <select
                        name="complaintType"
                        value={complaintData.complaintType}
                        onChange={handleComplaintChange}
                        className="w-full px-4 py-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${colors.secondary}10`,
                          color: colors.text,
                          borderColor: `${colors.primary}30`
                        }}
                        required
                      >
                        <option value="">Select complaint type</option>
                        <option value="labor">Labor Rights Violation</option>
                        <option value="consumer">Consumer Fraud</option>
                        <option value="police">Police Misconduct</option>
                        <option value="landlord">Landlord-Tenant Dispute</option>
                        <option value="discrimination">Discrimination</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Complaint Description
                    </label>
                    <textarea
                      name="description"
                      value={complaintData.description}
                      onChange={handleComplaintChange}
                      rows="5"
                      className="w-full px-4 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`,
                        color: colors.text,
                        borderColor: `${colors.primary}30`
                      }}
                      placeholder="Describe your complaint in detail..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <motion.button 
                      type="submit"
                      className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                      style={{ 
                        backgroundColor: colors.primary, 
                        color: colors.background 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Complaint
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Legal Advisor */}
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
              Get Quick Answers
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              AI-Powered Legal Advisor
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Ask common legal questions and get simplified answers with relevant legal references
            </p>
          </div>

          <motion.div 
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Ask a Question</h3>
                <form onSubmit={handleAskAI}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Your Legal Question
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows="5"
                      className="w-full px-4 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`,
                        color: colors.text,
                        borderColor: `${colors.primary}30`
                      }}
                      placeholder="Example: Can my landlord increase rent suddenly?"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <motion.button 
                      type="submit"
                      className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                      style={{ 
                        backgroundColor: colors.accent, 
                        color: colors.background 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bot size={20} className="mr-2" />
                      Ask AI
                    </motion.button>
                  </div>
                </form>

                <div className="mt-8">
                  <h4 className="font-bold mb-4" style={{ color: colors.text }}>Sample Questions:</h4>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        className="text-left w-full p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ color: colors.primary }}
                        onClick={() => setQuestion("Can my landlord increase rent suddenly?")}
                      >
                        Can my landlord increase rent suddenly?
                      </button>
                    </li>
                    <li>
                      <button 
                        className="text-left w-full p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ color: colors.primary }}
                        onClick={() => setQuestion("How do I file a complaint if my salary is delayed?")}
                      >
                        How do I file a complaint if my salary is delayed?
                      </button>
                    </li>
                    <li>
                      <button 
                        className="text-left w-full p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ color: colors.primary }}
                        onClick={() => setQuestion("What are my rights if I am arrested?")}
                      >
                        What are my rights if I am arrested?
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div 
                className="p-8 md:p-12"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-2 rounded-full mr-3"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.background
                    }}
                  >
                    <Bot size={24} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                    AI Response
                  </h3>
                </div>
                
                <div 
                  className="rounded-xl p-6 min-h-64"
                  style={{ 
                    backgroundColor: 'white',
                    color: colors.text
                  }}
                >
                  {aiResponse ? (
                    <div>
                      <p className="mb-4">{aiResponse}</p>
                      <div className="mt-6 pt-4 border-t" style={{ borderColor: `${colors.secondary}20` }}>
                        <p className="text-sm opacity-60">
                          Note: This is general information and may not apply to your specific situation. 
                          Consider consulting with a legal professional for personalized advice.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 opacity-70">
                      <MessageSquare size={48} className="mx-auto mb-4" style={{ color: colors.primary }} />
                      <p>Ask a question to get an AI-powered legal response</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Find a Lawyer (Legal Aid) */}
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
              Get Professional Help
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Find a Lawyer (Legal Aid)
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Connect with government-provided free legal aid services and consultation
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Government Legal Aid",
                description: "Access free legal services provided by the government for eligible citizens.",
                buttonText: "Check Eligibility",
                icon: <Scale size={32} style={{ color: colors.primary }} />,
              },
              {
                title: "Pro Bono Attorneys",
                description: "Find lawyers offering free services for public interest and social justice cases.",
                buttonText: "Find Pro Bono Help",
                icon: <Award size={32} style={{ color: colors.primary }} />,
              },
              {
                title: "Legal Clinics",
                description: "Attend free community legal clinics for basic advice and document assistance.",
                buttonText: "Locate Nearby Clinics",
                icon: <Search size={32} style={{ color: colors.primary }} />,
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-xl p-8 text-center relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="mb-6 p-4 rounded-full"
                    style={{ 
                      backgroundColor: `${colors.primary}20`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: colors.text }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="mb-6 opacity-80"
                    style={{ color: colors.text }}
                  >
                    {item.description}
                  </p>
                  <motion.button 
                    className="mt-auto px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg w-full"
                    style={{ 
                      backgroundColor: colors.primary, 
                      color: colors.background 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.buttonText}
                  </motion.button>
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
                Making government policies and legal rights accessible for everyone.
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
                Legal Resources
              </h4>
              <ul className="space-y-2">
                {['Legal Database', 'Rights Guides', 'Complaint Templates', 'Legal Aid Directory'].map((item, index) => (
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
                Support
              </h4>
              <ul className="space-y-2">
                {['FAQs', 'Contact Us', 'Report Issues', 'Feedback'].map((item, index) => (
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
                Stay updated with legal rights information and policy changes.
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

export default Legal;