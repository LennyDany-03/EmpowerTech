import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Scale, 
  Home, 
  FileWarning, 
  FileText,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  Coins,
  User,
  Shield
} from 'lucide-react';
import NavBar from '../components/NavBar';
import SeniorRightsHero from '../assets/SeniorRights.png';

const SeniorRights = () => {
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
                Elder Protections & Benefits
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Know Your Rights <br />
                <span style={{ color: colors.primary }}>
                  as a Senior Citizen!
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding retirement benefits, healthcare rights, protection from elder abuse, and age discrimination laws.
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
              <div className="relative rounded-xl overflow-hidden ">
                <img 
                  src={SeniorRightsHero}
                  alt="Diverse senior citizens engaged in various activities" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute "
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
              Your Essential Senior Rights
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Federal and state laws protect these fundamental rights for all senior citizens
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Social Security & Retirement Benefits */}
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
                    <Coins size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Retirement Benefits
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Social Security retirement benefits based on work history",
                    "Medicare coverage beginning at age 65",
                    "Supplemental Security Income (SSI) for low-income seniors",
                    "Protection of pension benefits under ERISA"
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
                  Benefits Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Healthcare Rights */}
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
                    <Heart size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Healthcare Rights
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Right to quality healthcare through Medicare and Medicaid",
                    "Protection against healthcare discrimination",
                    "Right to make healthcare decisions and advance directives",
                    "Access to preventive services and screenings"
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
                  Healthcare Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Protection from Age Discrimination */}
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
                    <User size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Age Discrimination
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Protection from workplace discrimination under ADEA",
                    "Right to fair housing regardless of age",
                    "Right to fair treatment in financial services",
                    "Protection from discriminatory practices in government services"
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
                  Anti-Discrimination Guide
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
                    "National Elder Fraud Hotline: 1-833-372-8311",
                    "Adult Protective Services (varies by state)",
                    "Equal Employment Opportunity Commission: 1-800-669-4000",
                    "Centers for Medicare & Medicaid Services: 1-800-633-4227"
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
                  Contact Resources
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Senior Rights */}
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
              Beyond the core protections, seniors are entitled to these rights
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
                icon: <Home className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Housing Rights",
                description: "Fair Housing Act protections, senior-specific housing options, protection from predatory lending in reverse mortgages, and home repair scams."
              },
              {
                icon: <Shield className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Elder Abuse Protection",
                description: "Legal safeguards against physical, emotional, or financial abuse. Adult Protective Services in each state provide investigation and intervention for suspected abuse."
              },
              {
                icon: <FileText className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Estate Planning Rights",
                description: "Right to create legally-binding wills, trusts, powers of attorney, and healthcare directives to ensure your wishes are honored."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Consumer Protections",
                description: "Extra legal safeguards against fraud, scams, and deceptive business practices targeting seniors. Cooling-off periods for certain purchases."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Long-term Care Rights",
                description: "Rights to quality care, dignity, and autonomy in nursing homes and assisted living facilities. Protection under the Nursing Home Reform Act."
              },
              {
                icon: <Coins className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Tax Benefits",
                description: "Eligibility for special tax credits, deductions, and property tax relief programs specifically designed for seniors and retirees."
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
              Clear answers to the most common senior rights questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "When should I start receiving Social Security benefits?",
                answer: "You can begin receiving Social Security retirement benefits as early as age 62, but your benefit amount will be reduced. Full retirement age ranges from 66 to 67 depending on your birth year. Delaying benefits until age 70 results in the maximum benefit amount. The optimal time depends on your health, life expectancy, financial situation, and other retirement income sources. Consider consulting with a financial advisor to determine the best strategy for your personal circumstances."
              },
              {
                question: "What Medicare options are available to me?",
                answer: "Medicare has several parts: Part A (hospital insurance), Part B (medical insurance), Part C (Medicare Advantage plans that combine Parts A, B, and often D), and Part D (prescription drug coverage). Original Medicare includes Parts A and B, with the option to add Part D and Medigap (supplemental insurance). Medicare Advantage (Part C) provides all your Part A and B benefits through a private insurer. Compare these options carefully based on your healthcare needs, preferred doctors, medications, and budget."
              },
              {
                question: "How can I protect myself from elder financial abuse?",
                answer: "Be cautious about sharing financial information and granting account access. Review your financial statements regularly. Be wary of unsolicited offers and high-pressure sales tactics. Never rush financial decisions. Set up direct deposit for income sources. Consider a trusted contact person for your financial accounts. Create a durable power of attorney with someone you trust completely. Report suspected abuse to Adult Protective Services in your state, law enforcement, or the National Elder Fraud Hotline at 1-833-372-8311."
              },
              {
                question: "What are my rights in a nursing home or assisted living facility?",
                answer: "You have the right to be treated with dignity and respect, freedom from abuse and restraints, privacy for personal care, management of your own finances, participation in your care planning, and choice in activities and healthcare. You can complain without retaliation, communicate privately, and keep personal possessions. Each facility must provide a written statement of residents' rights. If your rights are violated, contact the facility's ombudsman, state licensing authority, or Adult Protective Services."
              },
              {
                question: "What legal documents should I have in place as I age?",
                answer: "Essential documents include: a will to distribute your assets; durable power of attorney for finances; healthcare power of attorney; living will or advance directive; HIPAA authorization form; and possibly a revocable living trust. Keep originals in a secure place, tell trusted family members where they are, and provide copies to relevant parties (e.g., your healthcare proxy). Review these documents periodically, especially after major life changes. Consult with an elder law attorney to ensure your documents meet your needs and state requirements."
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
              href="/ask-senior-rights-expert"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="mr-2" size={20} />
              Ask a Senior Rights Expert
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

export default SeniorRights;