import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  Scale, 
  FileText, 
  FileWarning, 
  Info,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  ClipboardList,
  Building2,
  Clock
} from 'lucide-react';
import NavBar from '../components/NavBar';
import RTIHero from '../assets/RightToInformation.png';

const RTI = () => {
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
                Transparency & Accountability
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Right to <br />
                <span style={{ color: colors.primary }}>
                  Information
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: colors.text }}>
                Understanding how to request government data, access public records, and promote transparency in governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.a href="#file-rti" 
                  className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="mr-2" size={20} />
                  File RTI Request
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
                  src={RTIHero}
                  alt="Citizens accessing government information and documents" 
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
              Core Principles
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Your Right to Information
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Understanding the fundamental principles and frameworks of RTI legislation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* RTI Fundamentals */}
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
                    <Info size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    RTI Fundamentals
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Right to request and receive information from public authorities",
                    "Promotes transparency and accountability in government",
                    "Empowers citizens to participate in democratic processes",
                    "Helps combat corruption and improves governance"
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
                  RTI Act Guide
                </motion.button>
              </div>
            </motion.div>
            
            {/* Information Types */}
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
                    <FileSearch size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Information Types
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Government policies, decisions, and expenditures",
                    "Public records, reports, and official documents",
                    "Information about government contracts and tenders",
                    "Data related to public services and welfare programs"
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
                  Information Categories
                </motion.button>
              </div>
            </motion.div>
            
            {/* Legal Framework */}
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
                    <Scale size={28} style={{ color: colors.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.background }}>
                    Legal Framework
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "RTI Act establishes the legal right to information",
                    "Outlines procedures for requesting and receiving information",
                    "Defines roles and responsibilities of Public Information Officers",
                    "Establishes appeal mechanisms for denied requests"
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
                  Legal Provisions
                </motion.button>
              </div>
            </motion.div>
            
            {/* Where to Apply */}
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              id="file-rti"
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
                    Where to Apply?
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Central Public Information Officers (CPIOs) for federal agencies",
                    "State Public Information Officers (SPIOs) for state departments",
                    "Online RTI portals for electronic filing",
                    "Information Commission for appeals and complaints"
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
                  Application Directory
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RTI Process */}
      <section className="py-16 bg-opacity-20" style={{ backgroundColor: `${colors.secondary}10` }} key="application-process-section">
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
              RTI Application Process
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              How to file an effective RTI application and follow up on your request
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
                title: "Draft Your Application",
                description: "Write a clear, specific application identifying the public authority and the information you seek. Keep questions focused and avoid vague or overly broad requests."
              },
              {
                icon: <ClipboardList className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Submit Application",
                description: "Submit your application to the relevant Public Information Officer (PIO) either in person, by mail, or online through RTI portals. Include the required application fee."
              },
              {
                icon: <Clock className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Await Response",
                description: "The public authority must respond within 30 days (or 48 hours if the information concerns life or liberty). They may provide the information or explain why it's exempt."
              },
              {
                icon: <FileWarning className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "File First Appeal",
                description: "If dissatisfied with the response or if no response is received, file a first appeal with the First Appellate Authority within 30 days of the decision or deadline."
              },
              {
                icon: <AlertTriangle className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Second Appeal",
                description: "If still unsatisfied, file a second appeal to the Information Commission within 90 days of receiving the first appeal decision or when it was due."
              },
              {
                icon: <Scale className="w-12 h-12" style={{ color: colors.primary }} />,
                title: "Seek Legal Remedies",
                description: "If needed, pursue legal remedies through the courts, including writs and public interest litigation for systemic issues related to transparency."
              },
            ].map((step, index) => (
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
                    {step.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {step.title}
                  </h3>
                  <p className="opacity-80">{step.description}</p>
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
              Clear answers to the most common RTI questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What type of information can I request through RTI?",
                answer: "You can request any information held by public authorities, including documents, records, memos, emails, opinions, advices, press releases, circulars, orders, logbooks, contracts, reports, papers, samples, models, and electronic data. This includes information related to government policies, decisions, expenditures, public services, and welfare programs. However, certain categories of information are exempt, such as those affecting national security, prohibited by court, or involving personal privacy."
              },
              {
                question: "What is the fee for filing an RTI application?",
                answer: "The RTI application fee is typically ₹10 for central government departments and varies for state governments (usually between ₹10-50). This fee can be paid through cash, postal order, demand draft, or online payment depending on the submission method. Additional charges may apply for providing information in certain formats, such as ₹2 per page for photocopies or actual cost for samples, models, or printed material. Importantly, individuals below the poverty line (BPL) are exempt from paying any fees."
              },
              {
                question: "Can my RTI request be rejected?",
                answer: "Yes, an RTI request can be rejected under specific exemptions outlined in Section 8 of the RTI Act. These include information that would compromise national security, breach parliamentary privilege, harm competitive positions of third parties, endanger life or physical safety, impede investigations, or invade personal privacy. Additionally, information involving cabinet papers, trade secrets, intellectual property, or fiduciary relationships may be exempt. However, the public authority must provide reasons for rejection, and information that cannot be denied to Parliament/Legislature cannot be denied to citizens."
              },
              {
                question: "What can I do if I don't receive a response within 30 days?",
                answer: "If you don't receive a response within the 30-day timeline (or 48 hours for matters concerning life and liberty), you can file a first appeal with the First Appellate Authority of the concerned public authority. This appeal should be filed within 30 days of the expiry of the original timeframe. If the first appeal doesn't yield results, you can file a second appeal with the Central or State Information Commission within 90 days of the first appeal decision or when it was due. The Commission has the power to impose penalties on PIOs for delays."
              },
              {
                question: "How do I find the correct Public Information Officer (PIO) for my RTI?",
                answer: "To find the correct PIO, first identify the public authority that likely holds the information you're seeking. Visit the official website of that department or organization, which should have a dedicated RTI section listing their PIOs. Alternatively, you can call the public authority's main office and ask for PIO details. For central government departments, you can consult the RTI Portal (rti.gov.in) which maintains a directory of CPIOs. If you're unsure, you can address your application to the PIO of the main office, who is obligated to transfer it to the appropriate PIO within 5 days if it doesn't fall under their jurisdiction."
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
              href="/ask-rti-expert"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="mr-2" size={20} />
              Ask an RTI Expert
            </motion.a>
          </div>
        </div>
      </section>

      {/* Sample RTI Application */}
      <section className="py-16 bg-opacity-20" style={{ backgroundColor: `${colors.secondary}10` }} key="sample-application-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                color: colors.accent
              }}
            >
              Template & Example
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Sample RTI Application
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Use this template as a guide for drafting your own RTI application
            </p>
          </div>
          
          <motion.div 
            className="rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="p-8"
              style={{ backgroundColor: 'white' }}
            >
              <div className="mb-6 text-center">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  APPLICATION UNDER THE RIGHT TO INFORMATION ACT, 2005
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>To,</p>
                  <p style={{ color: colors.text }}>
                    The Public Information Officer<br />
                    [Name of the Public Authority]<br />
                    [Address]
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>Subject: Request for Information under RTI Act, 2005</p>
                </div>
                
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>Sir/Madam,</p>
                  <p style={{ color: colors.text }}>
                    I would like to seek the following information under the provisions of the Right to Information Act, 2005:
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>Information Required:</p>
                  <ol className="list-decimal pl-5 space-y-2" style={{ color: colors.text }}>
                    <li>
                      [Clearly state the specific information you are seeking]
                    </li>
                    <li>
                      [Add additional points as needed, keeping each point specific and clear]
                    </li>
                    <li>
                      [For time period specific information, clearly mention the relevant dates]
                    </li>
                  </ol>
                </div>
                
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>Mode of Information:</p>
                  <p style={{ color: colors.text }}>
                    I would like to receive the above information in the form of [specify: certified copies / printouts / electronic format / inspection of documents].
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>Application Fee Details:</p>
                  <p style={{ color: colors.text }}>
                    I am enclosing herewith an application fee of ₹10/- via [specify mode: IPO / DD / Banker's Cheque / Cash / Online Payment].
                  </p>
                </div>
                
                <div>
                  <p style={{ color: colors.text }}>
                    Kindly provide the requisite information within 30 days as prescribed under Section 7(1) of the RTI Act, 2005.
                  </p>
                </div>
                
                <div>
                  <p className="mt-6" style={{ color: colors.text }}>
                    Yours faithfully,<br /><br />
                    [Your Name]<br />
                    [Your Address]<br />
                    [Contact Number]<br />
                    [Email Address]<br />
                    Date: [Current Date]
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <motion.button 
                  className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: 'white' 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText size={16} className="mr-2" />
                  Download RTI Template
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
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
              Real Impact
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              RTI Success Stories
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              How citizens have used RTI to drive positive change and accountability
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Exposing Corruption in Public Works",
                description: "An RTI activist uncovered a major corruption scheme in public infrastructure projects by requesting documents related to contract awards and expenditures. The findings led to official investigations and recovery of misappropriated funds."
              },
              {
                title: "Improving School Facilities",
                description: "Parents in a rural community used RTI to obtain information about education budget allocations. The data revealed funds meant for school infrastructure were unused, leading to proper utilization and improved facilities."
              },
              {
                title: "Securing Pension Benefits",
                description: "A senior citizen who was denied pension benefits for years used RTI to discover that his application had been approved but never processed. With this evidence, he was able to secure his rightful benefits with back payments."
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

export default RTI;