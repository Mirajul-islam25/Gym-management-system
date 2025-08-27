import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, Clock, Users, MapPin, Search, Filter } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    trainer_id: '',
    class_type: '',
    day: 'Monday',
    time: '09:00',
    duration_minutes: 60,
    location: 'Main Gym',
    capacity: 15,
    type: 'class',
    difficulty: 'beginner'
  });

  // Days of the week for filtering
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchSchedules();
    fetchTrainers();
  }, []);

  useEffect(() => {
    filterSchedules();
  }, [schedules, searchTerm, filterDay]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schedule');
      const data = await response.json();
      setSchedules(data);
      setFilteredSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/trainers');
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const filterSchedules = () => {
    let filtered = schedules;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(schedule => 
        schedule.class_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (schedule.trainer_name && schedule.trainer_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by day
    if (filterDay !== 'all') {
      filtered = filtered.filter(schedule => schedule.day === filterDay);
    }

    setFilteredSchedules(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingSchedule 
        ? `http://localhost:5000/api/schedule/${editingSchedule.id}` 
        : 'http://localhost:5000/api/schedule';
      
      const method = editingSchedule ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowModal(false);
        setEditingSchedule(null);
        setFormData({
          trainer_id: '',
          class_type: '',
          day: 'Monday',
          time: '09:00',
          duration_minutes: 60,
          location: 'Main Gym',
          capacity: 15,
          type: 'class',
          difficulty: 'beginner'
        });
        fetchSchedules(); // Refresh the list
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      trainer_id: schedule.trainer_id || '',
      class_type: schedule.class_type || '',
      day: schedule.day || 'Monday',
      time: schedule.time || '09:00',
      duration_minutes: schedule.duration_minutes || 60,
      location: schedule.location || 'Main Gym',
      capacity: schedule.capacity || 15,
      type: schedule.type || 'class',
      difficulty: schedule.difficulty || 'beginner'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/schedule/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchSchedules(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterDay('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading schedules...</div>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Class Schedule</h1>
              <p className="text-gray-300">Manage and organize your gym's class schedule</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add New Class</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search classes or trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Days</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              {(searchTerm || filterDay !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{schedule.class_type}</h3>
                    <p className="text-gray-400 capitalize">{schedule.type} • {schedule.difficulty}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-purple-400" />
                    <span className="text-white">{schedule.day}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-blue-400" />
                    <span className="text-white">{schedule.time} ({schedule.duration_minutes} mins)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-green-400" />
                    <span className="text-white">
                      {schedule.trainer_name || 'No trainer assigned'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} className="text-orange-400" />
                    <span className="text-white">{schedule.location}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="text-white">{schedule.capacity} people</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No classes found</h3>
              <p className="text-gray-400">
                {searchTerm || filterDay !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by adding your first class'
                }
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 w-full max-w-md border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingSchedule ? 'Edit Class' : 'Add New Class'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Class Type</label>
                <input
                  type="text"
                  name="class_type"
                  value={formData.class_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Yoga, CrossFit, Zumba"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Day</label>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Duration (mins)</label>
                  <input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleInputChange}
                    required
                    min="15"
                    max="180"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="50"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Trainer</label>
                <select
                  name="trainer_id"
                  value={formData.trainer_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a trainer</option>
                  {trainers.map(trainer => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="class">Class</option>
                    <option value="personal">Personal</option>
                    <option value="group">Group</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Main Gym, Studio A"
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingSchedule(null);
                    setFormData({
                      trainer_id: '',
                      class_type: '',
                      day: 'Monday',
                      time: '09:00',
                      duration_minutes: 60,
                      location: 'Main Gym',
                      capacity: 15,
                      type: 'class',
                      difficulty: 'beginner'
                    });
                  }}
                  className="px-6 py-3 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  {editingSchedule ? 'Update Class' : 'Add Class'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;