import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  BadgeAlert, 
  FileWarning, 
  FileText,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  Scale,
  ShieldCheck,
  Undo2
} from 'lucide-react';
import NavBar from '../components/NavBar';
import ConsumerRightsHero from '../assets/ConsumerRights.png';

const ConsumerRights = () => {
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
                Purchase & Transaction Protections
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights <br />
                <span style={{ color: colors.primary }}>
                  as a Consumer!
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding refund policies, product warranties, and protection against fraud and misleading practices.
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
                  src={ConsumerRightsHero}
                  alt="Consumers shopping and making transactions" 
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
              Your Essential Consumer Rights
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Federal and state laws protect these fundamental rights for all consumers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Right to Safety */}
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
                    <ShieldCheck size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Right to Safety
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Protection from products that cause injury or harm",
                    "Products must meet safety standards and include warnings",
                    "Right to know about product recalls and safety issues",
                    "Protection from dangerous services and practices"
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
                  Product Safety Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Right to Information */}
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
                    Right to Information
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Access to accurate information about products and services",
                    "Protection from false or misleading advertising",
                    "Clear disclosure of all fees, terms, and conditions",
                    "Right to know the total cost before purchasing"
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
                  Truth in Advertising Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Right to Choose */}
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
                    <ShoppingCart size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Right to Choose
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Freedom to select from a variety of products and services",
                    "Protection from monopolistic practices",
                    "Right to compare options without pressure",
                    "Protection from unfair contract terms"
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
                  Contract Terms Guide
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
                    <BadgeAlert size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Where to Report?
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Federal Trade Commission (FTC): 1-877-382-4357",
                    "Consumer Financial Protection Bureau (CFPB)",
                    "State Attorney General's Consumer Protection Office",
                    "Better Business Bureau (BBB)"
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

      {/* Additional Consumer Rights */}
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
              Beyond the core protections, consumers are entitled to these rights
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
                icon: <Undo2 className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Right to Return",
                description: "Many retailers offer refund or exchange policies. The FTC's 'Cooling-Off Rule' gives you 3 days to cancel certain sales over $25 made at your home or temporary locations."
              },
              {
                icon: <CreditCard className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Credit Card Protections",
                description: "Limited liability for unauthorized charges ($50 maximum), right to dispute billing errors, and protection against fraudulent charges under the Fair Credit Billing Act."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Right to Dispute",
                description: "Ability to challenge unfair business practices, file complaints with consumer protection agencies, and seek remedies through small claims court or mediation."
              },
              {
                icon: <FileWarning className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Warranty Rights",
                description: "Protection under implied warranties ensuring products are fit for their intended purpose, and enforcement of explicit warranty promises made by manufacturers or retailers."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Protection from Scams",
                description: "Legal safeguards against deceptive practices, fraudulent schemes, pyramid schemes, and false representation of products or services."
              },
              {
                icon: <ShieldCheck className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Digital Privacy Rights",
                description: "Increasing protections for personal data, including rights to know what information is collected, opt-out options, and notification of data breaches."
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
              Clear answers to the most common consumer rights questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What can I do if a business refuses to honor its return policy?",
                answer: "First, ask to speak with a manager and reference the store's written policy. If unsuccessful, contact your credit card company to dispute the charge if you paid by card. You can also file a complaint with your state's consumer protection agency or the Better Business Bureau. Keep all receipts and documentation of the policy."
              },
              {
                question: "Do I have a right to a refund if I change my mind about a purchase?",
                answer: "There's no universal right to return items simply because you changed your mind. However, many retailers have voluntary return policies. For door-to-door sales over $25, the FTC's Cooling-Off Rule gives you 3 days to cancel. Online purchases may be covered by the site's return policy, which should be disclosed before purchase."
              },
              {
                question: "What should I do if I've been a victim of false advertising?",
                answer: "Document the misleading claim (save ads, emails, or take screenshots). Contact the company first to resolve the issue. If unsuccessful, file a complaint with the Federal Trade Commission (FTC), your state's attorney general's office, or the Better Business Bureau. For significant financial loss, consult with a consumer rights attorney."
              },
              {
                question: "If a product is defective, do I have to accept store credit instead of a refund?",
                answer: "For defective products, you typically have stronger rights than just store credit. Under implied warranty laws, you're entitled to a properly functioning product. If it's defective and within warranty, you generally have the right to a replacement, repair, or refund. Review the warranty terms and state consumer protection laws which often favor consumers in these situations."
              },
              {
                question: "How long do companies have to honor warranties?",
                answer: "Companies must honor warranties for the full period stated in the warranty document. Express warranties are those specifically promised (like a '2-year manufacturer's warranty'), while implied warranties (that the product is fit for ordinary use) may last longer under state law, typically 4 years. Extended warranties are separate contracts with their own terms."
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
              href="/ask-consumer-expert"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="mr-2" size={20} />
              Ask a Consumer Law Expert
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

export default ConsumerRights;