import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Edit, 
  User, 
  BarChart2, 
  FileText, 
  MessageSquare,
  BookOpen,
  Check,
  X,
  ChevronRight,
  Bot,
  Calendar,
  AlertCircle,
  ThumbsUp,
  MessageCircle,
  PlusCircle,
  Clock,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Area, 
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import NavBar from '../components/NavBar';

const Dashboard = () => {
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

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Lenny",
    profession: "Small Business Owner",
    interests: ["Financial Aid", "Business Policies", "Tax Benefits"],
    age: 35,
    location: "Mumbai"
  });

  // Mock tracked policies
  const [trackedPolicies, setTrackedPolicies] = useState([
    {
      id: 1,
      title: "MSME Loan Application",
      status: "Processing",
      description: "Your application is being reviewed by the financial department.",
      lastUpdated: "2025-03-02",
      category: "Financial",
      icon: <BarChart2 className="w-6 h-6" />
    },
    {
      id: 2,
      title: "GST Filing Reminder",
      status: "Upcoming",
      description: "Your quarterly GST filing is due in 15 days.",
      lastUpdated: "2025-03-04",
      category: "Tax",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Business Insurance Subsidy",
      status: "Approved",
      description: "Your application for business insurance subsidy has been approved.",
      lastUpdated: "2025-03-01",
      category: "Insurance",
      icon: <Check className="w-6 h-6" />
    }
  ]);

  // Mock financial support data for chart
  const financialSupportData = [
    { month: 'Jan', loans: 2400, grants: 1800, subsidies: 1200 },
    { month: 'Feb', loans: 3000, grants: 1300, subsidies: 1500 },
    { month: 'Mar', loans: 2700, grants: 2000, subsidies: 900 },
    { month: 'Apr', loans: 4000, grants: 2780, subsidies: 1890 },
    { month: 'May', loans: 3200, grants: 1890, subsidies: 2390 },
    { month: 'Jun', loans: 2800, grants: 2390, subsidies: 3490 },
  ];

  // Mock social policy impact data for chart
  const socialPolicyData = [
    { year: '2020', housing: 30, employment: 45, healthcare: 55 },
    { year: '2021', housing: 40, employment: 55, healthcare: 60 },
    { year: '2022', housing: 45, employment: 60, healthcare: 65 },
    { year: '2023', housing: 50, employment: 65, healthcare: 70 },
    { year: '2024', housing: 65, employment: 70, healthcare: 80 },
    { year: '2025', housing: 75, employment: 80, healthcare: 85 },
  ];

  // Mock legal complaints data for chart
  const legalComplaintsData = [
    { name: 'Consumer', value: 35 },
    { name: 'Labor', value: 25 },
    { name: 'Tenant', value: 20 },
    { name: 'Other', value: 20 },
  ];

  // Mock recommended policies
  const recommendedPolicies = [
    {
      id: 101,
      title: "Startup India Benefits",
      description: "Tax exemptions and funding opportunities for new businesses.",
      relevance: "Highly Relevant",
      category: "Business",
      icon: <TrendingUp className="w-6 h-6" style={{ color: colors.accent }} />
    },
    {
      id: 102,
      title: "Digital Business Promotion Scheme",
      description: "Government grants for businesses looking to expand their digital presence.",
      relevance: "Recommended",
      category: "Digital",
      icon: <BarChart2 className="w-6 h-6" style={{ color: colors.accent }} />
    },
    {
      id: 103,
      title: "SME Export Incentives",
      description: "Special incentives for small businesses engaged in exports.",
      relevance: "Worth Exploring",
      category: "Exports",
      icon: <FileText className="w-6 h-6" style={{ color: colors.accent }} />
    }
  ];

  // Mock alerts & notifications
  const notifications = [
    {
      id: 201,
      title: "New Tax Rebates Announced",
      description: "Government announces new tax rebates for small businesses!",
      date: "2025-03-05",
      isRead: false,
      type: "announcement",
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 202,
      title: "MSME Loan Application Update",
      description: "Additional documents required for your loan application.",
      date: "2025-03-03",
      isRead: true,
      type: "update",
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 203,
      title: "GST Filing Deadline",
      description: "Reminder: Your quarterly GST filing is due on March 31st.",
      date: "2025-03-01",
      isRead: false,
      type: "deadline",
      icon: <Clock className="w-5 h-5" />
    }
  ];

  // Mock forum discussions
  const forumDiscussions = [
    {
      id: 301,
      title: "How effective is the new MSME credit scheme?",
      author: "Priya S.",
      date: "2025-03-04",
      replies: 12,
      upvotes: 24,
      excerpt: "I'm considering applying for the new credit scheme but wanted to hear from those who have already..."
    },
    {
      id: 302,
      title: "Questions about the GST filing extension",
      author: "Raj K.",
      date: "2025-03-03",
      replies: 8,
      upvotes: 15,
      excerpt: "Has anyone received official notification about the rumored extension for quarterly GST filing?"
    },
    {
      id: 303,
      title: "Experience with Digital India business grants",
      author: "Amir J.",
      date: "2025-03-02",
      replies: 19,
      upvotes: 31,
      excerpt: "I recently received a grant under the Digital India initiative for my e-commerce platform..."
    }
  ];

  // Handle remove tracked policy
  const handleRemovePolicy = (id) => {
    setTrackedPolicies(trackedPolicies.filter(policy => policy.id !== id));
  };

  // Mock function to mark notification as read
  const markAsRead = (id) => {
    // In a real app, this would update the state
    console.log(`Marking notification ${id} as read`);
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

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Personalized User Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div 
                className="p-8 md:p-12"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.background
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="p-4 rounded-full mr-4"
                    style={{ backgroundColor: `${colors.background}30` }}
                  >
                    <User size={40} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <p className="opacity-80 mt-1">{userData.profession}</p>
                    <p className="opacity-80">{userData.location}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.interests.map((interest, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${colors.background}50` }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <motion.button 
                    className="flex items-center px-4 py-2 rounded-lg font-medium"
                    style={{ 
                      backgroundColor: colors.background, 
                      color: colors.primary
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={16} className="mr-2" />
                    Update Preferences
                  </motion.button>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                      Welcome, {userData.name}!
                    </h2>
                    <p className="text-lg mt-1" style={{ color: `${colors.text}80` }}>
                      Here's your policy overview for this month.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      className="flex items-center px-3 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`,
                        color: colors.text 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell size={16} className="mr-2" />
                      <span className="hidden sm:inline">Notifications</span>
                      <span 
                        className="ml-2 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: colors.background
                        }}
                      >
                        3
                      </span>
                    </motion.button>
                    <motion.button 
                      className="flex items-center px-3 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`,
                        color: colors.text 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Filter size={16} className="mr-2" />
                      <span className="hidden sm:inline">Filter</span>
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Tracked Policies", count: 3, icon: <FileText size={24} /> },
                    { title: "Eligible Benefits", count: 7, icon: <Check size={24} /> },
                    { title: "Pending Applications", count: 2, icon: <Clock size={24} /> }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: `${colors.secondary}10` }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="mr-3 p-2 rounded-lg"
                          style={{ 
                            backgroundColor: colors.primary,
                            color: colors.background
                          }}
                        >
                          {stat.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: colors.text }}>
                            {stat.count}
                          </h3>
                          <p style={{ color: `${colors.text}80` }}>{stat.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tracked Policies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Tracked Policies
            </h2>
            <Link 
              to="/policies"
              className="flex items-center text-sm font-medium"
              style={{ color: colors.primary }}
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trackedPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div 
                  className="p-4 flex items-center"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.background
                  }}
                >
                  <div className="mr-3">
                    {policy.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{policy.title}</h3>
                    <p className="text-xs opacity-80">Last updated: {policy.lastUpdated}</p>
                  </div>
                  <div 
                    className="ml-2 px-2 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: policy.status === "Approved" 
                        ? "rgb(34, 197, 94)" 
                        : policy.status === "Processing" 
                          ? "rgb(234, 179, 8)"
                          : "rgb(59, 130, 246)",
                      color: "white"
                    }}
                  >
                    {policy.status}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm mb-4" style={{ color: colors.text }}>
                    {policy.description}
                  </p>
                  <div className="flex flex-wrap justify-between gap-2">
                    <motion.button
                      className="flex-1 text-sm px-3 py-2 rounded-lg font-medium text-center"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: "white"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                    </motion.button>
                    <motion.button
                      className="flex-1 text-sm px-3 py-2 rounded-lg font-medium text-center"
                      style={{ 
                        backgroundColor: `${colors.primary}90`,
                        color: "white"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Now
                    </motion.button>
                    <motion.button
                      className="text-sm px-2 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`,
                        color: colors.text
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: `${colors.secondary}20` }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemovePolicy(policy.id)}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Data & Analytics */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Data & Analytics
            </h2>
            <p className="text-lg" style={{ color: `${colors.text}80` }}>
              Real-time insights about government policies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Financial Support Stats */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                Financial Support Statistics
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={financialSupportData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="loans" name="Loans" fill={colors.primary} />
                    <Bar dataKey="grants" name="Grants" fill={colors.accent} />
                    <Bar dataKey="subsidies" name="Subsidies" fill={colors.secondary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Social Policy Impact */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                Social Policy Impact
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={socialPolicyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="housing" name="Housing" stroke={colors.primary} fill={`${colors.primary}50`} />
                    <Area type="monotone" dataKey="employment" name="Employment" stroke={colors.accent} fill={`${colors.accent}50`} />
                    <Area type="monotone" dataKey="healthcare" name="Healthcare" stroke={colors.secondary} fill={`${colors.secondary}50`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Legal Complaints Tracker */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Legal Complaints Tracker
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 flex flex-col justify-center">
                <h4 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                  Complaints by Category
                </h4>
                <p className="mb-4" style={{ color: `${colors.text}80` }}>
                  Distribution of legal complaints filed in the last quarter
                </p>
                <ul className="space-y-2">
                  {legalComplaintsData.map((entry, index) => (
                    <li key={index} className="flex items-center">
                      <span 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ 
                          backgroundColor: 
                            index === 0 ? colors.primary :
                            index === 1 ? colors.accent :
                            index === 2 ? colors.secondary :
                            "#9c88ff"
                        }}
                      ></span>
                      <span style={{ color: colors.text }}>{entry.name}: </span>
                      <span className="ml-1 font-semibold" style={{ color: colors.text }}>{entry.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={legalComplaintsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {legalComplaintsData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            index === 0 ? colors.primary :
                            index === 1 ? colors.accent :
                            index === 2 ? colors.secondary :
                            "#9c88ff"
                          } 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Policies & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Recommended Policies */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: colors.text }}
                >
                  Recommended Policies
                </h2>
                <p className="text-lg" style={{ color: `${colors.text}80` }}>
                  AI-powered suggestions based on your profile
                </p>
              </div>
              <div 
                className="p-2 rounded-full"
                style={{ 
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary
                }}
              >
                <Bot size={24} />
              </div>
            </div>

            <div className="space-y-4">
              {recommendedPolicies.map((policy) => (
                <motion.div
                  key={policy.id}
                  className="bg-white rounded-xl shadow-lg p-5"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{ 
                        backgroundColor: `${colors.secondary}20`,
                      }}
                    >
                      {policy.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 
                          className="font-bold text-lg"
                          style={{ color: colors.text }}
                        >
                          {policy.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: 
                              policy.relevance === "Highly Relevant" ? `${colors.primary}20` :
                              policy.relevance === "Recommended" ? `${colors.accent}20` :
                              `${colors.secondary}20`,
                            color:
                              policy.relevance === "Highly Relevant" ? colors.primary :
                              policy.relevance === "Recommended" ? colors.accent :
                              colors.secondary
                          }}
                        >
                          {policy.relevance}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: `${colors.text}80` }}>
                        {policy.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${colors.secondary}10`,
                            color: colors.text
                          }}
                        >
                          {policy.category}
                        </span>
                        <motion.button
                          className="text-sm px-3 py-1 rounded-lg font-medium"
                          style={{ 
                            backgroundColor: colors.primary,
                            color: "white"
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                Alerts & Notifications
              </h2>
              <Link 
                to="/notifications"
                className="flex items-center text-sm font-medium"
                style={{ color: colors.primary }}
              >
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.background
                }}
              >
                <h3 className="font-semibold">Recent Updates</h3>
              </div>
              <div className="p-4">
                <ul className="divide-y" style={{ divideColor: `${colors.secondary}20` }}>
                  {notifications.map((notification) => (
                    <li 
                      key={notification.id} 
                      className={`py-3 ${!notification.isRead ? 'bg-opacity-5' : ''}`}
                      style={{ backgroundColor: !notification.isRead ? colors.primary : 'transparent' }}
                    >
                      <div className="flex items-start">
                        <div 
                          className="p-2 rounded-full mr-3 mt-1"
                          style={{ 
                            backgroundColor: notification.type === 'announcement' 
                              ? `${colors.primary}20` 
                              : notification.type === 'update'
                                ? `${colors.accent}20`
                                : `${colors.secondary}20`,
                            color: notification.type === 'announcement' 
                              ? colors.primary 
                              : notification.type === 'update'
                                ? colors.accent
                                : colors.secondary,
                          }}
                        >
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <h4 
                            className="font-semibold text-sm"
                            style={{ color: colors.text }}
                          >
                            {notification.title}
                          </h4>
                          <p 
                            className="text-xs mt-1"
                            style={{ color: `${colors.text}70` }}
                          >
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span 
                              className="text-xs"
                              style={{ color: `${colors.text}50` }}
                            >
                              {notification.date}
                            </span>
                            {!notification.isRead && (
                              <button
                                className="text-xs px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: `${colors.secondary}10`,
                                  color: colors.text
                                }}
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Community & Discussion Forum */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                Community & Discussion Forum
              </h2>
              <p className="text-lg" style={{ color: `${colors.text}80` }}>
                Discuss policies, ask questions, and share experiences
              </p>
            </div>
            <Link 
              to="/community"
              className="flex items-center text-sm font-medium"
              style={{ color: colors.primary }}
            >
              View All Discussions <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.background
              }}
            >
              <h3 className="font-semibold">Recent Discussions</h3>
              <motion.button 
                className="flex items-center px-3 py-1 rounded-lg text-sm font-medium"
                style={{ 
                  backgroundColor: colors.background, 
                  color: colors.primary
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircle size={16} className="mr-2" />
                New Post
              </motion.button>
            </div>
            <div className="p-4">
              <ul className="divide-y" style={{ divideColor: `${colors.secondary}20` }}>
                {forumDiscussions.map((discussion) => (
                  <li key={discussion.id} className="py-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 
                          className="font-semibold text-lg"
                          style={{ color: colors.text }}
                        >
                          {discussion.title}
                        </h4>
                        <p 
                          className="text-sm mt-1 mb-3"
                          style={{ color: `${colors.text}70` }}
                        >
                          {discussion.excerpt}
                        </p>
                        <div className="flex items-center text-xs" style={{ color: `${colors.text}60` }}>
                          <span>By {discussion.author}</span>
                          <span className="mx-2">•</span>
                          <span>{discussion.date}</span>
                          <div className="flex items-center ml-4">
                            <MessageCircle size={14} className="mr-1" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center ml-4">
                            <ThumbsUp size={14} className="mr-1" />
                            <span>{discussion.upvotes} upvotes</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        className="text-sm px-3 py-1 mt-2 rounded-lg font-medium"
                        style={{ 
                          backgroundColor: `${colors.primary}10`,
                          color: colors.primary
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: `${colors.primary}20` }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read Thread
                      </motion.button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;