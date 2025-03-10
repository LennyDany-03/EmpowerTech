import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Users, 
  BookOpen, 
  Award,
  Clock
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ContactAbout = () => {
  // Color palette matching your app
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
    text: '#451851',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800'
  };

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Team members data for About Us section
  const teamMembers = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Founder & Policy Expert",
      bio: "Emma founded Policy Learning Hub with a vision to make policy education accessible to everyone."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Education Director",
      bio: "Michael brings 15 years of experience in educational content development and curriculum design."
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Policy Researcher",
      bio: "Sophia specializes in analyzing government policies and translating complex topics into simple lessons."
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Tech Lead",
      bio: "James oversees our digital platform development, ensuring interactive and engaging learning experiences."
    }
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send form data to Supabase contact_messages table
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
        
      if (error) throw error;
      
      // Show success message and reset form
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
      
      <div 
        className="min-h-screen pt-20 pb-12 px-4 sm:px-6"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Contact Us Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: colors.text }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Get In Touch
              </motion.h1>
              <motion.p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: colors.secondary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Have questions about our policy learning tools? We're here to help! 
                Fill out the form below or reach out directly through our contact information.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div 
                  className="px-6 py-8"
                  style={{ backgroundColor: colors.secondary, color: 'white' }}
                >
                  <h2 className="text-xl md:text-2xl font-medium mb-2 flex items-center">
                    <Mail className="mr-3" />
                    Send Us a Message
                  </h2>
                  <p className="text-gray-300 text-sm">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-medium mb-1"
                          style={{ color: colors.text }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                          style={{ borderColor: `${colors.primary}30`, focus: { ringColor: colors.primary } }}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium mb-1"
                          style={{ color: colors.text }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                          style={{ borderColor: `${colors.primary}30` }}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="subject" 
                          className="block text-sm font-medium mb-1"
                          style={{ color: colors.text }}
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                          style={{ borderColor: `${colors.primary}30` }}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="message" 
                          className="block text-sm font-medium mb-1"
                          style={{ color: colors.text }}
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                          style={{ borderColor: `${colors.primary}30` }}
                        ></textarea>
                      </div>
                      
                      {/* Success message */}
                      {submitSuccess && (
                        <motion.div 
                          className="p-3 rounded-lg text-green-800 bg-green-50 border border-green-200 flex items-start"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Thank you for your message!</p>
                            <p className="text-xs mt-1">We'll get back to you as soon as possible.</p>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Error message */}
                      {submitError && (
                        <motion.div 
                          className="p-3 rounded-lg text-red-800 bg-red-50 border border-red-200 flex items-start"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Error sending message</p>
                            <p className="text-xs mt-1">{submitError}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          className="flex items-center px-6 py-3 rounded-lg font-medium"
                          style={{
                            backgroundColor: colors.primary,
                            color: 'white'
                          }}
                          whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                          whileTap={{ scale: 0.97 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2" size={20} />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {/* Contact Info Card */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-2">
                    <div 
                      className="px-6 py-6"
                      style={{ backgroundColor: colors.accent, color: 'white' }}
                    >
                      <h3 className="text-xl font-medium mb-1">Contact Information</h3>
                      <p className="text-white text-opacity-80 text-sm">
                        Reach out directly through any of these channels
                      </p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Phone 
                            className="mt-1" 
                            size={20} 
                            style={{ color: colors.primary }} 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Phone</p>
                          <p className="text-gray-600">(555) 123-4567</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Mail 
                            className="mt-1" 
                            size={20} 
                            style={{ color: colors.primary }} 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Email</p>
                          <p className="text-gray-600">info@policylearninghub.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <MapPin 
                            className="mt-1" 
                            size={20} 
                            style={{ color: colors.primary }} 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Address</p>
                          <p className="text-gray-600">123 Education Lane, Suite 200</p>
                          <p className="text-gray-600">Knowledge City, KS 12345</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Clock 
                            className="mt-1" 
                            size={20} 
                            style={{ color: colors.primary }} 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Hours</p>
                          <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
                          <p className="text-gray-600">Saturday - Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Four Image Placeholders */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-48">
                    <img 
                      src="/api/placeholder/400/320" 
                      alt="Our Office" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-48">
                    <img 
                      src="/api/placeholder/400/320" 
                      alt="Learning Session" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-48">
                    <img 
                      src="/api/placeholder/400/320" 
                      alt="Team Meeting" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-48">
                    <img 
                      src="/api/placeholder/400/320" 
                      alt="Our Community" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
          
          {/* About Us Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: colors.text }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                About Us
              </motion.h2>
              <motion.p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: colors.secondary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                The Policy Learning Hub is dedicated to making policy education accessible and engaging for everyone.
                Our interactive tools help you understand the policies that affect your daily life.
              </motion.p>
            </div>
            
            {/* Our Mission */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div 
                className="px-6 py-8"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                <h3 className="text-xl md:text-2xl font-medium mb-2 flex items-center">
                  <BookOpen className="mr-3" />
                  Our Mission
                </h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  At Policy Learning Hub, we believe that understanding public policy shouldn't be limited to those with specialized education. 
                  Our mission is to democratize policy knowledge through interactive, gamified learning experiences that make complex concepts accessible to everyone.
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We've created a platform where citizens can learn about the policies that impact their daily lives, empowering them to make informed decisions, 
                  engage more effectively with their communities, and better navigate government services and benefits.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div 
                    className="p-5 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <Award size={40} className="mx-auto mb-3" style={{ color: colors.accent }} />
                    <h4 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                      Excellence
                    </h4>
                    <p className="text-sm text-gray-600">
                      We strive for the highest quality in our educational content and user experience.
                    </p>
                  </div>
                  
                  <div 
                    className="p-5 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <Users size={40} className="mx-auto mb-3" style={{ color: colors.primary }} />
                    <h4 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                      Accessibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      We make policy education accessible to everyone, regardless of background.
                    </p>
                  </div>
                  
                  <div 
                    className="p-5 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.secondary}15` }}
                  >
                    <BookOpen size={40} className="mx-auto mb-3" style={{ color: colors.secondary }} />
                    <h4 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                      Engagement
                    </h4>
                    <p className="text-sm text-gray-600">
                      We create engaging, interactive learning experiences that make policy education fun.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Team Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 
                className="text-2xl font-bold mb-8 text-center"
                style={{ color: colors.text }}
              >
                Our Team
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index + 0.7, duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src="/api/placeholder/400/320" 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-1" style={{ color: colors.primary }}>
                        {member.name}
                      </h4>
                      <p className="text-sm font-medium mb-3" style={{ color: colors.accent }}>
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ContactAbout;