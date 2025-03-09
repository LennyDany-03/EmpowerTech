import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  HelpCircle,
  BookOpen,
  Zap,
  Star,
  TrendingUp,
  Clock,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import NavBar from '../components/NavBar';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const policyQuestions = [
    // Questions 1-10 (your existing questions)
    {
      id: 1,
      question: "What is the main purpose of a progressive tax system?",
      options: [
        "To tax everyone at the same rate regardless of income",
        "To tax higher incomes at higher rates than lower incomes",
        "To provide tax exemptions for large businesses",
        "To eliminate all forms of taxation"
      ],
      correctAnswer: 1,
      explanation: "A progressive tax system taxes individuals with higher incomes at higher rates than those with lower incomes, aiming to reduce economic inequality."
    },
    {
      id: 2,
      question: "Which of the following is a key feature of universal healthcare?",
      options: [
        "It provides healthcare only to the elderly",
        "It only covers emergency medical procedures",
        "It ensures all citizens have access to essential healthcare services",
        "It only applies to individuals with private insurance"
      ],
      correctAnswer: 2,
      explanation: "Universal healthcare ensures that all citizens, regardless of their financial status, have access to essential healthcare services."
    },
    {
      id: 3,
      question: "What is the primary goal of consumer protection policies?",
      options: [
        "To protect businesses from competition",
        "To safeguard consumers from unfair business practices and dangerous products",
        "To increase government revenue through fines",
        "To eliminate small businesses from the market"
      ],
      correctAnswer: 1,
      explanation: "Consumer protection policies aim to safeguard consumers from unfair business practices, deceptive advertising, and dangerous products."
    },
    {
      id: 4,
      question: "Which of the following best describes 'fiscal policy'?",
      options: [
        "Regulation of the banking system",
        "Government taxation and spending decisions to influence the economy",
        "Corporate finance strategies",
        "Individual investment decisions"
      ],
      correctAnswer: 1,
      explanation: "Fiscal policy refers to government decisions about taxation and spending that are designed to influence the overall economy."
    },
    {
      id: 5,
      question: "What is the main purpose of environmental protection policies?",
      options: [
        "To restrict business growth",
        "To increase government revenue through fines",
        "To preserve natural resources and reduce pollution",
        "To create jobs in the regulatory sector"
      ],
      correctAnswer: 2,
      explanation: "Environmental protection policies aim to preserve natural resources, protect ecosystems, and reduce pollution for current and future generations."
    },
    {
      id: 6,
      question: "Which of the following is a key aspect of affordable housing policies?",
      options: [
        "Increasing property taxes for all homeowners",
        "Providing subsidies or incentives to make housing more affordable for low-income individuals",
        "Restricting all new housing development",
        "Eliminating building codes and regulations"
      ],
      correctAnswer: 1,
      explanation: "Affordable housing policies often include subsidies, rent control, or incentives for developers to create housing that is affordable for low and middle-income households."
    },
    {
      id: 7,
      question: "What is the primary goal of anti-discrimination policies?",
      options: [
        "To provide equal opportunities and treatment regardless of personal characteristics",
        "To give preferential treatment to minority groups",
        "To increase diversity for statistical purposes only",
        "To create separate systems for different groups"
      ],
      correctAnswer: 0,
      explanation: "Anti-discrimination policies aim to provide equal opportunities and treatment for all individuals regardless of race, gender, age, disability, or other personal characteristics."
    },
    {
      id: 8,
      question: "Which of the following is a key principle of data privacy policies?",
      options: [
        "Allowing unlimited collection of personal data",
        "Requiring user consent for data collection and specifying how data will be used",
        "Sharing all data with government agencies",
        "Keeping all data collection secret from users"
      ],
      correctAnswer: 1,
      explanation: "Data privacy policies typically require organizations to obtain user consent before collecting personal data and to clearly explain how that data will be used."
    },
    {
      id: 9,
      question: "What is the main purpose of minimum wage laws?",
      options: [
        "To reduce employment opportunities",
        "To increase business profits",
        "To set a floor on wages to ensure workers earn a basic living",
        "To eliminate small businesses"
      ],
      correctAnswer: 2,
      explanation: "Minimum wage laws establish a legal minimum payment that workers must receive, aiming to ensure that workers can meet their basic living needs."
    },
    {
      id: 10,
      question: "Which of the following best describes social security systems?",
      options: [
        "Private savings accounts managed by banks",
        "Government programs providing financial support to vulnerable groups like the elderly or disabled",
        "Corporate pension plans",
        "Volunteer charity organizations"
      ],
      correctAnswer: 1,
      explanation: "Social security systems are government programs that provide financial assistance to specific populations such as the elderly, disabled, or unemployed."
    },
    
    // Questions 11-15 (new questions)
    {
      id: 11,
      question: "What is the primary aim of progressive education policies?",
      options: [
        "To eliminate traditional teaching methods entirely",
        "To focus solely on standardized testing",
        "To adapt education to individual learning styles and promote critical thinking",
        "To reduce government spending on public education"
      ],
      correctAnswer: 2,
      explanation: "Progressive education policies aim to adapt teaching methods to different learning styles, encourage critical thinking, and develop well-rounded individuals rather than focusing solely on standardized metrics."
    },
    {
      id: 12,
      question: "Which of the following best describes the purpose of public transportation policies?",
      options: [
        "To generate revenue for local governments",
        "To provide accessible, affordable mobility options for all citizens",
        "To eliminate private vehicle ownership",
        "To create jobs in the transportation sector"
      ],
      correctAnswer: 1,
      explanation: "Public transportation policies primarily aim to ensure that all citizens have access to affordable, reliable mobility options regardless of income level, age, or ability."
    },
    {
      id: 13,
      question: "What is a key objective of renewable energy policies?",
      options: [
        "To completely eliminate the use of fossil fuels immediately",
        "To increase energy costs to reduce consumption",
        "To transition to sustainable energy sources while reducing emissions",
        "To maintain the current energy infrastructure indefinitely"
      ],
      correctAnswer: 2,
      explanation: "Renewable energy policies aim to gradually transition from fossil fuels to sustainable energy sources like solar and wind, reducing carbon emissions while ensuring reliable energy supplies."
    },
    {
      id: 14,
      question: "What is the main purpose of food security policies?",
      options: [
        "To ensure all citizens have reliable access to adequate, nutritious food",
        "To increase profits for large agricultural corporations",
        "To eliminate international food trade",
        "To promote one specific type of diet nationwide"
      ],
      correctAnswer: 0,
      explanation: "Food security policies aim to ensure that all people have reliable access to sufficient, safe, and nutritious food that meets their dietary needs and preferences for an active, healthy life."
    },
    {
      id: 15,
      question: "Which of the following is a primary goal of labor rights policies?",
      options: [
        "To maximize corporate profits",
        "To prevent all labor disputes",
        "To ensure fair wages, safe working conditions, and protection from exploitation",
        "To eliminate labor unions"
      ],
      correctAnswer: 2,
      explanation: "Labor rights policies aim to protect workers from exploitation, ensure fair compensation and benefits, maintain safe working conditions, and provide mechanisms for resolving workplace disputes."
    }
  ];
const Learn = () => {
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

  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showCongratulation, setShowCongratulation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [timeBonus, setTimeBonus] = useState(0);
  const [showTimeBonus, setShowTimeBonus] = useState(false);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    attempts: 0,
    avgResponseTime: 0,
    bestStreak: 0
  });

  // Get current question
  const currentQuestion = policyQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!gameComplete && !isAnswered) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete, isAnswered]);

  // Set question start time when moving to a new question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  // Initialize game start time
  useEffect(() => {
    if (!gameStartTime) {
      setGameStartTime(Date.now());
    }
  }, []);
  
  // Check for user on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        
        // Get user's progress if they've played before
        const { data: progressData } = await supabase
          .from('policy_game_progress')
          .select('*')
          .eq('user_id', data.session.user.id)
          .single();
          
        if (progressData) {
          // Restore user's progress
          if (progressData.completed) {
            // If they completed the game, start fresh
            setCurrentQuestionIndex(0);
            setScore(0);
            setProgress(0);
          } else {
            // Resume from where they left off
            setCurrentQuestionIndex(progressData.current_question || 0);
            setScore(progressData.score || 0);
            setProgress(progressData.progress || 0);
            setStreakCount(progressData.current_streak || 0);
            setGameStats({
              correctAnswers: progressData.correct_answers || 0,
              wrongAnswers: progressData.wrong_answers || 0,
              attempts: progressData.attempts || 0,
              avgResponseTime: progressData.avg_response_time || 0,
              bestStreak: progressData.best_streak || 0
            });
          }
        }

        // Get leaderboard data
        fetchLeaderboard();
      }
    };
    
    getUser();
  }, []);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('policy_game_progress')
      .select('user_id, score, email')
      .order('score', { ascending: false })
      .limit(5);
      
    if (data && !error) {
      setLeaderboard(data);
    }
  };
  
  // Save progress to Supabase
  const saveProgress = async () => {
    if (!user) return;
    
    const progressData = {
      user_id: user.id,
      email: user.email,
      current_question: currentQuestionIndex,
      score: score,
      progress: progress,
      completed: gameComplete,
      correct_answers: gameStats.correctAnswers,
      wrong_answers: gameStats.wrongAnswers,
      attempts: gameStats.attempts,
      avg_response_time: gameStats.avgResponseTime,
      current_streak: streakCount,
      best_streak: gameStats.bestStreak,
      time_spent: timeSpent,
      last_updated: new Date().toISOString()
    };
    
    await supabase
      .from('policy_game_progress')
      .upsert(progressData, { onConflict: 'user_id' });
      
    // Refresh leaderboard if game is complete
    if (gameComplete) {
      fetchLeaderboard();
    }
  };
  
  // Save progress whenever relevant state changes
  useEffect(() => {
    if (user) {
      saveProgress();
    }
  }, [currentQuestionIndex, score, progress, gameComplete, gameStats, streakCount]);

  // Trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    // Calculate response time
    const responseTime = (Date.now() - questionStartTime) / 1000;
    let newAvgResponseTime = gameStats.avgResponseTime;
    
    if (gameStats.attempts > 0) {
      // Update running average
      newAvgResponseTime = 
        ((gameStats.avgResponseTime * gameStats.attempts) + responseTime) / 
        (gameStats.attempts + 1);
    } else {
      newAvgResponseTime = responseTime;
    }
    
    if (isCorrect) {
      // Calculate time bonus (faster answers get more bonus points)
      const calculatedTimeBonus = responseTime < 5 ? 5 : 
                                 responseTime < 10 ? 3 : 
                                 responseTime < 15 ? 1 : 0;
      
      setTimeBonus(calculatedTimeBonus);
      
      // Base points + time bonus
      const pointsEarned = 10 + calculatedTimeBonus;
      
      // Update score with streak multiplier if applicable
      let newStreakCount = streakCount + 1;
      let streakMultiplier = 1;
      
      // Apply streak multiplier if streak >= 3
      if (newStreakCount >= 3) {
        streakMultiplier = Math.min(2, 1 + ((newStreakCount - 2) * 0.1)); // Max 2x multiplier
        const totalPoints = Math.round(pointsEarned * streakMultiplier);
        setScore(score + totalPoints);
        
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 2000);
      } else {
        setScore(score + pointsEarned);
      }
      
      // Update streak count
      setStreakCount(newStreakCount);
      
      // Update best streak if current streak is higher
      const newBestStreak = Math.max(newStreakCount, gameStats.bestStreak);
      
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        attempts: prev.attempts + 1,
        avgResponseTime: newAvgResponseTime,
        bestStreak: newBestStreak
      }));
      
      // Show congratulation on correct answer
      setShowCongratulation(true);
      setShowTimeBonus(calculatedTimeBonus > 0);
      setTimeout(() => {
        setShowCongratulation(false);
        setShowTimeBonus(false);
      }, 2000);
      
      // Trigger confetti for correct answer
      triggerConfetti();
    } else {
      // Reset streak on wrong answer
      setStreakCount(0);
      
      setGameStats(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
        attempts: prev.attempts + 1,
        avgResponseTime: newAvgResponseTime
      }));
    }
    
    // Calculate progress percentage
    const newProgress = ((currentQuestionIndex + 1) / policyQuestions.length) * 100;
    setProgress(newProgress);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < policyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Game complete
      setGameComplete(true);
      
      // Trigger final confetti celebration
      triggerConfetti();
      setTimeout(() => triggerConfetti(), 500);
      setTimeout(() => triggerConfetti(), 1000);
    }
  };
  
  // Restart the game
  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setGameComplete(false);
    setProgress(0);
    setStreakCount(0);
    setTimeSpent(0);
    setGameStartTime(Date.now());
    setGameStats({
      correctAnswers: 0,
      wrongAnswers: 0,
      attempts: 0,
      avgResponseTime: 0,
      bestStreak: 0
    });
    setShowLeaderboard(false);
  };

  // Format time (seconds) to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <NavBar />
      
      <div 
        className="min-h-screen pt-20 pb-12 px-4 sm:px-6"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header with progress bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-2">
              <h1 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: colors.text }}
              >
                <BookOpen className="inline-block mr-2" /> Policy Learning Challenge
              </h1>
              
              <div className="flex items-center space-x-4">
                {/* Timer display */}
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  style={{ backgroundColor: `${colors.secondary}20`, color: colors.text }}
                >
                  <Clock size={16} className="mr-1" />
                  {formatTime(timeSpent)}
                </div>
                
                <div className="text-right">
                  <motion.div 
                    className="text-sm font-medium flex items-center justify-end"
                    style={{ color: colors.primary }}
                    key={score}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Trophy size={16} className="mr-1" />
                    Score: {score}
                  </motion.div>
                  <div className="text-xs" style={{ color: colors.text }}>
                    Question {currentQuestionIndex + 1} of {policyQuestions.length}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div 
              className="h-5 w-full rounded-full overflow-hidden relative"
              style={{ backgroundColor: `${colors.secondary}30` }}
            >
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Progress markers */}
              {Array.from({ length: policyQuestions.length }).map((_, index) => {
                const markerPosition = (index / (policyQuestions.length - 1)) * 100;
                const isCompleted = (index <= currentQuestionIndex && isAnswered) || 
                                  index < currentQuestionIndex;
                return (
                  <motion.div
                    key={index}
                    className="absolute top-0 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/4"
                    style={{ 
                      left: `${markerPosition}%`,
                      backgroundColor: isCompleted ? colors.accent : 'white',
                      border: `2px solid ${colors.secondary}`,
                      zIndex: 10
                    }}
                    animate={index === currentQuestionIndex ? { 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    } : {}}
                    transition={{ repeat: index === currentQuestionIndex ? Infinity : 0, duration: 2 }}
                  />
                );
              })}
            </div>
            
            {/* Current streak display */}
            {streakCount >= 3 && !gameComplete && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 flex items-center justify-end"
              >
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                >
                  <TrendingUp size={16} className="mr-1" />
                  <span className="mr-1">Streak:</span>
                  <motion.span
                    key={streakCount}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {streakCount}
                  </motion.span>
                  <motion.span 
                    className="ml-2"
                    animate={{ opacity: [0, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    🔥
                  </motion.span>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Game area */}
          {!gameComplete ? (
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Question */}
              <div 
                className="px-6 py-8"
                style={{ backgroundColor: colors.secondary, color: 'white' }}
              >
                <motion.h2 
                  className="text-xl md:text-2xl font-medium mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm" style={{ backgroundColor: colors.accent }}>
                    {currentQuestionIndex + 1}
                  </span>
                  {currentQuestion.question}
                </motion.h2>
                <p className="text-gray-300 text-sm">
                  <HelpCircle size={16} className="inline-block mr-1" /> Select the best answer
                </p>
              </div>
              
              {/* Options */}
              <div className="p-6">
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border-2 flex items-start transition-colors ${
                        selectedOption === index 
                          ? isAnswered 
                            ? index === currentQuestion.correctAnswer 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-red-500 bg-red-50'
                            : 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      whileHover={!isAnswered ? { scale: 1.01, backgroundColor: '#f9f7ff' } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <div className="flex-shrink-0 mr-3 mt-0.5">
                        <motion.div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                            selectedOption === index 
                              ? isAnswered 
                                ? index === currentQuestion.correctAnswer 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-red-500 text-white'
                                : `bg-purple-500 text-white`
                              : 'bg-gray-200 text-gray-700'
                          }`}
                          animate={
                            isAnswered && 
                            ((index === currentQuestion.correctAnswer) || 
                             (selectedOption === index && index !== currentQuestion.correctAnswer))
                              ? { scale: [1, 1.2, 1] }
                              : {}
                          }
                          transition={{ duration: 0.3 }}
                        >
                          {String.fromCharCode(65 + index)}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <span 
                          className={`text-base ${
                            selectedOption === index && isAnswered
                              ? index === currentQuestion.correctAnswer
                                ? 'text-green-800 font-medium'
                                : 'text-red-800 font-medium'
                              : 'text-gray-800'
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="text-green-500 ml-2 flex-shrink-0" size={20} />
                        </motion.div>
                      )}
                      {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          <AlertCircle className="text-red-500 ml-2 flex-shrink-0" size={20} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {/* Explanation (shows after answering) */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 p-4 rounded-lg text-sm"
                      style={{ 
                        backgroundColor: `${colors.primary}15`,
                        color: colors.text
                      }}
                    >
                      <h3 className="font-medium mb-1">Explanation:</h3>
                      <p>{currentQuestion.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Next button (shows after answering) */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="mt-6 flex justify-end"
                    >
                      <motion.button
                        className="flex items-center px-6 py-2 rounded-lg font-medium"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex < policyQuestions.length - 1 
                          ? 'Next Question' 
                          : 'See Results'}
                        <ArrowRight className="ml-2" size={20} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Game completion screen */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div 
                className="px-6 py-10 text-center"
                style={{ backgroundColor: colors.secondary, color: 'white' }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Award className="mx-auto mb-4" size={72} color={colors.accent} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-xl opacity-90">
                    You've completed the Policy Learning Challenge
                  </p>
                </motion.div>
              </div>
              
              <div className="p-8">
                <motion.div 
                  className="grid grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.accent}15` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold" 
                      style={{ color: colors.primary }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.6 }}
                    >
                      {score}
                    </motion.div>
                    <div className="text-sm" style={{ color: colors.text }}>
                      Final Score
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.success}15` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold" 
                      style={{ color: colors.success }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.7 }}
                    >
                      {gameStats.correctAnswers}
                    </motion.div>
                    <div className="text-sm" style={{ color: colors.text }}>
                      Correct Answers
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.error}15` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold" 
                      style={{ color: colors.error }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.8 }}
                    >
                      {gameStats.wrongAnswers}
                    </motion.div>
                    <div className="text-sm" style={{ color: colors.text }}>
                      Wrong Answers
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <motion.div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.warning}15` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold" 
                      style={{ color: colors.warning }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 1.0 }}
                    >
                      {gameStats.bestStreak}
                    </motion.div>
                    <div className="text-sm" style={{ color: colors.text }}>
                      Best Streak
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.secondary}15` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold" 
                      style={{ color: colors.secondary }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}transition={{ type: "spring", stiffness: 400, damping: 10, delay: 1.1 }}
                      >
                        {formatTime(timeSpent)}
                      </motion.div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        Time Spent
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: `${colors.primary}15` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div 
                        className="text-3xl font-bold" 
                        style={{ color: colors.primary }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, delay: 1.2 }}
                      >
                        {gameStats.avgResponseTime ? gameStats.avgResponseTime.toFixed(1) : "0.0"}s
                      </motion.div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        Avg. Response Time
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <p 
                      className="text-lg mb-6"
                      style={{ color: colors.text }}
                    >
                      {score >= 80 
                        ? "Excellent work! You have a good understanding of key policies."
                        : score >= 50
                          ? "Good job! You've learned some important policy concepts."
                          : "Keep learning! Understanding these policies will help you navigate government benefits better."
                      }
                    </p>
                  </motion.div>
                  
                  {/* Leaderboard */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: showLeaderboard ? 1 : 0, 
                      height: showLeaderboard ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 overflow-hidden"
                  >
                    <h3 
                      className="text-xl font-bold mb-4 text-center"
                      style={{ color: colors.secondary }}
                    >
                      Top Performers
                    </h3>
                    
                    <div className="bg-white rounded-lg overflow-hidden shadow">
                      <table className="w-full">
                        <thead>
                          <tr style={{ backgroundColor: `${colors.secondary}10` }}>
                            <th className="px-4 py-2 text-left" style={{ color: colors.text }}>Rank</th>
                            <th className="px-4 py-2 text-left" style={{ color: colors.text }}>Email</th>
                            <th className="px-4 py-2 text-right" style={{ color: colors.text }}>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.map((player, index) => (
                            <motion.tr 
                              key={player.user_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.3 }}
                              className={player.user_id === user?.id ? "font-medium" : ""}
                              style={player.user_id === user?.id ? { backgroundColor: `${colors.accent}10` } : {}}
                            >
                              <td className="px-4 py-2">
                                {index === 0 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white">1</span>
                                ) : index === 1 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-white">2</span>
                                ) : index === 2 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white">3</span>
                                ) : (
                                  index + 1
                                )}
                              </td>
                              <td className="px-4 py-2">
                                {player.email ? player.email.split('@')[0] + '...' : 'Anonymous'}
                              </td>
                              <td className="px-4 py-2 text-right">{player.score}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <motion.button
                      className="flex items-center px-6 py-3 rounded-lg font-medium"
                      style={{
                        backgroundColor: colors.primary,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRestartGame}
                    >
                      <Zap className="mr-2" size={20} />
                      Play Again
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center px-6 py-3 rounded-lg font-medium"
                      style={{
                        backgroundColor: showLeaderboard ? `${colors.secondary}20` : colors.secondary,
                        color: showLeaderboard ? colors.secondary : 'white'
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowLeaderboard(!showLeaderboard)}
                    >
                      <Trophy className="mr-2" size={20} />
                      {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Congratulation popup for correct answer */}
        <AnimatePresence>
          {showCongratulation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", damping: 15, stiffness: 400 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center z-50"
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 15, -15, 15, -15, 0],
                  scale: [1, 1.2, 1, 1.1, 1]
                }}
                transition={{ duration: 1 }}
              >
                <CheckCircle size={80} className="text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.secondary }}>
                Correct!
              </h3>
              <p className="text-center text-lg mb-1" style={{ color: colors.primary }}>
                You earned 10 points
              </p>
              
              {/* Show time bonus if applicable */}
              {showTimeBonus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-1 text-center"
                >
                  <p className="text-sm font-medium" style={{ color: colors.accent }}>
                    + {timeBonus} speed bonus!
                  </p>
                  <p className="text-xs text-gray-500">
                    {timeBonus === 5 ? "Lightning fast!" : 
                     timeBonus === 3 ? "Great timing!" : 
                     "Nice speed!"}
                  </p>
                </motion.div>
              )}
              
              {/* Show streak multiplier if applicable */}
              {showStreak && streakCount >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-2 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                >
                  <TrendingUp size={14} className="mr-1" />
                  <span>Streak x{Math.min(2, 1 + ((streakCount - 2) * 0.1)).toFixed(1)}</span>
                  <motion.span 
                    className="ml-1"
                    animate={{ opacity: [0, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    🔥
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Wrong answer feedback popup */}
        <AnimatePresence>
          {isAnswered && selectedOption !== null && selectedOption !== currentQuestion.correctAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl flex items-center z-40"
              style={{ borderLeft: `4px solid ${colors.error}` }}
            >
              <AlertCircle size={24} className="text-red-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium" style={{ color: colors.text }}>
                  Not quite right
                </p>
                <p className="text-sm text-gray-600">
                  Take a look at the explanation to learn more.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Level up notification when streak reaches certain milestones */}
        <AnimatePresence>
          {showStreak && streakCount >= 5 && streakCount % 5 === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="fixed top-24 right-4 bg-white p-4 rounded-lg shadow-xl flex items-center z-40 overflow-hidden"
              style={{ borderLeft: `4px solid ${colors.warning}` }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: colors.warning }}
                  animate={{ 
                    scale: [1, 1.5],
                    opacity: [0.1, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.5
                  }}
                />
              </div>
              
              <Star size={24} className="text-yellow-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium" style={{ color: colors.text }}>
                  {streakCount} Answer Streak!
                </p>
                <p className="text-sm text-gray-600">
                  Keep going for even bigger bonuses!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default Learn;