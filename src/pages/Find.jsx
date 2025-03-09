import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bot, 
  Star,
  FileText,
  Filter,
  ChevronRight,
  BookOpen,
  UserCheck,
  Check,
  AlertTriangle,
  Info,
  Award,
  Scale,
  ChevronDown
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ViewDetailPolicy from '../components/ViewDetailPolicy';

const FindPage = () => {
  // Color Palette (same as Legal and HomePage)
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

  // State management
  const [formData, setFormData] = useState({
    age: '',
    profession: '',
    incomeRange: '',
    location: '',
    interests: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMethod, setSortMethod] = useState('Relevance');
  const [savedPolicies, setSavedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  
  // Pagination state
  const [visiblePolicies, setVisiblePolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const policiesPerPage = 6;
  const [hasMorePolicies, setHasMorePolicies] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // New state for view detail modal
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Map icon names to actual Lucide components
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Award': return <Award />;
      case 'FileText': return <FileText />;
      case 'UserCheck': return <UserCheck />;
      case 'Info': return <Info />;
      case 'Scale': return <Scale />;
      case 'AlertTriangle': return <AlertTriangle />;
      case 'BookOpen': return <BookOpen />;
      case 'Check': return <Check />;
      default: return <FileText />;
    }
  };

  // Fetch policies from Supabase
  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*');

        if (error) throw error;

        // Transform the data to include icon components
        const policiesWithIcons = data.map(policy => ({
          ...policy,
          icon: getIconComponent(policy.icon_name)
        }));

        setPolicies(policiesWithIcons);
        setFilteredPolicies(policiesWithIcons);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Search and filter handler - Fixed version
  useEffect(() => {
    if (!policies.length) return;
    
    let result = [...policies]; // Create a copy to avoid mutating the original

    // Filter by category - Fix: Make case-insensitive comparison
    if (selectedCategory !== 'All') {
      result = result.filter(policy => 
        policy.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(policy => 
        policy.name.toLowerCase().includes(lowercaseQuery) ||
        policy.description.toLowerCase().includes(lowercaseQuery) ||
        policy.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Sorting
    switch (sortMethod) {
      case 'Latest':
        result.sort((a, b) => b.id - a.id); // Higher id is newer
        break;
      case 'Most Popular':
        // In a real app, you'd have a popularity field or join with a views/saves table
        result.sort((a, b) => (a.id % 3) - (b.id % 3)); // Just a mock sorting for demo
        break;
      case 'Relevance':
      default:
        // For relevance, we'll use a simple approach based on match with user interests
        if (formData.interests.length > 0) {
          result.sort((a, b) => {
            // Check if tags match any user interests
            const aMatches = a.tags.filter(tag => 
              formData.interests.some(interest => 
                tag.toLowerCase().includes(interest.toLowerCase())
              )
            ).length;
            
            const bMatches = b.tags.filter(tag => 
              formData.interests.some(interest => 
                tag.toLowerCase().includes(interest.toLowerCase())
              )
            ).length;
            
            return bMatches - aMatches; // Higher matches first
          });
        }
        break;
    }
    
    setFilteredPolicies(result);
    // Reset pagination when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortMethod, policies, formData.interests]);

  // Update visible policies based on pagination
  useEffect(() => {
    if (filteredPolicies.length === 0) {
      setVisiblePolicies([]);
      setHasMorePolicies(false);
      return;
    }
    
    const lastItemIndex = currentPage * policiesPerPage;
    const newVisiblePolicies = filteredPolicies.slice(0, lastItemIndex);
    
    setVisiblePolicies(newVisiblePolicies);
    setHasMorePolicies(lastItemIndex < filteredPolicies.length);
  }, [filteredPolicies, currentPage, policiesPerPage]);

  // Load more policies
  const loadMorePolicies = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500); // Add a small delay to show loading state
  };

  // Save policy handler
  const toggleSavePolicy = async (policy) => {
    try {
      const isSaved = savedPolicies.some(p => p.id === policy.id);
      
      if (isSaved) {
        // Remove from saved policies
        setSavedPolicies(prev => prev.filter(p => p.id !== policy.id));
        
        // If you have a saved_policies table in Supabase, you would delete the record:
        // await supabase
        //   .from('saved_policies')
        //   .delete()
        //   .eq('user_id', user.id)
        //   .eq('policy_id', policy.id);
      } else {
        // Add to saved policies
        setSavedPolicies(prev => [...prev, policy]);
        
        // If you have a saved_policies table in Supabase, you would insert a record:
        // await supabase
        //   .from('saved_policies')
        //   .insert([{ user_id: user.id, policy_id: policy.id }]);
      }
    } catch (err) {
      console.error('Error toggling saved policy:', err);
    }
  };

  // Find matching policies based on user profile
  const findMatchingPolicies = async () => {
    setLoading(true);
    try {
      // In a real app, you'd send the formData to a Supabase Edge Function 
      // or use a more sophisticated query to find matching policies
      
      // Example of how you might query based on user interests
      let query = supabase.from('policies').select('*');
      
      if (formData.profession) {
        // Using ilike for case-insensitive pattern matching
        // This searches both description and eligibility for the profession
        query = query.or(`description.ilike.%${formData.profession}%,eligibility.ilike.%${formData.profession}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform and sort by relevance
      const policiesWithIcons = data.map(policy => ({
        ...policy,
        icon: getIconComponent(policy.icon_name)
      }));
      
      // Sort based on interests if available
      if (formData.interests.length > 0) {
        policiesWithIcons.sort((a, b) => {
          const aRelevance = a.tags.filter(tag => 
            formData.interests.some(interest => tag.includes(interest.toLowerCase()))
          ).length;
          
          const bRelevance = b.tags.filter(tag => 
            formData.interests.some(interest => tag.includes(interest.toLowerCase()))
          ).length;
          
          return bRelevance - aRelevance;
        });
      }
      
      setPolicies(policiesWithIcons);
      setFilteredPolicies(policiesWithIcons);
      setCurrentPage(1); // Reset to first page when searching for new policies
      
    } catch (err) {
      console.error('Error finding matching policies:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // New function to handle opening the detail view
  const openPolicyDetail = (policy) => {
    setSelectedPolicy(policy);
    setIsDetailModalOpen(true);
  };

  // Loading state
  if (loading && !filteredPolicies.length) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4 mx-auto" 
            style={{ borderColor: colors.primary }}></div>
          <p className="text-lg">Loading policies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !filteredPolicies.length) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md text-center">
          <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: colors.accent }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Error Loading Policies</h2>
          <p className="mb-4" style={{ color: colors.text }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: colors.primary, 
              color: colors.background 
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${colors.accent}30`,
                color: colors.accent
              }}
            >
              Find What Matters to You
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Discover Relevant
              <br />
              <span style={{ color: colors.primary }}>
                Government Policies
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: `${colors.text}90` }}>
              Browse, search, and filter policies that match your needs and interests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* User Input Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-8"
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Tell Us About Yourself
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Age
              </label>
              <input 
                type="number" 
                name="age"
                placeholder="Your age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}10`,
                  color: colors.text,
                  borderColor: `${colors.primary}30`
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Profession
              </label>
              <select 
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}10`,
                  color: colors.text,
                  borderColor: `${colors.primary}30`
                }}
              >
                <option value="">Select Profession</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="business">Business Owner</option>
                <option value="freelancer">Freelancer</option>
                <option value="retired">Retired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Income Range
              </label>
              <select 
                name="incomeRange"
                value={formData.incomeRange}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}10`,
                  color: colors.text,
                  borderColor: `${colors.primary}30`
                }}
              >
                <option value="">Select Income Range</option>
                <option value="low">Below $20,000</option>
                <option value="medium-low">$20,000 - $40,000</option>
                <option value="medium">$40,000 - $60,000</option>
                <option value="medium-high">$60,000 - $100,000</option>
                <option value="high">Above $100,000</option>
              </select>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Location
              </label>
              <input 
                type="text" 
                name="location"
                placeholder="City or region"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}10`,
                  color: colors.text,
                  borderColor: `${colors.primary}30`
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {['Education', 'Healthcare', 'Business', 'Technology', 'Environment'].map((interest) => (
                  <button
                    key={interest}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.interests.includes(interest) ? 'font-semibold' : ''
                    }`}
                    style={{ 
                      backgroundColor: formData.interests.includes(interest) 
                        ? colors.primary 
                        : `${colors.secondary}20`,
                      color: formData.interests.includes(interest) 
                        ? 'white' 
                        : colors.text
                    }}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        interests: prev.interests.includes(interest)
                          ? prev.interests.filter(i => i !== interest)
                          : [...prev.interests, interest]
                      }));
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <motion.button 
              className="px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-lg"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={findMatchingPolicies}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" 
                    style={{ borderColor: colors.background }}></div>
                  Finding Policies...
                </>
              ) : (
                'Find Matching Policies'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                color: colors.text,
                borderColor: `${colors.primary}30`
              }}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
              size={20}
              style={{ color: colors.accent }}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                color: colors.text,
                borderColor: `${colors.primary}30`
              }}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Financial">Financial</option>
              <option value="Social">Social</option>
              <option value="Legal">Legal</option>
            </select>
            
            <select 
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
              className="px-4 py-3 rounded-lg"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                color: colors.text,
                borderColor: `${colors.primary}30`
              }}
              aria-label="Sort policies"
            >
              <option value="Relevance">Most Relevant</option>
              <option value="Latest">Latest</option>
              <option value="Most Popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Policy Results */}
        <div className="mb-6 flex justify-between items-center">
          <h2 
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            Available Policies
            {selectedCategory !== 'All' && (
              <span className="ml-2" style={{ color: colors.accent }}>
                • {selectedCategory}
              </span>
            )}
          </h2>
          <div className="flex items-center text-sm">
            <span>Found {filteredPolicies.length} policies</span>
            <span className="mx-2">|</span>
            <span>Showing {visiblePolicies.length} policies</span>
            <button 
              className="ml-3 flex items-center text-sm"
              style={{ color: colors.primary }}
            >
              <Filter size={16} className="mr-1" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Check if we have policies to display */}
        {filteredPolicies.length === 0 ? (
          <div 
            className="bg-white rounded-xl shadow-xl p-8 text-center"
            style={{ color: colors.text }}
          >
            <AlertTriangle size={40} className="mx-auto mb-4" style={{ color: colors.accent }} />
            <h3 className="text-xl font-bold mb-2">No policies found</h3>
            <p className="opacity-80 mb-4">Try adjusting your search or filters to find more results.</p>
            <button 
              className="px-4 py-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background 
              }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSortMethod('Relevance');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            {/* Policy cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePolicies.map((policy) => (
                <div 
                  key={policy.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:-translate-y-1"
                >
                  {/* Simple colored header with title and category */}
                  <div 
                    className="p-4"
                    style={{ 
                      backgroundColor: 
                        policy.category === 'Financial' ? colors.primary :
                        policy.category === 'Social' ? colors.accent :
                        colors.secondary,
                      color: colors.background
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {policy.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{policy.name}</h3>
                          <span className="text-xs">{policy.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleSavePolicy(policy)}
                      >
                        <Star 
                          size={20} 
                          fill={savedPolicies.some(p => p.id === policy.id) ? "#FFD700" : "none"}
                          color={savedPolicies.some(p => p.id === policy.id) ? "#FFD700" : colors.background}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Simple card content */}
                  <div className="p-5">
                    {/* Description */}
                    <p className="text-sm mb-4" style={{ color: colors.text }}>
                      {policy.description}
                    </p>
                    
                    {/* Eligibility */}
                    <div className="mb-4">
                      <h4 
                        className="text-sm font-semibold mb-1"
                        style={{ color: colors.primary }}
                      >
                        Eligibility
                      </h4>
                      <p className="text-xs" style={{ color: colors.text }}>
                        {policy.eligibility}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {policy.tags && policy.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${colors.secondary}10`,
                            color: colors.text
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Detail Button */}
                    <button
                      className="w-full py-2 rounded-lg text-sm font-medium text-center"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: 'white'
                      }}
                      onClick={() => openPolicyDetail(policy)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMorePolicies && (
              <div className="mt-8 text-center">
                <motion.button
                  className="px-6 py-4 rounded-lg font-medium flex items-center justify-center mx-auto"
                  style={{ 
                    backgroundColor: `${colors.secondary}10`,
                    color: colors.text
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loadMorePolicies}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" 
                        style={{ borderColor: colors.text }}></div>
                      Loading More...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">More Policies</span>
                      <ChevronDown size={18} />
                    </>
                  )}
                </motion.button>
                <p className="mt-2 text-sm opacity-70">
                  Showing {visiblePolicies.length} of {filteredPolicies.length} policies
                </p>
              </div>
            )}
          </div>
        )}

        {/* AI Assistance Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div 
            className="p-6"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.background
            }}
          >
            <h3 className="text-2xl font-bold">Need Help Finding the Right Policies?</h3>
            <p className="opacity-90 mt-2">
              Our AI assistant can guide you through available options and suggest the most relevant policies for your situation.
            </p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 
                className="text-xl font-semibold mb-4"
                style={{ color: colors.text }}
              >
                How Our AI Can Help
              </h4>
              <ul className="space-y-3">
                {[
                  "Ask specific questions about policies",
                  "Get personalized recommendations based on your profile",
                  "Understand complex eligibility requirements",
                  "Learn about application processes and deadlines"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check 
                      size={18} 
                      className="mr-2 mt-1 flex-shrink-0" 
                      style={{ color: colors.accent }}
                    />
                    <span style={{ color: colors.text }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/chatbot">
                <motion.button 
                  className="mt-6 px-6 py-3 rounded-lg font-medium flex items-center shadow-lg"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.background 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bot size={20} className="mr-2" />
                  Chat with AI Assistant
                </motion.button>
              </a>
            </div>
            <div className="flex justify-center">
              <Bot 
                size={180} 
                className="opacity-40" 
                style={{ color: colors.primary }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Policy Detail Modal */}
      <ViewDetailPolicy 
        policy={selectedPolicy}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        savedPolicies={savedPolicies}
        toggleSavePolicy={toggleSavePolicy}
      />
    </div>
  );
};

export default FindPage;