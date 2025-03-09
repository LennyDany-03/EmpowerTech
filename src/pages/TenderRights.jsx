import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Key, 
  Banknote, 
  FileWarning, 
  FileText,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  Scale,
  Lock,
  Wrench
} from 'lucide-react';
import NavBar from '../components/NavBar';
import TenantRightsHero from '../assets/TenantRights.png';

const TenantRights = () => {
  // Add scroll-to-top effect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Using the same color palette from HomePage for consistency
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
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
      <section className="relative overflow-hidden py-24 md:py-32" key="hero-section">
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
                Housing & Rental Protections
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights <br />
                <span style={{ color: colors.primary }}>
                  as a Tenant!
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding rental agreements, eviction laws, and navigating landlord-tenant relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.a href="#report-violations" 
                  className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="mr-2" size={20} />
                  Report Violations
                </motion.a>
                <motion.a href="#faq" 
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
                  <HelpCircle className="mr-2" size={20} />
                  Common Questions
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={TenantRightsHero}
                  alt="Diverse tenants in various housing situations" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute"
                  style={{ 
                    background: `linear-gradient(to bottom, transparent, ${colors.secondary})` 
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Rights Sections */}
      <section className="py-16 md:py-24" key="key-rights-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Core Protections
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Your Essential Tenant Rights
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Federal and state laws protect these fundamental rights for all tenants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Fair Housing Section */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="p-8"
                style={{ backgroundColor: colors.secondary }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${colors.accent}30` }}
                  >
                    <Home size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Fair Housing
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Protection from discrimination based on race, religion, nationality, disability, gender, or family status",
                    "Equal opportunity to view and apply for available housing",
                    "Right to accessible accommodations for disabilities",
                    "Protection from predatory lending in housing finance"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <div 
                        className="h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-xs font-bold" style={{ color: colors.background }}>
                          {idx + 1}
                        </span>
                      </div>
                      <span style={{ color: colors.background }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen size={16} className="mr-2" />
                  Fair Housing Act Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Rental Agreement Rights */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="p-8"
                style={{ backgroundColor: colors.primary }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${colors.accent}30` }}
                  >
                    <FileText size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Rental Agreements
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Right to a written lease with clear terms and conditions",
                    "Protection from illegal or unenforceable lease provisions",
                    "Clear disclosure of all fees, deposits, and charges",
                    "Right to copies of all documents you sign"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <div 
                        className="h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-xs font-bold" style={{ color: colors.background }}>
                          {idx + 1}
                        </span>
                      </div>
                      <span style={{ color: colors.background }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen size={16} className="mr-2" />
                  Lease Agreement Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Eviction Protection */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div 
                className="p-8"
                style={{ backgroundColor: colors.primary }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${colors.accent}30` }}
                  >
                    <Key size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Eviction Protection
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Right to proper written notice before eviction proceedings",
                    "Protection from self-help evictions (changing locks, removing belongings)",
                    "Right to a court hearing and legal defense",
                    "Protection from retaliatory evictions for exercising legal rights"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <div 
                        className="h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-xs font-bold" style={{ color: colors.background }}>
                          {idx + 1}
                        </span>
                      </div>
                      <span style={{ color: colors.background }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen size={16} className="mr-2" />
                  Eviction Process Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Where to Report */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              id="report-violations"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div 
                className="p-8"
                style={{ backgroundColor: colors.secondary }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${colors.accent}30` }}
                  >
                    <FileWarning size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Where to Report?
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "HUD Fair Housing Complaint Hotline: 1-800-669-9777",
                    "Local Housing Authority or Rent Board",
                    "State Attorney General's Consumer Protection Division",
                    "Legal Aid or Tenant Advocacy Organizations"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <div 
                        className="h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-xs font-bold" style={{ color: colors.background }}>
                          {idx + 1}
                        </span>
                      </div>
                      <span style={{ color: colors.background }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={16} className="mr-2" />
                  Contact Information Directory
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Tenant Rights */}
      <section className="py-16 bg-opacity-20" style={{ backgroundColor: `${colors.secondary}10` }} key="additional-rights-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Additional Protections
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Other Important Rights
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Beyond the core protections, tenants are entitled to these rights
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
                icon: <Lock className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Right to Privacy",
                description: "Landlords must provide reasonable notice (typically 24-48 hours) before entering your rental unit, except in emergencies."
              },
              {
                icon: <Wrench className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Habitable Housing",
                description: "Right to a home that meets basic health and safety standards, including working plumbing, heating, electricity, and structurally sound building."
              },
              {
                icon: <Banknote className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Security Deposit Rights",
                description: "Protection from excessive deposits, right to itemized deductions, and timely return of deposit after move-out (typically 14-30 days)."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Right to Repairs",
                description: "Landlords must make necessary repairs in a timely manner to keep the property habitable and meeting all health and safety codes."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Protection from Retaliation",
                description: "Landlords cannot retaliate (through rent increases, eviction, etc.) against tenants who exercise their legal rights or report code violations."
              },
              {
                icon: <FileText className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Rent Control & Stabilization",
                description: "In many cities and states, tenants have protections against unreasonable rent increases and arbitrary evictions in rent-controlled units."
              },
            ].map((right, index) => (
              <motion.div 
                key={index}
                className="rounded-xl p-6 text-center relative overflow-hidden h-full"
                style={{ 
                  backgroundColor: `${colors.secondary}05`,
                  color: colors.text,
                  border: `1px solid ${colors.secondary}20`
                }}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center h-full">
                  <div className="mb-4 p-3 rounded-full bg-white/10">
                    {right.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {right.title}
                  </h3>
                  <p className="opacity-80">{right.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24" id="faq" key="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Common Questions
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Frequently Asked Questions
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Clear answers to the most common tenant rights questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Can my landlord raise the rent without notice?",
                answer: "Generally, no. Most states require landlords to provide written notice before increasing rent (typically 30-60 days). In rent-controlled areas, there are additional restrictions on how much and how often rent can be increased. Always check your lease and local laws."
              },
              {
                question: "What can I do if my landlord won't make repairs?",
                answer: "First, document the issue and send a formal written request. If the landlord still refuses, you may have several options depending on your location: withholding rent (in escrow), repair-and-deduct, filing a complaint with local housing authorities, or breaking the lease without penalty in severe cases."
              },
              {
                question: "Can a landlord enter my apartment without permission?",
                answer: "No, except in genuine emergencies. Landlords must provide advance notice (typically 24-48 hours) before entering your unit for inspections, repairs, or to show the unit to prospective tenants. Specific notice requirements vary by state."
              },
              {
                question: "How quickly should I get my security deposit back?",
                answer: "Most states require landlords to return security deposits within 14-30 days after you move out. They must provide an itemized list of any deductions. If they fail to return your deposit within the legal timeframe, you may be entitled to additional damages."
              },
              {
                question: "Can I break my lease early?",
                answer: "You can legally break a lease under certain circumstances: active military duty, uninhabitable conditions, landlord harassment, or if the landlord breaches the lease. Otherwise, breaking a lease may result in penalties, though you can minimize costs by finding a replacement tenant or negotiating with your landlord."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="p-6"
                  style={{ backgroundColor: `${colors.secondary}10` }}
                >
                  <h3 
                    className="text-lg font-semibold mb-3 flex items-start"
                    style={{ color: colors.text }}
                  >
                    <span 
                      className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.primary, color: colors.background }}
                    >
                      Q
                    </span>
                    {faq.question}
                  </h3>
                  <div 
                    className="ml-9 pl-3 border-l-2"
                    style={{ borderColor: colors.accent }}
                  >
                    <p style={{ color: `${colors.text}90` }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.a 
              href="/ask-housing-expert"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="mr-2" size={20} />
              Ask a Housing Law Expert
            </motion.a>
          </div>
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

export default TenantRights;