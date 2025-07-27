import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, Award } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const AdminTrainers = () => {
  const [trainers] = useState([
    {
      id: 1,
      name: 'Alex Smith',
      email: 'alex@gym.com',
      specialization: 'Strength Training',
      experience: 5,
      rating: 4.9,
      hourlyRate: 75,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      certifications: ['NASM-CPT', 'CSCS']
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@gym.com',
      specialization: 'Yoga & Pilates',
      experience: 7,
      rating: 4.8,
      hourlyRate: 65,
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      certifications: ['RYT-500', 'PMA-CPT']
    },
    {
      id: 3,
      name: 'David Johnson',
      email: 'david@gym.com',
      specialization: 'Cardio & HIIT',
      experience: 3,
      rating: 4.7,
      hourlyRate: 60,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      certifications: ['ACSM-CPT', 'HIIT Specialist']
    }
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAddTrainer = () => {
    setShowModal(true);
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
              <h1 className="text-4xl font-bold text-white mb-2">Trainers</h1>
              <p className="text-gray-300">Manage your gym's personal trainers and instructors</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTrainer}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Add Trainer</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{trainer.name}</h3>
                  <p className="text-purple-400 font-medium">{trainer.specialization}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{trainer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-white">{trainer.experience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rate:</span>
                  <span className="text-white">${trainer.hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white text-sm">{trainer.email}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-400 text-sm">Certifications:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trainer.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs flex items-center space-x-1"
                    >
                      <Award className="h-3 w-3" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-1 bg-green-500/20 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500/20 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Trainer Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Add New Trainer</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Specialization"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Years of Experience"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Hourly Rate ($)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Certifications (one per line)"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold"
                  >
                    Add Trainer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-500/20 text-gray-300 py-3 rounded-lg font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminTrainers;