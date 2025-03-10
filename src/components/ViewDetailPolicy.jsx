import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share, Calendar, Clock, User, Building, Link, ArrowRight, Star } from 'lucide-react';

const ViewDetailPolicy = ({ policy, isOpen, onClose, savedPolicies, toggleSavePolicy }) => {
  // Color Palette (same as FindPage)
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

  if (!policy) return null;

  // Get category color
  const getCategoryColor = () => {
    switch (policy.category) {
      case 'Financial': return colors.primary;
      case 'Social': return colors.accent;
      case 'Legal': return colors.secondary;
      default: return colors.primary;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            {/* Header */}
            <div 
              className="p-6"
              style={{ 
                backgroundColor: getCategoryColor(),
                color: colors.background
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="mr-4">
                    {policy.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{policy.name}</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-2"
                      style={{ backgroundColor: `${colors.background}30` }}
                    >
                      {policy.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => toggleSavePolicy(policy)}
                    className="p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                    aria-label={savedPolicies.some(p => p.id === policy.id) ? "Unsave policy" : "Save policy"}
                  >
                    <Star 
                      size={24} 
                      fill={savedPolicies.some(p => p.id === policy.id) ? "#FFD700" : "none"}
                      color={savedPolicies.some(p => p.id === policy.id) ? "#FFD700" : colors.background}
                    />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Policy Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>Overview</h3>
                  <p className="mb-6" style={{ color: colors.text }}>
                    {policy.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>Eligibility</h3>
                  <p className="mb-6" style={{ color: colors.text }}>
                    {policy.eligibility}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>Benefits</h3>
                  <ul className="list-disc pl-5 mb-6" style={{ color: colors.text }}>
                    {/* Generate some fake benefits based on the policy description */}
                    {[
                      `Access to ${policy.category.toLowerCase()} resources and support`,
                      `Guidance on ${policy.tags[0]} related matters`,
                      policy.category === 'Financial' ? 'Financial assistance for eligible participants' :
                      policy.category === 'Social' ? 'Community support and networking opportunities' :
                      'Legal advice and representation when needed'
                    ].map((benefit, index) => (
                      <li key={index} className="mb-1">{benefit}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>How to Apply</h3>
                  <ol className="list-decimal pl-5 mb-6" style={{ color: colors.text }}>
                    <li className="mb-2">Review the eligibility requirements carefully</li>
                    <li className="mb-2">Gather necessary documentation (ID, proof of income, residency)</li>
                    <li className="mb-2">Complete the online application form</li>
                    <li className="mb-2">Submit supporting documents as requested</li>
                    <li className="mb-2">Await confirmation of your application status</li>
                  </ol>
                </div>
                
                <div>
                  <div 
                    className="bg-white p-5 rounded-lg mb-6 shadow-md"
                    style={{ 
                      backgroundColor: `${colors.secondary}10`,
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Key Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="mr-3 flex-shrink-0" size={20} style={{ color: colors.accent }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Effective Date</p>
                          <p className="text-sm" style={{ color: `${colors.text}90` }}>January 1, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="mr-3 flex-shrink-0" size={20} style={{ color: colors.accent }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Application Deadline</p>
                          <p className="text-sm" style={{ color: `${colors.text}90` }}>Open enrollment</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="mr-3 flex-shrink-0" size={20} style={{ color: colors.accent }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Target Recipients</p>
                          <p className="text-sm" style={{ color: `${colors.text}90` }}>
                            {policy.category === 'Financial' ? 'Low to middle income individuals' :
                             policy.category === 'Social' ? 'Residents in need of social services' :
                             'Citizens seeking legal assistance'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Building className="mr-3 flex-shrink-0" size={20} style={{ color: colors.accent }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: colors.text }}>Administering Agency</p>
                          <p className="text-sm" style={{ color: `${colors.text}90` }}>
                            {policy.category === 'Financial' ? 'Department of Finance' :
                             policy.category === 'Social' ? 'Department of Social Services' :
                             'Department of Justice'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: colors.text }}>Related Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {policy.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${colors.secondary}10`,
                            color: colors.text
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Related Resources */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: colors.text }}>Related Resources</h3>
                    <ul className="space-y-3">
                      {[
                        "Policy Guidelines",
                        "Application Form",
                        "FAQ Document"
                      ].map((resource, index) => (
                        <li key={index}>
                          <a 
                            href="#" 
                            className="flex items-center text-sm hover:underline"
                            style={{ color: colors.primary }}
                          >
                            <Link size={16} className="mr-2" />
                            {resource}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewDetailPolicy;