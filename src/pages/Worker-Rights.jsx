import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  HandCoins, 
  Hammer, 
  Building2, 
  FileText,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  Scale,
  Calendar,
  Clock
} from 'lucide-react';
import NavBar from '../components/NavBar';
import WorkerRightsHero from '../assets/WorkerRights.png';

const WorkersRights = () => {
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
                Employee Protections & Rights
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights <br />
                <span style={{ color: colors.primary }}>
                  as a Worker!
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding fair wages, workplace safety, and protection against unfair dismissal.
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
                  src={WorkerRightsHero}
                  alt="Diverse workers in various occupations" 
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
              Core Protections
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Your Essential Workplace Rights
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Federal and state laws protect these fundamental rights for all workers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Fair Wages Section */}
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
                    <HandCoins size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Fair Wages
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Federal minimum wage is $15.50 per hour (2025)",
                    "Overtime pay (1.5x) required for over 40 hours per week",
                    "Equal pay for equal work across gender lines",
                    "Right to view and verify pay records"
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
                  Learn More About Wage Laws
                </motion.button>
              </div>
            </motion.div>
            
            {/* Safe Working Conditions */}
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
                    <Shield size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Safe Working Conditions
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Right to a hazard-free workplace (OSHA protection)",
                    "Access to safety equipment and proper training",
                    "Right to report unsafe conditions without retaliation",
                    "Whistleblower protections for safety violations"
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
                  Workplace Safety Standards
                </motion.button>
              </div>
            </motion.div>
            
            {/* Unfair Dismissal */}
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
                    <Hammer size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Unfair Dismissal
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Protection from termination based on discrimination",
                    "Cannot be fired for reporting illegal activities",
                    "Right to know the reason for termination",
                    "Protections for workers with disabilities"
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
                  Wrongful Termination Guide
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
                    <Building2 size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Where to Report?
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Department of Labor: 1-866-487-2365",
                    "OSHA Hotline: 1-800-321-6742",
                    "Equal Employment Opportunity Commission (EEOC)",
                    "State Labor Agencies (varies by location)"
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

      {/* Additional Workers' Rights */}
      <section className="py-16 bg-opacity-20" style={{ backgroundColor: `${colors.secondary}10` }}>
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
              Beyond the core protections, workers are entitled to these rights
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
                icon: <FileText className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Leave & Time Off",
                description: "FMLA guarantees eligible employees up to 12 weeks of unpaid, job-protected leave per year for family and medical reasons."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Anti-Discrimination",
                description: "Protection from workplace discrimination based on race, color, religion, sex, national origin, age, disability, or genetic information."
              },
              {
                icon: <Calendar className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Benefits & Insurance",
                description: "Rights to access health insurance, retirement plans, and unemployment benefits under qualifying circumstances."
              },
              {
                icon: <HelpCircle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Reasonable Accommodations",
                description: "Workers with disabilities have the right to reasonable workplace accommodations that don't cause undue hardship."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Whistleblower Protections",
                description: "Legal safeguards for employees who report violations of law or regulations by their employers."
              },
              {
                icon: <Clock className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Break Time Rights",
                description: "Many states require employers to provide meal and rest breaks during work shifts of certain lengths."
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
      <section className="py-16 md:py-24" id="faq">
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
              Clear answers to the most common worker rights questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What should I do if my employer isn't paying minimum wage?",
                answer: "Document all hours worked and pay received. File a complaint with your state labor department or the U.S. Department of Labor's Wage and Hour Division. You're entitled to back pay and possibly additional damages."
              },
              {
                question: "Can my employer fire me for reporting unsafe conditions?",
                answer: "No, this is illegal retaliation. Whistleblower laws protect workers who report safety violations. If this happens, document everything and contact OSHA or an employment attorney immediately."
              },
              {
                question: "Am I entitled to breaks during my work shift?",
                answer: "Federal law doesn't require breaks, but many state laws do. Requirements vary by state, with most requiring a 30-minute meal break for shifts over 5-6 hours. Check your state's specific labor laws."
              },
              {
                question: "Can my employer discriminate based on age?",
                answer: "No. The Age Discrimination in Employment Act (ADEA) protects workers 40 and older from discrimination in hiring, promotion, discharge, compensation, or terms and conditions of employment."
              },
              {
                question: "What's the difference between an independent contractor and an employee?",
                answer: "The distinction involves control over work, financial arrangements, and relationship between parties. Misclassification is common and can deny workers proper benefits and protections. The IRS and DOL have specific tests to determine proper classification."
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
              href="/ask-expert"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="mr-2" size={20} />
              Ask an Employment Law Expert
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

export default WorkersRights;