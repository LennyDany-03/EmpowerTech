import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  FileText, 
  UserCheck, 
  FileWarning, 
  Building,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  Landmark,
  Users,
  MessageSquare
} from 'lucide-react';
import NavBar from '../components/NavBar';
import LegalAidHero from '../assets/LowIncome.png';

const LegalAid_LowIncome = () => {
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
                Free Legal Assistance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Legal Aid for <br />
                <span style={{ color: colors.primary }}>
                  Low-Income Groups
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding your right to free legal representation, assistance programs, and how to access justice regardless of financial status.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.a href="#find-legal-aid" 
                  className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserCheck className="mr-2" size={20} />
                  Find Legal Aid
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
                  src={LegalAidHero}
                  alt="Legal professionals providing assistance to low-income individuals" 
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

      {/* Key Services Sections */}
      <section className="py-16 md:py-24" key="key-services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Essential Services
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Legal Aid Services
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Understanding the free and low-cost legal services available to low-income individuals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Legal Representation */}
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
                    <Landmark size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Legal Representation
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Free court representation for qualifying low-income individuals",
                    "Assistance with civil matters including housing, family, and consumer issues",
                    "Defense in criminal cases for those who cannot afford attorneys",
                    "Representation at administrative hearings for public benefits"
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
                  Court Representation Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Legal Advice & Counseling */}
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
                    <MessageSquare size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Legal Advice & Counseling
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Free legal consultations with attorneys",
                    "Guidance on understanding your legal rights and options",
                    "Assistance with legal document review",
                    "Advice on navigating complex legal systems"
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
                  Legal Advice Services
                </motion.button>
              </div>
            </motion.div>
            
            {/* Document Preparation */}
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
                    <FileText size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Document Preparation
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Assistance with completing legal forms and documents",
                    "Help with drafting pleadings for self-represented litigants",
                    "Preparation of wills, powers of attorney, and other essential documents",
                    "Support with filing court documents and understanding deadlines"
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
                  Document Assistance
                </motion.button>
              </div>
            </motion.div>
            
            {/* Where to Find Help */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              id="find-legal-aid"
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
                    <Building size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Where to Find Help
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Legal Aid Societies: Community-based legal services",
                    "Pro Bono Programs: Free services from private attorneys",
                    "Law School Clinics: Services provided by supervised law students",
                    "Court Help Centers: Self-help resources in courthouse locations"
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
                  Legal Aid Directory
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Information */}
      <section className="py-16 bg-opacity-20" style={{ backgroundColor: `${colors.secondary}10` }} key="eligibility-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Qualification Criteria
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Who Qualifies for Legal Aid?
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Understanding eligibility requirements for free or low-cost legal assistance
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
                icon: <Users className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Income Guidelines",
                description: "Most legal aid services are available to individuals with income below 125-200% of the federal poverty level. This threshold may vary by program and location."
              },
              {
                icon: <FileWarning className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Case Types",
                description: "Legal aid typically covers civil matters like housing, family law, public benefits, consumer issues, and immigration. Criminal defense is usually handled separately through public defenders."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Special Populations",
                description: "Some programs offer specialized services for seniors, veterans, domestic violence survivors, people with disabilities, or other vulnerable groups regardless of income."
              },
              {
                icon: <UserCheck className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Documentation Needed",
                description: "To qualify, be prepared to provide proof of income, assets, household size, citizenship/immigration status, and details about your legal issue."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Case Merit Assessment",
                description: "Legal aid providers assess whether your case has merit and falls within their priorities, as resources are limited and they must focus on impactful issues."
              },
              {
                icon: <Building className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Geographic Restrictions",
                description: "Most legal aid organizations serve specific geographic areas. You'll typically need to seek assistance from providers that serve your county or region of residence."
              },
            ].map((criterion, index) => (
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
                    {criterion.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {criterion.title}
                  </h3>
                  <p className="opacity-80">{criterion.description}</p>
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
              Clear answers to the most common legal aid questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What is the difference between a public defender and legal aid?",
                answer: "Public defenders are government-appointed attorneys who represent individuals in criminal cases who cannot afford a lawyer. They are typically employed by the state or county. Legal aid organizations, on the other hand, are usually nonprofit entities that provide free civil legal services to low-income individuals. These services cover issues like housing, family law, consumer problems, and public benefits. While public defenders focus exclusively on criminal defense, legal aid organizations handle non-criminal matters that affect basic necessities and rights."
              },
              {
                question: "What should I bring to my first legal aid appointment?",
                answer: "For your first appointment, bring: identification documents (ID, driver's license); proof of income (pay stubs, benefit statements, tax returns); documentation of assets (bank statements, property records); proof of citizenship or immigration status if relevant; any paperwork related to your case (court documents, letters, contracts, leases, etc.); a chronological list of important events related to your case; and contact information for any relevant parties. Being organized and thorough will help the legal aid provider assess your situation more effectively and determine how they can assist you."
              },
              {
                question: "What happens if I don't qualify for legal aid?",
                answer: "If you don't qualify for legal aid, you still have options: Look for moderate means programs that offer reduced-fee services based on a sliding scale; contact your local bar association, which may have lawyer referral services with discounted initial consultations; check if your area has any law school clinics providing free services; research self-help resources at courthouse help centers, law libraries, or online; seek assistance from court-based facilitators for specific issues like family law; or investigate whether you qualify for pro bono (free) representation through local bar associations or law firms' pro bono programs."
              },
              {
                question: "How long will it take to get help from legal aid?",
                answer: "Wait times for legal aid services vary widely depending on the organization's resources, the complexity and urgency of your case, and current demand. For emergencies like imminent evictions or domestic violence situations, many legal aid providers offer same-day or expedited assistance. For non-emergency matters, initial consultations might be scheduled within a few days to several weeks. Full representation cases may have longer wait times due to high demand and limited resources. Most legal aid organizations use triage systems to prioritize cases involving immediate risks to basic needs, safety, or essential benefits."
              },
              {
                question: "Can legal aid help with immigration cases?",
                answer: "Yes, many legal aid organizations provide immigration assistance, though services and eligibility requirements vary by location. Common immigration services include help with family-based petitions, naturalization applications, asylum claims, VAWA (Violence Against Women Act) self-petitions, U visas for crime victims, T visas for trafficking victims, DACA (Deferred Action for Childhood Arrivals) applications, and deportation defense. Specialized immigration legal services may have different income eligibility guidelines than general legal aid. Some organizations focus exclusively on immigration matters, while others include it among broader services. Contact your local legal aid or immigrant rights organizations to learn about specific services in your area."
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
              href="/find-legal-aid"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserCheck className="mr-2" size={20} />
              Find Legal Aid Near You
            </motion.a>
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
              Real Impact
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Legal Aid Success Stories
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              How free legal services have helped low-income individuals access justice
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Preventing Unjust Eviction",
                description: "A single mother of three faced eviction during the pandemic despite qualifying for emergency rental assistance. With legal aid representation, she proved the landlord's violation of eviction moratorium rules, secured time to access assistance funds, and maintained stable housing for her family."
              },
              {
                title: "Securing Disability Benefits",
                description: "An elderly veteran with serious health conditions was wrongfully denied disability benefits. A legal aid attorney helped appeal the decision, gathered proper medical documentation, and successfully overturned the denial, securing both current benefits and substantial back payments."
              },
              {
                title: "Escaping Domestic Violence",
                description: "A domestic violence survivor received critical legal help to obtain a protection order, secure safe custody arrangements for her children, and navigate divorce proceedings. Legal aid provided representation throughout the process, helping her establish safety and independence."
              },
            ].map((story, index) => (
              <motion.div 
                key={index}
                className="rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div 
                  className="p-8"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? colors.secondary : colors.primary,
                    color: colors.background
                  }}
                >
                  <h3 className="text-xl font-bold mb-4">{story.title}</h3>
                  <p className="opacity-90">{story.description}</p>
                  <motion.button 
                    className="mt-6 flex items-center text-sm font-medium"
                    style={{ color: colors.accent }}
                    whileHover={{ x: 5 }}
                  >
                    Read Full Story &rarr;
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
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
              Step-by-Step Guide
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              How to Apply for Legal Aid
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Follow these steps to request free or low-cost legal assistance
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "Locate Your Local Legal Aid Organization",
                description: "Find your nearest legal aid service using our directory, by contacting your local bar association, or by calling the Legal Services Corporation at 1-800-333-8666."
              },
              {
                number: "02",
                title: "Check Eligibility Requirements",
                description: "Review the organization's income guidelines and service areas to confirm you qualify. Most programs serve clients with incomes below 125-200% of the federal poverty level."
              },
              {
                number: "03",
                title: "Gather Required Documentation",
                description: "Prepare identification, proof of income (pay stubs, tax returns), documentation about your legal issue, and any relevant court papers or notices."
              },
              {
                number: "04",
                title: "Contact the Legal Aid Office",
                description: "Call during intake hours or apply online. Some organizations have walk-in hours, while others require appointments or telephone interviews."
              },
              {
                number: "05",
                title: "Complete Intake Process",
                description: "Participate in an intake interview where staff will assess your legal issue, confirm your eligibility, and determine what services they can provide."
              },
              {
                number: "06",
                title: "Meet with a Legal Representative",
                description: "If accepted, you'll be scheduled to meet with an attorney, paralegal, or legal advocate who will discuss your case and the assistance they can provide."
              },
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="flex mb-8 md:mb-16 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mr-4 md:mr-8"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.background
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 
                    className="text-xl md:text-2xl font-bold mb-2"
                    style={{ color: colors.text }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-base md:text-lg"
                    style={{ color: `${colors.text}90` }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <div className="mt-12 text-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
                style={{ 
                  backgroundColor: colors.primary, 
                  color: colors.background 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="mr-2" size={20} />
                Download Application Checklist
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
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
              Additional Tools
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Self-Help Resources
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Access these tools and resources if you're handling your legal matter independently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Form Templates",
                description: "Access free, state-specific legal forms for common issues like landlord-tenant disputes, small claims, and family law matters.",
                buttonText: "Browse Forms Library"
              },
              {
                title: "Court Procedure Guides",
                description: "Step-by-step explanations of court processes, filing procedures, and what to expect during hearings and trials.",
                buttonText: "View Court Guides"
              },
              {
                title: "Know Your Rights Handbooks",
                description: "Downloadable guides explaining your legal rights in various situations, from housing to employment to consumer protection.",
                buttonText: "Download Handbooks"
              },
              {
                title: "Legal Research Tools",
                description: "Resources for finding and understanding relevant laws, regulations, and court decisions that affect your case.",
                buttonText: "Access Research Tools"
              },
              {
                title: "Self-Help Videos",
                description: "Instructional videos explaining legal concepts, document preparation, and courtroom procedures in plain language.",
                buttonText: "Watch Video Library"
              },
              {
                title: "Legal Glossary",
                description: "A comprehensive glossary explaining legal terminology in plain, easy-to-understand language for non-lawyers.",
                buttonText: "View Legal Terms"
              },
            ].map((resource, index) => (
              <motion.div 
                key={index}
                className="rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="p-8 flex flex-col h-full"
                  style={{ 
                    backgroundColor: 'white',
                    color: colors.text
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: colors.primary }}
                  >
                    {resource.title}
                  </h3>
                  <p 
                    className="mb-6 flex-grow"
                    style={{ color: colors.text }}
                  >
                    {resource.description}
                  </p>
                  <motion.button 
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center self-start mt-auto"
                    style={{ 
                      backgroundColor: colors.primary, 
                      color: 'white' 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {resource.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
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

export default LegalAid_LowIncome;