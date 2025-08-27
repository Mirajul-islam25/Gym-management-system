import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Filter, Plus } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const MemberSchedule = () => {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      fetchMemberProfile(userData.id);
    }
  }, []);

  const fetchMemberProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      const data = await response.json();
      if (data.member) {
        setMemberId(data.member.id);
        fetchSchedule(data.member.id);
      }
    } catch (error) {
      console.error('Error fetching member profile:', error);
      setLoading(false);
    }
  };

  const fetchSchedule = async (memberId) => {
    try {
      setLoading(true);
      
      // Fetch schedule from API
      const response = await fetch('http://localhost:5000/api/schedule');
      const scheduleData = await response.json();
      
      // Fetch all bookings to calculate enrolled count
      const bookingsResponse = await fetch('http://localhost:5000/api/bookings');
      const bookingsData = await bookingsResponse.json();

      // Fetch user's bookings to check which sessions are booked
      const userBookingsResponse = await fetch('http://localhost:5000/api/bookings');
      const userBookingsData = await userBookingsResponse.json();
      const userBookedSessions = userBookingsData
        .filter(booking => booking.member_id === memberId)
        .map(booking => booking.schedule_id);

      // Format schedule items
      const formattedSchedule = scheduleData.map(item => {
        const enrolled = bookingsData.filter(b => b.schedule_id === item.id).length;
        return {
          id: item.id,
          title: item.class_type,
          trainer: item.trainer_name || 'Unknown Trainer',
          day: item.day, // Store the day for date calculation
          time: item.time || '07:00',
          duration: item.duration_minutes,
          location: item.location,
          capacity: item.capacity,
          enrolled: enrolled,
          type: item.type,
          difficulty: item.difficulty,
          isBooked: userBookedSessions.includes(item.id)
        };
      });
      
      setScheduleItems(formattedSchedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
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

  const formatTime = (timeString) => {
    if (!timeString) return '07:00 AM';
    
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

  const handleBookSession = async (item) => {
    if (item.isBooked) {
      alert('You have already booked this class.');
      return;
    }

    if (!memberId) {
      alert('Member information not found. Please try again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/schedule/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schedule_id: item.id,
          member_id: memberId
        })
      });
      
      if (response.ok) {
        alert(`Successfully booked ${item.title}!`);
        fetchSchedule(memberId); // Refresh schedule
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to book class');
      }
    } catch (error) {
      console.error('Error booking class:', error);
      alert('Error booking class');
    }
  };

  // Filter schedule based on selected filter
  const filteredSchedule = scheduleItems.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading schedule...</div>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Schedule</h1>
              <p className="text-gray-300">Book classes and manage your workout schedule</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              onClick={() => alert('Session booking modal would open here')}
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
                  <span>{formatDate(getNextDateForDay(item.day))}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(item.time)} ({item.duration} min)</span>
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
                  item.enrolled < item.capacity && !item.isBooked
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                }`}
                disabled={item.enrolled >= item.capacity || item.isBooked}
                onClick={() => handleBookSession(item)}
              >
                {item.isBooked ? 'Booked' : item.enrolled >= item.capacity ? 'Full' : 'Book Now'}
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