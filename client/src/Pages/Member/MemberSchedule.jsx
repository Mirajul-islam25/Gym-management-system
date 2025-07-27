import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Filter, Plus } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const MemberSchedule = () => {
  const [scheduleItems] = useState([
    {
      id: 1,
      title: 'Morning Yoga',
      trainer: 'Maria Garcia',
      date: '2024-01-16',
      time: '07:00',
      duration: 60,
      location: 'Studio A',
      capacity: 20,
      enrolled: 15,
      type: 'class',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'HIIT Training',
      trainer: 'David Johnson',
      date: '2024-01-16',
      time: '18:00',
      duration: 45,
      location: 'Main Gym',
      capacity: 15,
      enrolled: 12,
      type: 'class',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: 'Personal Training',
      trainer: 'Alex Smith',
      date: '2024-01-17',
      time: '08:00',
      duration: 60,
      location: 'PT Room 1',
      capacity: 1,
      enrolled: 1,
      type: 'personal',
      difficulty: 'advanced'
    },
    {
      id: 4,
      title: 'Strength Training',
      trainer: 'Alex Smith',
      date: '2024-01-17',
      time: '19:00',
      duration: 75,
      location: 'Weight Room',
      capacity: 12,
      enrolled: 8,
      type: 'class',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Pilates',
      trainer: 'Maria Garcia',
      date: '2024-01-18',
      time: '10:00',
      duration: 50,
      location: 'Studio B',
      capacity: 16,
      enrolled: 11,
      type: 'class',
      difficulty: 'beginner'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredSchedule = filter === 'all' 
    ? scheduleItems 
    : scheduleItems.filter(item => item.type === filter);

  const getTypeColor = (type) => {
    switch (type) {
      case 'class':
        return 'bg-blue-500/20 text-blue-400';
      case 'personal':
        return 'bg-purple-500/20 text-purple-400';
      case 'group':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Schedule</h1>
              <p className="text-gray-300">Book classes and manage your workout schedule</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Book Session</span>
            </motion.button>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filter === 'all' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>All Sessions</span>
            </button>
            <button
              onClick={() => setFilter('class')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === 'class' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Group Classes
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === 'personal' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Personal Training
            </button>
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-300">with {item.trainer}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{item.time} ({item.duration} min)</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Users className="h-4 w-4" />
                  <span>{item.enrolled}/{item.capacity} enrolled</span>
                </div>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  item.enrolled < item.capacity
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                }`}
                disabled={item.enrolled >= item.capacity}
              >
                {item.enrolled >= item.capacity ? 'Full' : 'Book Now'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {filteredSchedule.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">No sessions found for the selected filter.</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberSchedule;