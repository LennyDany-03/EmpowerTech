import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bot, 
  Star
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabaseClient';

const FindPage = () => {
  // Color Palette from HomePage
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
    text: '#451851'
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
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMethod, setSortMethod] = useState('Relevance');
  const [savedPolicies, setSavedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch policies from Supabase
  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*');

        if (error) throw error;

        setPolicies(data || []);
        setFilteredPolicies(data || []);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError(err);
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

  // Search and filter handler
  useEffect(() => {
    let result = policies;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(policy => policy.category === selectedCategory);
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
        result.sort((a, b) => b.id - a.id);
        break;
      case 'Most Popular':
        // Add a popularity metric if available
        break;
      default: // Relevance
        // Default sorting or potential AI-powered relevance sorting
        break;
    }

    setFilteredPolicies(result);
  }, [searchQuery, selectedCategory, sortMethod, policies]);

  // Save policy handler
  const toggleSavePolicy = (policy) => {
    setSavedPolicies(prev => 
      prev.some(p => p.id === policy.id)
        ? prev.filter(p => p.id !== policy.id)
        : [...prev, policy]
    );
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

  // Loading and error states
  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        <p>Loading policies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        <p>Error loading policies: {error.message}</p>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Input Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg"
          style={{ 
            backgroundColor: `${colors.secondary}20`,
            borderColor: `${colors.primary}30`
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Tell Us About Yourself
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <input 
              type="number" 
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            />
            <select 
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            >
              <option value="">Select Profession</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="business">Business Owner</option>
              <option value="freelancer">Freelancer</option>
            </select>
            <select 
              name="incomeRange"
              value={formData.incomeRange}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            >
              <option value="">Income Range</option>
              <option value="low">Below $20,000</option>
              <option value="medium">$20,000 - $50,000</option>
              <option value="high">Above $50,000</option>
            </select>
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
              className="w-full px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
              style={{ color: colors.accent }}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            >
              <option value="All">All Categories</option>
              <option value="Financial">Financial</option>
              <option value="Social">Social</option>
              <option value="Legal">Legal</option>
            </select>
            
            <select 
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: `${colors.secondary}10`,
                borderColor: `${colors.primary}30`,
                color: colors.text
              }}
            >
              <option value="Relevance">Most Relevant</option>
              <option value="Latest">Latest</option>
              <option value="Most Popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Policy Results */}
        {filteredPolicies.length === 0 ? (
          <div 
            className="text-center py-12"
            style={{ color: colors.text }}
          >
            No policies found matching your search.
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredPolicies.map((policy) => (
              <motion.div 
                key={policy.id}
                variants={itemVariants}
                className="rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                style={{ 
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.text
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${colors.accent}20`,
                      color: colors.accent
                    }}
                  >
                    {policy.category}
                  </span>
                  <button 
                    onClick={() => toggleSavePolicy(policy)}
                    className={`hover:text-yellow-500 transition-colors ${
                      savedPolicies.some(p => p.id === policy.id) 
                        ? 'text-yellow-500' 
                        : 'text-gray-400'
                    }`}
                  >
                    <Star size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2">{policy.name}</h3>
                <p className="opacity-80 mb-4">{policy.description}</p>
                <div className="mb-4">
                  <h4 
                    className="font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Eligibility
                  </h4>
                  <p className="text-sm opacity-80">{policy.eligibility}</p>
                </div>
                <button 
                  className="w-full py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: '#FFFFFF'
                  }}
                >
                  Read More
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* AI Assistance Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-xl p-8 text-center"
          style={{ 
            backgroundColor: `${colors.secondary}20`,
            color: colors.text
          }}
        >
          <div className="flex justify-center mb-4">
            <Bot 
              className="w-12 h-12" 
              style={{ color: colors.primary }}
            />
          </div>
          <h3 className="text-2xl font-bold mb-4">Not Sure? Ask Our AI!</h3>
          <p className="opacity-80 mb-6">
            Our AI assistant can help you find the most relevant policies for your specific situation.
          </p>
          <button 
            className="px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
            style={{ 
              backgroundColor: colors.primary,
              color: '#FFFFFF'
            }}
          >
            Chat with AI Assistant <Bot className="ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FindPage;