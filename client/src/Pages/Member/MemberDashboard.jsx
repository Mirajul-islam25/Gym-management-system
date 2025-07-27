import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, Target, Activity, Clock } from 'lucide-react';
import StatsCard from '../../Component/StatsCard/StatsCard';
import AnimatedBackground from '../../Component/AnimatedBackground';

const MemberDashboard = () => {
  const memberStats = [
    { title: 'Days This Month', value: '12', icon: Calendar, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { title: 'Calories Burned', value: '2,840', icon: Activity, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { title: 'Workout Time', value: '18.5h', icon: Clock, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { title: 'Goals Achieved', value: '8/10', icon: Target, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ];

  const upcomingClasses = [
    { id: 1, name: 'Morning Yoga', time: '07:00 AM', trainer: 'Maria Garcia', date: 'Today' },
    { id: 2, name: 'HIIT Training', time: '06:00 PM', trainer: 'David Johnson', date: 'Tomorrow' },
    { id: 3, name: 'Strength Training', time: '08:00 AM', trainer: 'Alex Smith', date: 'Wednesday' },
  ];

  const recentWorkouts = [
    { id: 1, type: 'Cardio', duration: '45 min', calories: 320, date: 'Yesterday' },
    { id: 2, type: 'Strength', duration: '60 min', calories: 280, date: '2 days ago' },
    { id: 3, type: 'Yoga', duration: '30 min', calories: 150, date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, John!</h1>
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
              {upcomingClasses.map((classItem) => (
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
              ))}
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
              {recentWorkouts.map((workout) => (
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
              ))}
            </div>
          </motion.div>
        </div>

        {/* Current Plan */}
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
                <h3 className="text-2xl font-bold text-white mb-2">Gold Membership</h3>
                <p className="text-gray-300 mb-4">Access to all facilities and group classes</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Started: Jan 15, 2024</span>
                  <span>Next Payment: Feb 15, 2024</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">$49</div>
                <div className="text-gray-400">per month</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDashboard;