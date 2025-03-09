import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Camera, 
  AlertCircle,
  Loader
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Profile = () => {
  // Color palette matching your app
  const colors = {
    background: '#E9BCB9',
    secondary: '#1C1938',
    primary: '#67254B',
    accent: '#AD445A',
    text: '#451851'
  };

  // User state
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    avatar_url: ''
  });
  
  // File upload state
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get authenticated user
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!session) {
          // Redirect to login if not authenticated
          window.location.href = '/signin';
          return;
        }
        
        setUser(session.user);
        
        // Get user data from profiles table
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        // If user exists in table
        if (data) {
          setUserData(data);
          setFormData({
            full_name: data.full_name || session.user.user_metadata?.full_name || '',
            email: session.user.email || '',
            bio: data.bio || '',
            phone: data.phone || '',
            location: data.location || '',
            website: data.website || '',
            avatar_url: data.avatar_url || session.user.user_metadata?.avatar_url || ''
          });
        } else {
          // Use data from auth metadata if no profile exists yet
          setFormData({
            full_name: session.user.user_metadata?.full_name || '',
            email: session.user.email || '',
            bio: '',
            phone: '',
            location: '',
            website: '',
            avatar_url: session.user.user_metadata?.avatar_url || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  // Upload avatar to Supabase storage
  const uploadAvatar = async () => {
    if (!avatarFile) return null;
    
    try {
      setUploadingAvatar(true);
      
      // Create a unique file path
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, avatarFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Failed to upload profile picture');
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };
  
  // Save profile data to Supabase
  const saveProfile = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Upload avatar if changed
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        const newAvatarUrl = await uploadAvatar();
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl;
        }
      }
      
      // Prepare data for update
      const updates = {
        id: user.id,
        full_name: formData.full_name,
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };
      
      // Update user profile in database
      const { error } = await supabase
        .from('users')
        .upsert(updates, { onConflict: 'id' });
        
      if (error) {
        throw error;
      }
      
      // Also update auth metadata (for full_name and avatar)
      await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          avatar_url: avatarUrl
        }
      });
      
      // Update local state
      setFormData(prev => ({
        ...prev,
        avatar_url: avatarUrl
      }));
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Reset file state
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  // Cancel editing
  const cancelEditing = () => {
    // Reset form data to current values
    if (userData) {
      setFormData({
        full_name: userData.full_name || user?.user_metadata?.full_name || '',
        email: user?.email || '',
        bio: userData.bio || '',
        phone: userData.phone || '',
        location: userData.location || '',
        website: userData.website || '',
        avatar_url: userData.avatar_url || user?.user_metadata?.avatar_url || ''
      });
    }
    
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div 
          className="min-h-screen pt-20 flex items-center justify-center"
          style={{ backgroundColor: colors.background }}
        >
          <div className="text-center">
            <Loader 
              size={48} 
              className="animate-spin mx-auto mb-4" 
              style={{ color: colors.primary }}
            />
            <p 
              className="text-lg font-medium"
              style={{ color: colors.text }}
            >
              Loading your profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div 
        className="min-h-screen pt-20 pb-16"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div 
              className="px-6 py-10 sm:px-10"
              style={{ 
                backgroundColor: colors.secondary,
                color: 'white'
              }}
            >
              <div className="flex flex-col sm:flex-row items-center">
                <div className="relative mb-6 sm:mb-0 sm:mr-8">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                    {isEditing && avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : formData.avatar_url ? (
                      <img 
                        src={formData.avatar_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
                      >
                        <span className="text-white text-4xl font-medium">
                          {formData.full_name?.charAt(0).toUpperCase() || formData.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    
                    {isEditing && (
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute bottom-0 right-0 bg-accent text-white p-1.5 rounded-full cursor-pointer shadow-md"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Camera size={18} />
                        <input 
                          type="file" 
                          id="avatar-upload" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {formData.full_name || "Your Profile"}
                  </h1>
                  <p className="text-gray-300 mt-1">
                    {formData.email}
                  </p>
                  
                  {userData?.created_at && (
                    <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-gray-300">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        Joined {new Date(userData.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 sm:mt-0">
                  {!isEditing ? (
                    <motion.button
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit Profile
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        className="flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: 'white'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveProfile}
                        disabled={saving}
                      >
                        {saving ? (
                          <Loader size={16} className="animate-spin mr-2" />
                        ) : (
                          <Save size={16} className="mr-2" />
                        )}
                        {saving ? 'Saving...' : 'Save'}
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelEditing}
                        disabled={saving}
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Notification messages */}
              {error && (
                <div 
                  className="mt-4 p-3 rounded-lg flex items-center text-white text-sm"
                  style={{ backgroundColor: '#f44336' }}
                >
                  <AlertCircle size={16} className="mr-2" />
                  {error}
                </div>
              )}
              
              {success && (
                <div 
                  className="mt-4 p-3 rounded-lg flex items-center text-white text-sm"
                  style={{ backgroundColor: '#4caf50' }}
                >
                  <AlertCircle size={16} className="mr-2" />
                  {success}
                </div>
              )}
            </div>
            
            {/* Profile Content */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Personal Info */}
                <div>
                  <h2 
                    className="text-xl font-semibold mb-6"
                    style={{ color: colors.text }}
                  >
                    Personal Information
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                          style={{ 
                            borderColor: `${colors.accent}40`,
                            focusRing: colors.accent
                          }}
                          placeholder="Your full name"
                        />
                      ) : (
                        <p 
                          className="text-lg"
                          style={{ color: colors.text }}
                        >
                          {formData.full_name || "Not provided"}
                        </p>
                      )}
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Email
                      </label>
                      <p 
                        className="text-lg flex items-center"
                        style={{ color: colors.text }}
                      >
                        <Mail size={18} className="mr-2" style={{ color: colors.accent }} />
                        {formData.email}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Your email cannot be changed
                      </p>
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                          style={{ 
                            borderColor: `${colors.accent}40`,
                            focusRing: colors.accent
                          }}
                          placeholder="Your phone number"
                        />
                      ) : (
                        <p 
                          className="text-lg"
                          style={{ color: colors.text }}
                        >
                          {formData.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                    
                    {/* Location */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                          style={{ 
                            borderColor: `${colors.accent}40`,
                            focusRing: colors.accent
                          }}
                          placeholder="Your location"
                        />
                      ) : (
                        <p 
                          className="text-lg"
                          style={{ color: colors.text }}
                        >
                          {formData.location || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - About & Links */}
                <div>
                  <h2 
                    className="text-xl font-semibold mb-6"
                    style={{ color: colors.text }}
                  >
                    About & Links
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio || ''}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                          style={{ 
                            borderColor: `${colors.accent}40`,
                            focusRing: colors.accent
                          }}
                          placeholder="Tell us about yourself"
                        />
                      ) : (
                        <p 
                          className="text-lg"
                          style={{ color: colors.text }}
                        >
                          {formData.bio || "No bio provided"}
                        </p>
                      )}
                    </div>
                    
                    {/* Website */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.primary }}
                      >
                        Website
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="website"
                          value={formData.website || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                          style={{ 
                            borderColor: `${colors.accent}40`,
                            focusRing: colors.accent
                          }}
                          placeholder="https://your-website.com"
                        />
                      ) : (
                        <p 
                          className="text-lg"
                          style={{ color: colors.text }}
                        >
                          {formData.website ? (
                            <a 
                              href={formData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline"
                              style={{ color: colors.accent }}
                            >
                              {formData.website}
                            </a>
                          ) : (
                            "Not provided"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;