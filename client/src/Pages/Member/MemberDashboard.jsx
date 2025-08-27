import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Activity, Clock } from 'lucide-react';
import StatsCard from '../../Component/StatsCard/StatsCard';
import AnimatedBackground from '../../Component/AnimatedBackground';

const MemberDashboard = () => {
  const [memberStats, setMemberStats] = useState([
    { title: 'Days This Month', value: '0', icon: Calendar, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { title: 'Workouts Completed', value: '0', icon: Activity, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { title: 'Hours Trained', value: '0h', icon: Clock, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { title: 'Current Streak', value: '0 days', icon: Target, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ]);

  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      fetchMemberData(userData.id);
    }
  }, []);

  const fetchMemberData = async (userId) => {
    try {
      setLoading(true);
      
      // Fetch member profile
      const profileResponse = await fetch(`http://localhost:5000/api/profile/${userId}`);
      const profileData = await profileResponse.json();
      
      if (profileData.member) {
        setCurrentPlan({
          name: profileData.member.plan_name || 'No Plan',
          price: profileData.member.plan_price || 0,
          startDate: profileData.member.join_date,
          nextPayment: calculateNextPayment(profileData.member.join_date)
        });

        // Fetch upcoming classes
        const scheduleResponse = await fetch('http://localhost:5000/api/schedule');
        const scheduleData = await response.json();
        
        // Get next 3 classes
        const today = new Date();
        const upcoming = scheduleData
          .filter(item => new Date(getNextDateForDay(item.day)) > today)
          .slice(0, 3)
          .map(item => ({
            id: item.id,
            name: item.class_type,
            time: formatTime(item.time),
            trainer: item.trainer_name,
            date: formatDate(getNextDateForDay(item.day))
          }));
        
        setUpcomingClasses(upcoming);
      }

      // Fetch workout stats
      const statsResponse = await fetch(`http://localhost:5000/api/member/stats/${userId}`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setMemberStats([
          { title: 'Days This Month', value: statsData.daysThisMonth.toString(), icon: Calendar, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
          { title: 'Workouts Completed', value: statsData.workoutsCompleted.toString(), icon: Activity, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
          { title: 'Hours Trained', value: `${statsData.hoursTrained}h`, icon: Clock, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
          { title: 'Current Streak', value: `${statsData.currentStreak} days`, icon: Target, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
        ]);

        setRecentWorkouts(statsData.recentWorkouts || []);
      }

    } catch (error) {
      console.error('Error fetching member data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the next date for a given day of the week
  const getNextDateForDay = (dayName) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = days.indexOf(dayName);
    if (dayIndex === -1) return new Date().toISOString().split('T')[0];
    
    const today = new Date();
    const todayIndex = today.getDay();
    let daysToAdd = dayIndex - todayIndex;
    
    if (daysToAdd <= 0) {
      daysToAdd += 7;
    }
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);
    return nextDate.toISOString().split('T')[0];
  };

  const calculateNextPayment = (joinDate) => {
    const join = new Date(joinDate);
    const nextPayment = new Date(join);
    nextPayment.setMonth(nextPayment.getMonth() + 1);
    return nextPayment.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-300">Ready to crush your fitness goals today?</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {memberStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Classes</h2>
            <div className="space-y-4">
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((classItem) => (
                  <motion.div
                    key={classItem.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">{classItem.name}</h3>
                      <span className="text-purple-400 font-medium">{classItem.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{classItem.trainer}</span>
                      <span className="text-white font-medium">{classItem.time}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No upcoming classes scheduled
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Workouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Recent Workouts</h2>
            <div className="space-y-4">
              {recentWorkouts.length > 0 ? (
                recentWorkouts.map((workout) => (
                  <motion.div
                    key={workout.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">{workout.type}</h3>
                      <span className="text-green-400 font-medium">{workout.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{workout.duration}</span>
                      <span className="text-white font-medium">{workout.calories} cal</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No recent workouts recorded
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Current Plan */}
        {currentPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Current Plan</h2>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentPlan.name}</h3>
                  <p className="text-gray-300 mb-4">Access to all facilities and group classes</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Started: {new Date(currentPlan.startDate).toLocaleDateString()}</span>
                    <span>Next Payment: {currentPlan.nextPayment}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">${currentPlan.price}</div>
                  <div className="text-gray-400">per month</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;