import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  HelpCircle,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Download,
  Share,
  Copy,
  History,
  MessageCircle,
  Clock,
  ChevronRight,
  X,
  Menu,
  Search,
  Info,
  Settings,
  Star,
  AlertCircle,
  CheckCircle,
  Lock
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Chatbot = () => {
  // Color palette matching your app
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
    text: '#451851',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    lightBg: '#FAF7F7',
    darkText: '#1A1523',
    neutralGray: '#718096'
  };

  // State for chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your Policy Learning Assistant. How can I help you understand government policies today?",
      timestamp: new Date(),
      isNew: false
    }
  ]);
  
  // State variables
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Healthcare Policies", date: "Today", messageCount: 8 },
    { id: 2, title: "Tax System Overview", date: "Yesterday", messageCount: 12 },
    { id: 3, title: "Environmental Regulations", date: "Mar 6, 2025", messageCount: 5 }
  ]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  // Suggested questions
  const suggestions = [
    "What is universal healthcare?",
    "Explain progressive taxation",
    "How do environmental policies work?",
    "What are labor rights?",
    "Tell me about affordable housing",
    "What are education funding policies?",
    "How do immigration policies work?",
    "Explain social security benefits"
  ];

  // Policy categories
  const policyCategories = [
    { 
      id: 'healthcare', 
      name: "Healthcare", 
      icon: <Info size={16} />,
      description: "Universal healthcare, insurance systems, medical programs",
      color: '#4299E1'
    },
    { 
      id: 'taxation', 
      name: "Taxation", 
      icon: <Info size={16} />,
      description: "Tax brackets, deductions, progressive & regressive systems",
      color: '#48BB78'
    },
    { 
      id: 'housing', 
      name: "Housing", 
      icon: <Info size={16} />,
      description: "Affordable housing, rent control, housing assistance",
      color: '#ED8936'
    },
    { 
      id: 'education', 
      name: "Education", 
      icon: <BookOpen size={16} />,
      description: "School funding, student loans, educational standards",
      color: '#9F7AEA'
    },
    { 
      id: 'labor', 
      name: "Labor & Employment", 
      icon: <Info size={16} />,
      description: "Worker rights, workplace standards, unionization",
      color: '#F56565'
    },
    { 
      id: 'environment', 
      name: "Environment", 
      icon: <Info size={16} />,
      description: "Pollution control, conservation, sustainability initiatives",
      color: '#38B2AC'
    }
  ];

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for message groups
  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Scroll to bottom of chat when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for user on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        
        // Load chat history for the user
        const { data: chatHistory } = await supabase
          .from('chat_history')
          .select('*')
          .eq('user_id', data.session.user.id)
          .order('timestamp', { ascending: true });
          
        if (chatHistory && chatHistory.length > 0) {
          // Transform the chat history to match our message format
          const formattedMessages = chatHistory.map(msg => ({
            id: msg.id,
            sender: msg.sender,
            text: msg.message,
            timestamp: new Date(msg.timestamp),
            isNew: false
          }));
          
          setMessages(formattedMessages);
        }
      }
    };
    
    getUser();
  }, []);

  // Save message to database
  const saveMessage = async (message) => {
    if (!user) return;
    
    await supabase
      .from('chat_history')
      .insert([
        {
          user_id: user.id,
          message: message.text,
          sender: message.sender,
          timestamp: message.timestamp.toISOString()
        }
      ]);
  };

  // Generate bot response
  const generateResponse = async (userMessage) => {
    // Sample responses based on keywords
    const responses = {
      "healthcare": "Universal healthcare is a system where all citizens have access to essential healthcare services regardless of their financial status. It's typically funded through taxes and aims to ensure everyone can receive necessary medical care without financial hardship.\n\nKey components often include:\n\n• Primary care services\n• Hospital care\n• Preventive care\n• Mental health services\n• Prescription medications\n\nDifferent countries implement this in various ways, such as single-payer systems, multi-payer systems, or national health services.",
      
      "tax": "Progressive taxation is a tax system where the tax rate increases as the taxable amount increases. This means individuals with higher incomes pay a higher percentage in taxes compared to those with lower incomes, aiming to reduce economic inequality.\n\nKey features include:\n\n• Tax brackets with increasing rates\n• Potential deductions and credits\n• Often applied to income taxes\n• Designed to redistribute wealth\n• Contrasts with flat or regressive tax systems",
      
      "environment": "Environmental policies are regulations and guidelines designed to protect natural resources, reduce pollution, and promote sustainable practices. These policies can include emissions standards, protected land designations, and incentives for green energy.\n\nCommon policy tools include:\n\n• Emissions caps and trading systems\n• Protected area designations\n• Green energy subsidies\n• Pollution taxes\n• Environmental impact assessments\n• Waste management regulations",
      
      "labor": "Labor rights are legal entitlements related to employment relationships, including fair wages, safe working conditions, freedom from discrimination, and the right to organize. These protections help ensure workers are treated fairly and with dignity.\n\nKey labor rights often include:\n\n• Minimum wage guarantees\n• Workplace safety standards\n• Protection from discrimination\n• Right to form unions and collective bargaining\n• Paid leave (sick, vacation, parental)\n• Limitations on working hours\n• Protection from unfair dismissal",
      
      "housing": "Affordable housing policies aim to ensure people have access to adequate housing they can afford. These may include rent control, housing subsidies, tax incentives for developers to build affordable units, and zoning regulations to encourage mixed-income communities.\n\nCommon approaches include:\n\n• Rent control or stabilization\n• Housing vouchers and subsidies\n• Inclusionary zoning requirements\n• Public housing developments\n• Tax credits for affordable housing development\n• Community land trusts\n• First-time homebuyer assistance programs",
      
      "education": "Education policies govern how educational systems operate, covering areas like curriculum standards, school funding, teacher qualifications, and educational accessibility. They aim to provide quality education opportunities for all citizens.\n\nEducation policy areas include:\n\n• School funding formulas\n• Curriculum standards and testing\n• Teacher certification requirements\n• Special education services\n• Higher education financing\n• Early childhood education\n• School choice and charter schools\n• Student loan programs",
      
      "immigration": "Immigration policies regulate how foreign nationals enter, live, and work in a country. These include visa requirements, pathways to citizenship, refugee protocols, and enforcement mechanisms. They balance national security, economic needs, and humanitarian concerns.\n\nKey immigration policy components include:\n\n• Visa categories and quotas\n• Pathways to permanent residency and citizenship\n• Border security measures\n• Refugee and asylum systems\n• Employment authorization\n• Family reunification provisions\n• Integration and settlement services",
      
      "social security": "Social Security provides financial benefits to retirees, disabled individuals, and families of retired, disabled or deceased workers. The program is funded through payroll taxes and designed to provide a safety net for vulnerable populations.\n\nKey elements include:\n\n• Retirement benefits based on work history\n• Disability insurance\n• Survivor benefits for families\n• Supplemental Security Income (SSI) for low-income elderly or disabled\n• Cost-of-living adjustments\n• Medicare eligibility at retirement age",
      
      "hello": "Hello! I'm your Policy Learning Assistant. I can help explain various government policies, regulations, and programs. What would you like to know about today?\n\nI can provide information about:\n\n• Healthcare policies\n• Tax systems\n• Environmental regulations\n• Labor and employment laws\n• Housing programs\n• Education policies\n• And many other government programs"
    };
    
    // Find matching keywords
    let responseText = "I don't have specific information about that topic yet. Let me suggest exploring our Policy Learning Challenge to learn more about various government policies.\n\nYou might want to try asking about:\n\n• Healthcare systems\n• Tax policies\n• Environmental regulations\n• Labor rights\n• Housing programs\n• Education funding";
    
    Object.keys(responses).forEach(keyword => {
      if (userMessage.toLowerCase().includes(keyword)) {
        responseText = responses[keyword];
      }
    });
    
    // Simulate delay for realistic typing effect
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(responseText);
      }, 1500);
    });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
      isNew: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Save user message to database
    await saveMessage(userMessage);
    
    // Show bot typing indicator
    setIsTyping(true);
    setLoading(true);
    
    // Generate response
    const response = await generateResponse(input);
    
    // Hide typing indicator
    setIsTyping(false);
    
    // Add bot response
    const botMessage = {
      id: messages.length + 2,
      sender: 'bot',
      text: response,
      timestamp: new Date(),
      isNew: true
    };
    
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
    
    // Save bot message to database
    await saveMessage(botMessage);
    
    // Mark messages as not new after a delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => ({
          ...msg,
          isNew: false
        }))
      );
    }, 2000);
  };

  // Handle using a suggestion
  const handleUseSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  // Handle submitting suggestion directly
  const handleSubmitSuggestion = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Clear chat history
  const clearChat = async () => {
    // Keep only the welcome message
    const welcomeMessage = {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your Policy Learning Assistant. How can I help you understand government policies today?",
      timestamp: new Date(),
      isNew: false
    };
    
    setMessages([welcomeMessage]);
    
    // Clear chat history from database if user is logged in
    if (user) {
      await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', user.id);
        
      // Save the welcome message
      await saveMessage(welcomeMessage);
    }
  };

  // Toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Filter suggestions based on search
  const filteredSuggestions = searchQuery 
    ? suggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : suggestions;

  // Filter categories based on search
  const filteredCategories = searchQuery
    ? policyCategories.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : policyCategories;

  // Render the category details view
  const renderCategoryDetails = () => {
    const category = policyCategories.find(c => c.id === selectedCategory);
    if (!category) return null;
    
    // Sample topic details
    const topicDetails = {
      healthcare: [
        "Universal Healthcare Systems",
        "Health Insurance Types",
        "Medicare & Medicaid",
        "Prescription Drug Coverage",
        "Healthcare Cost Control Measures",
        "Preventative Care Policies",
        "Mental Health Services"
      ],
      taxation: [
        "Progressive Tax Structures",
        "Income Tax Brackets",
        "Tax Deductions & Credits",
        "Corporate Taxation",
        "Capital Gains Taxes",
        "Property Taxes",
        "Tax Policy Goals"
      ],
      housing: [
        "Affordable Housing Initiatives",
        "Rent Control Policies",
        "Housing Assistance Programs",
        "Homelessness Prevention",
        "First-Time Homebuyer Programs",
        "Zoning Regulations",
        "Public Housing"
      ],
      education: [
        "K-12 Education Funding",
        "Higher Education Financing",
        "Student Loan Programs",
        "Educational Standards",
        "Teacher Certification",
        "Special Education Services",
        "Early Childhood Education"
      ],
      labor: [
        "Minimum Wage Laws",
        "Workplace Safety Standards",
        "Anti-Discrimination Policies",
        "Labor Union Regulations",
        "Paid Leave Policies",
        "Unemployment Insurance",
        "Worker's Compensation"
      ],
      environment: [
        "Emissions Standards",
        "Protected Lands Designation",
        "Renewable Energy Incentives",
        "Pollution Control Measures",
        "Climate Change Initiatives",
        "Environmental Impact Assessments",
        "Waste Management Regulations"
      ]
    };
    
    const topics = topicDetails[category.id] || [];
    
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button 
            className="p-1 rounded-full hover:bg-gray-200 mr-2"
            onClick={() => setSelectedCategory(null)}
          >
            <ChevronRight size={16} className="transform rotate-180" />
          </button>
          <h3 className="text-base font-medium" style={{ color: category.color }}>
            {category.name} Policies
          </h3>
        </div>
        
        <p className="text-xs text-gray-600 mb-4">
          {category.description}
        </p>
        
        <div className="space-y-2">
          {topics.map((topic, index) => (
            <motion.button
              key={index}
              className="w-full p-3 rounded-lg text-sm text-left flex items-center"
              style={{ 
                backgroundColor: `${category.color}10`, 
                color: category.color
              }}
              whileHover={{ 
                backgroundColor: `${category.color}20`
              }}
              onClick={() => handleSubmitSuggestion(`Explain ${topic.toLowerCase()}`)}
            >
              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
              <span>{topic}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <NavBar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 h-screen flex flex-col">
        <div className="max-w-7xl mx-auto flex-grow flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button 
                className="p-2 rounded-lg mr-3"
                style={{ backgroundColor: `${colors.secondary}10` }}
                onClick={toggleMobileSidebar}
              >
                <Menu size={20} style={{ color: colors.secondary }} />
              </button>
              <h1 
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                Policy Assistant
              </h1>
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearChat}
              >
                <Trash2 size={18} />
              </motion.button>
              <motion.button
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={18} />
              </motion.button>
            </div>
          </div>
          
          {/* Main Layout */}
          <div className="flex-grow flex rounded-xl overflow-hidden shadow-xl" style={{ backgroundColor: colors.lightBg }}>
            {/* Sidebar - Desktop */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div 
                  className="hidden lg:flex lg:flex-col lg:w-80 border-r"
                  style={{ backgroundColor: 'white', borderColor: 'rgba(0,0,0,0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Sidebar Header */}
                  <div className="p-4 border-b flex flex-col" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold" style={{ color: colors.text }}>
                        <Bot className="inline-block mr-2" size={18} /> Policy Assistant
                      </h2>
                      <motion.button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setShowSidebar(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight size={16} style={{ color: colors.neutralGray }} />
                      </motion.button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search topics..."
                        className="w-full p-2 pl-8 rounded-lg border text-sm bg-gray-50 focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'rgba(0,0,0,0.1)',
                          focus: { ringColor: colors.primary }
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search 
                        size={16} 
                        className="absolute left-2.5 top-2.5" 
                        style={{ color: colors.neutralGray }} 
                      />
                    </div>
                  </div>
                  
                  {/* Sidebar Tabs */}
                  <div className="flex border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <button
                      className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'suggested' ? 'text-primary' : 'text-gray-500'}`}
                      style={{ color: activeSidebarTab === 'suggested' ? colors.primary : colors.neutralGray }}
                      onClick={() => setActiveSidebarTab('suggested')}
                    >
                      Suggested
                      {activeSidebarTab === 'suggested' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: colors.primary }}
                          layoutId="tabIndicator"
                        />
                      )}
                    </button>
                    <button
                      className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'topics' ? 'text-primary' : 'text-gray-500'}`}
                      style={{ color: activeSidebarTab === 'topics' ? colors.primary : colors.neutralGray }}
                      onClick={() => setActiveSidebarTab('topics')}
                    >
                      Topics
                      {activeSidebarTab === 'topics' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: colors.primary }}
                          layoutId="tabIndicator"
                        />
                      )}
                    </button>
                    <button
                      className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'history' ? 'text-primary' : 'text-gray-500'}`}
                      style={{ color: activeSidebarTab === 'history' ? colors.primary : colors.neutralGray }}
                      onClick={() => setActiveSidebarTab('history')}
                    >
                      History
                      {activeSidebarTab === 'history' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: colors.primary }}
                          layoutId="tabIndicator"
                        />
                      )}
                    </button>
                  </div>
                  
                  {/* Sidebar Content - Category Details */}
                  {selectedCategory && (
                    renderCategoryDetails()
                  )}
                  
                  {/* Sidebar Content - Suggestions */}
                  {!selectedCategory && activeSidebarTab === 'suggested' && (
                    <div className="flex-grow overflow-y-auto">
                      <div className="p-4 space-y-2">
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              className="w-full p-3 rounded-lg text-sm text-left flex items-center"
                              style={{ 
                                backgroundColor: `${colors.primary}10`, 
                                color: colors.primary 
                              }}
                              whileHover={{ backgroundColor: `${colors.primary}20` }}
                              onClick={() => handleSubmitSuggestion(suggestion)}
                            >
                              <MessageCircle size={14} className="mr-2 flex-shrink-0" />
                              <span className="line-clamp-2">{suggestion}</span>
                            </motion.button>
                          ))
                        ) : (
                          <div className="text-center py-8 text-sm text-gray-500">
                            <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                            <p>No matching suggestions found.</p>
                            <p className="text-xs mt-1">Try a different search term</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Sidebar Content - Topics */}
                  {!selectedCategory && activeSidebarTab === 'topics' && (
                    <div className="flex-grow overflow-y-auto">
                      <div className="p-4 space-y-3">
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((category) => (
                            <motion.button
                              key={category.id}
                              className="w-full p-3 rounded-lg text-sm text-left flex items-start"
                              style={{ 
                                backgroundColor: `${category.color}10`, 
                                color: category.color
                              }}
                              whileHover={{ backgroundColor: `${category.color}20` }}
                              onClick={() => setSelectedCategory(category.id)}
                            >
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                style={{ backgroundColor: `${category.color}15` }}
                              >
                                {category.icon}
                              </div>
                              <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-xs mt-1 text-gray-600 line-clamp-2">{category.description}</p>
                              </div>
                              <ChevronRight size={16} className="ml-auto flex-shrink-0 self-center" />
                            </motion.button>
                          ))
                        ) : (
                          <div className="text-center py-8 text-sm text-gray-500">
                            <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                            <p>No matching topics found.</p>
                            <p className="text-xs mt-1">Try a different search term</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Sidebar Content - History */}
                  {!selectedCategory && activeSidebarTab === 'history' && (
                    <div className="flex-grow overflow-y-auto">
                      {conversations.length > 0 ? (
                        <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                          {conversations.map((convo) => (
                            <motion.button
                              key={convo.id}
                              className="w-full p-4 text-sm text-left flex items-start hover:bg-gray-50"
                              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                            >
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
                              >
                                <History size={14} />
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="font-medium truncate" style={{ color: colors.text }}>
                                  {convo.title}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-xs text-gray-500">{convo.date}</p>
                                  <p className="text-xs text-gray-500">{convo.messageCount} messages</p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-sm text-gray-500">
                          <Clock size={32} className="mx-auto mb-2 text-gray-400" />
                          <p>No conversation history yet.</p>
                          <p className="text-xs mt-1">Your past conversations will appear here</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Sidebar Footer */}
                  <div className="mt-auto p-4 border-t text-center" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <a 
                      href="/learn" 
                      className="inline-flex items-center text-xs font-medium rounded-lg px-3 py-2"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: 'white'
                      }}
                    >
                      <BookOpen size={14} className="mr-2" />
                      Take Policy Challenge Quiz
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Sidebar Toggle Button (visible when sidebar is hidden) */}
            <AnimatePresence>
              {!showSidebar && (
                <motion.button
                  className="hidden lg:flex items-center justify-center h-12 w-12 rounded-full fixed top-24 left-6 shadow-lg"
                  style={{ backgroundColor: 'white' }}
                  onClick={() => setShowSidebar(true)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} style={{ color: colors.primary }} className="transform rotate-180" />
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Mobile Sidebar */}
            <AnimatePresence>
              {showMobileSidebar && (
                <motion.div
                  className="fixed inset-0 z-50 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween" }}
                  >
                    <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <h2 className="text-base font-semibold" style={{ color: colors.text }}>
                        <Bot className="inline-block mr-2" size={18} /> Policy Assistant
                      </h2>
                      <motion.button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={toggleMobileSidebar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={18} style={{ color: colors.neutralGray }} />
                      </motion.button>
                    </div>
                    
                    {/* Mobile Sidebar Content - Same tabs as desktop */}
                    <div className="flex border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <button
                        className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'suggested' ? 'text-primary' : 'text-gray-500'}`}
                        style={{ color: activeSidebarTab === 'suggested' ? colors.primary : colors.neutralGray }}
                        onClick={() => setActiveSidebarTab('suggested')}
                      >
                        Suggested
                        {activeSidebarTab === 'suggested' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ backgroundColor: colors.primary }}
                            layoutId="mobileTabIndicator"
                          />
                        )}
                      </button>
                      <button
                        className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'topics' ? 'text-primary' : 'text-gray-500'}`}
                        style={{ color: activeSidebarTab === 'topics' ? colors.primary : colors.neutralGray }}
                        onClick={() => setActiveSidebarTab('topics')}
                      >
                        Topics
                        {activeSidebarTab === 'topics' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ backgroundColor: colors.primary }}
                            layoutId="mobileTabIndicator"
                          />
                        )}
                      </button>
                      <button
                        className={`flex-1 py-3 text-xs font-medium relative ${activeSidebarTab === 'history' ? 'text-primary' : 'text-gray-500'}`}
                        style={{ color: activeSidebarTab === 'history' ? colors.primary : colors.neutralGray }}
                        onClick={() => setActiveSidebarTab('history')}
                      >
                        History
                        {activeSidebarTab === 'history' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ backgroundColor: colors.primary }}
                            layoutId="mobileTabIndicator"
                          />
                        )}
                      </button>
                    </div>
                    
                    {/* Mobile Category Details */}
                    {selectedCategory && (
                      <div className="flex-grow overflow-y-auto">
                        {renderCategoryDetails()}
                      </div>
                    )}
                    
                    {/* Mobile Suggestions */}
                    {!selectedCategory && activeSidebarTab === 'suggested' && (
                      <div className="flex-grow overflow-y-auto">
                        <div className="p-4 space-y-2">
                          {filteredSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              className="w-full p-3 rounded-lg text-sm text-left flex items-center"
                              style={{ 
                                backgroundColor: `${colors.primary}10`, 
                                color: colors.primary 
                              }}
                              whileHover={{ backgroundColor: `${colors.primary}20` }}
                              onClick={() => {
                                handleSubmitSuggestion(suggestion);
                                toggleMobileSidebar();
                              }}
                            >
                              <MessageCircle size={14} className="mr-2 flex-shrink-0" />
                              <span className="line-clamp-2">{suggestion}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Mobile Topics */}
                    {!selectedCategory && activeSidebarTab === 'topics' && (
                      <div className="flex-grow overflow-y-auto">
                        <div className="p-4 space-y-3">
                          {policyCategories.map((category) => (
                            <motion.button
                              key={category.id}
                              className="w-full p-3 rounded-lg text-sm text-left flex items-start"
                              style={{ 
                                backgroundColor: `${category.color}10`, 
                                color: category.color
                              }}
                              whileHover={{ backgroundColor: `${category.color}20` }}
                              onClick={() => setSelectedCategory(category.id)}
                            >
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                style={{ backgroundColor: `${category.color}15` }}
                              >
                                {category.icon}
                              </div>
                              <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-xs mt-1 text-gray-600 line-clamp-2">{category.description}</p>
                              </div>
                              <ChevronRight size={16} className="ml-auto flex-shrink-0 self-center" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Mobile History */}
                    {!selectedCategory && activeSidebarTab === 'history' && (
                      <div className="flex-grow overflow-y-auto">
                        {conversations.length > 0 ? (
                          <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                            {conversations.map((convo) => (
                              <motion.button
                                key={convo.id}
                                className="w-full p-4 text-sm text-left flex items-start hover:bg-gray-50"
                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                              >
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                  style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
                                >
                                  <History size={14} />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <p className="font-medium truncate" style={{ color: colors.text }}>
                                    {convo.title}
                                  </p>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">{convo.date}</p>
                                    <p className="text-xs text-gray-500">{convo.messageCount} messages</p>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-sm text-gray-500">
                            <Clock size={32} className="mx-auto mb-2 text-gray-400" />
                            <p>No conversation history yet.</p>
                            <p className="text-xs mt-1">Your past conversations will appear here</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Mobile Sidebar Footer */}
                    <div className="mt-auto p-4 border-t text-center" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <a 
                        href="/learn" 
                        className="inline-flex items-center justify-center w-full text-xs font-medium rounded-lg px-3 py-2"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: 'white'
                        }}
                      >
                        <BookOpen size={14} className="mr-2" />
                        Take Policy Challenge Quiz
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col">
              {/* Desktop Header */}
              <div className="hidden lg:flex items-center justify-between p-4 border-b bg-white" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                    Policy Assistant
                  </h2>
                  <div 
                    className="ml-3 px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${colors.success}15`, color: colors.success }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: colors.success }}></span>
                    Online
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-2 rounded-lg text-sm flex items-center"
                    style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}
                    whileHover={{ backgroundColor: `${colors.secondary}20` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Star size={16} className="mr-1" />
                    Feedback
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg text-sm flex items-center"
                    style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                    whileHover={{ backgroundColor: `${colors.primary}20` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearChat}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear Chat
                  </motion.button>
                </div>
              </div>
              
              {/* Messages Container */}
              <div 
                className="flex-grow p-4 md:p-6 overflow-y-auto"
                style={{ backgroundColor: colors.lightBg }}
              >
                {messages.map((message, index) => {
                  // Check if date should be displayed (first message or new day)
                  const showDate = index === 0 || 
                    formatDate(message.timestamp) !== formatDate(messages[index-1].timestamp);
                  
                  return (
                    <React.Fragment key={message.id}>
                      {/* Date separator */}
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <div className="px-3 py-1 rounded-full text-xs bg-white shadow-sm" style={{ color: colors.secondary }}>
                            {formatDate(message.timestamp)}
                          </div>
                        </div>
                      )}
                      
                      {/* Message bubble */}
                      <motion.div
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { duration: message.isNew ? 0.3 : 0 }
                        }}
                      >
                        <div 
                          className={`max-w-xl rounded-lg px-4 py-3 shadow-sm ${
                            message.sender === 'user' 
                              ? 'rounded-br-none' 
                              : 'rounded-bl-none'
                          }`}
                          style={
                            message.sender === 'user' 
                              ? { 
                                  backgroundColor: colors.primary,
                                  color: 'white'
                                } 
                              : { 
                                  backgroundColor: 'white',
                                  borderLeft: `3px solid ${colors.accent}`
                                }
                          }
                        >
                          <div className="flex items-center mb-2">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                                message.sender === 'user' ? 'bg-white' : `bg-${colors.accent}50`
                              }`}
                              style={
                                message.sender === 'user' 
                                  ? { color: colors.primary } 
                                  : { backgroundColor: `${colors.accent}15`, color: colors.accent }
                              }
                            >
                              {message.sender === 'user' ? (
                                <User size={14} />
                              ) : (
                                <Bot size={14} />
                              )}
                            </div>
                            <span 
                              className="text-xs font-medium"
                              style={{ 
                                color: message.sender === 'user' 
                                  ? 'rgba(255, 255, 255, 0.9)' 
                                  : colors.text 
                              }}
                            >
                              {message.sender === 'user' ? 'You' : 'Policy Assistant'}
                            </span>
                            <span 
                              className="text-xs ml-auto"
                              style={{ 
                                color: message.sender === 'user' 
                                  ? 'rgba(255, 255, 255, 0.7)' 
                                  : 'rgba(0, 0, 0, 0.4)' 
                              }}
                            >
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          
                          <div 
                            className={`text-sm whitespace-pre-line ${
                              message.sender === 'user' ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {message.text}
                          </div>
                          
                          {/* Action buttons for bot messages */}
                          {message.sender === 'bot' && index > 0 && (
                            <div className="flex justify-end mt-3 pt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                              <div className="flex space-x-3">
                                <motion.button 
                                  className="p-1 rounded-md text-xs flex items-center text-gray-500 hover:bg-gray-100"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  title="Copy this response"
                                >
                                  <Copy size={14} className="mr-1" />
                                  <span className="hidden sm:inline">Copy</span>
                                </motion.button>
                                <motion.button 
                                  className="p-1 rounded-md text-xs flex items-center text-gray-500 hover:bg-gray-100"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  title="Share this information"
                                >
                                  <Share size={14} className="mr-1" />
                                  <span className="hidden sm:inline">Share</span>
                                </motion.button>
                                <motion.button 
                                  className="p-1 rounded-md text-xs flex items-center text-gray-500 hover:bg-gray-100"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  title="This was helpful"
                                >
                                  <ThumbsUp size={14} className="mr-1" />
                                  <span className="hidden sm:inline">Helpful</span>
                                </motion.button>
                                <motion.button 
                                  className="p-1 rounded-md text-xs flex items-center text-gray-500 hover:bg-gray-100"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  title="This wasn't helpful"
                                >
                                  <ThumbsDown size={14} className="mr-1" />
                                  <span className="hidden sm:inline">Not Helpful</span>
                                </motion.button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </React.Fragment>
                  );
                })}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div 
                    className="flex justify-start mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div 
                      className="bg-white border rounded-lg px-4 py-3 shadow-sm rounded-bl-none"
                      style={{ borderLeft: `3px solid ${colors.accent}` }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center mr-2"
                          style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                        >
                          <Bot size={14} />
                        </div>
                        <span 
                          className="text-xs font-medium"
                          style={{ color: colors.text }}
                        >
                          Policy Assistant
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">Typing...</span>
                      </div>
                      <div className="flex items-center mt-2 ml-1">
                        <motion.div 
                          className="w-2 h-2 rounded-full mr-1" 
                          style={{ backgroundColor: colors.accent }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full mr-1" 
                          style={{ backgroundColor: colors.accent }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: colors.accent }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t bg-white" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Type your question about policies..."
                    className="w-full p-4 pr-14 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: `${colors.primary}20`,
                      focus: { ringColor: colors.primary }
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                  />
                  
                  <motion.button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-2.5 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </motion.button>
                </form>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500 flex items-center">
                    <Lock size={12} className="mr-1" />
                    Your conversations are saved securely
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 rounded text-xs text-gray-500 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowSuggestions(true)}
                    >
                      <Sparkles size={12} className="mr-1" />
                      <span>Suggestions</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFeedbackForm(false)}></div>
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-md relative z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  {feedbackSubmitted ? 'Thank You!' : 'Provide Feedback'}
                </h3>
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowFeedbackForm(false)}
                >
                  <X size={16} style={{ color: colors.neutralGray }} />
                </button>
              </div>
              
              <div className="p-5">
                {feedbackSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle size={48} className="mx-auto mb-4" style={{ color: colors.success }} />
                    <p className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                      Feedback Received
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      Thank you for helping us improve the Policy Assistant!
                    </p>
                    <motion.button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowFeedbackForm(false);
                        setFeedbackSubmitted(false);
                      }}
                    >
                      Close
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Your feedback helps us improve the Policy Assistant. Please share your thoughts with us.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                          How would you rate your experience?
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <motion.button
                              key={rating}
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ 
                                backgroundColor: `${colors.primary}10`,
                                color: colors.primary
                              }}
                              whileHover={{ scale: 1.1, backgroundColor: `${colors.primary}20` }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {rating}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                          What could be improved?
                        </label>
                        <textarea
                          className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: `${colors.primary}20`,
                            focus: { ringColor: colors.primary }
                          }}
                          rows={4}
                          placeholder="Share your feedback here..."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <motion.button
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: colors.primary, color: 'white' }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFeedbackSubmitted(true)}
                        >
                          Submit Feedback
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;