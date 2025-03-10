import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  BookOpen, 
  Sparkles, 
  PenTool
} from 'lucide-react';
import NavBar from '../components/NavBar';

import Lenny from '../assets/lenny.jpg';
import Harish from '../assets/Harish.jpg';
import Mirulla from '../assets/Mirulla.jpg';
import Ananya from '../assets/Ananya.jpg';

const AboutUs = () => {
  // Color palette matching HomePage
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Lenny Dany D",
      role: "Founder & Chief Strategist",
      bio: "Passionate about making policy accessible and engaging for everyone.",
      image: Lenny,
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Harish Dharrsan S S",
      role: "Education Director",
      bio: "Expert in transforming complex ideas into interactive learning experiences.",
      image: Harish,
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Mirulaa Srithar",
      role: "Policy Research Lead",
      bio: "Dedicated to breaking down policy barriers and empowering citizens.",
      image: Mirulla,
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Ananya S",
      role: "Technology Director",
      bio: "Innovator in creating digital platforms that make learning intuitive.",
      image: Ananya,
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  // Core values data
  const coreValues = [
    {
      icon: <Target className="w-12 h-12" style={{ color: colors.primary }} />,
      title: "Clarity",
      description: "Demystifying complex policy language into understandable insights.",
    },
    {
      icon: <Sparkles className="w-12 h-12" style={{ color: colors.primary }} />,
      title: "Innovation",
      description: "Continuously developing creative approaches to policy education.",
    },
    {
      icon: <PenTool className="w-12 h-12" style={{ color: colors.primary }} />,
      title: "Empowerment",
      description: "Equipping citizens with knowledge to make informed decisions.",
    }
  ];

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
              Who We Are
            </div>
            <h1 
              className="text-4xl md:text-5xl font-bold"
              style={{ color: colors.text }}
            >
              Transforming Policy Understanding
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              We're dedicated to making policy information accessible, comprehensible, 
              and actionable for every citizen.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
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
              Our Mission
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Policy Learning Hub
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              Breaking down complex governmental policies into clear, actionable insights 
              that empower citizens to understand and engage with their rights.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
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
                    {value.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {value.title}
                  </h3>
                  <p className="opacity-80">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Team
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.text }}
            >
              Meet the Experts
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mt-4"
              style={{ color: `${colors.text}80` }}
            >
              A passionate team dedicated to democratizing policy knowledge
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="rounded-xl p-4 text-center relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 rounded-full overflow-hidden mx-auto w-48 h-48">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.primary }}
                >
                  {member.name}
                </h3>
                <p 
                  className="text-sm mb-3"
                  style={{ color: colors.accent }}
                >
                  {member.role}
                </p>
                <p className="opacity-80 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a 
                    href={member.socialLinks.linkedin} 
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ color: colors.text }}
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.socialLinks.twitter} 
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ color: colors.text }}
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;