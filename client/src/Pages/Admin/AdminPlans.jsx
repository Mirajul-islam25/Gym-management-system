import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const AdminPlans = () => {
  const [plans] = useState([
    {
      id: 1,
      name: 'Silver',
      price: 29,
      duration: 1,
      features: ['Gym Access', 'Locker Room', 'Basic Equipment'],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 2,
      name: 'Gold',
      price: 49,
      duration: 1,
      features: ['Everything in Silver', 'Group Classes', 'Personal Training (2 sessions)', 'Nutrition Consultation'],
      popular: true,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 3,
      name: 'Platinum',
      price: 79,
      duration: 1,
      features: ['Everything in Gold', 'Unlimited Personal Training', 'Meal Plans', 'Priority Booking', '24/7 Access'],
      popular: false,
      color: 'from-purple-500 to-purple-600'
    }
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAddPlan = () => {
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
              <h1 className="text-4xl font-bold text-white mb-2">Membership Plans</h1>
              <p className="text-gray-300">Create and manage your gym membership plans</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddPlan}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Add Plan</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-xl">{plan.name[0]}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-1">
                  ${plan.price}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <p className="text-gray-400">{plan.duration} month commitment</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
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

        {/* Add Plan Modal */}
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
              <h3 className="text-2xl font-bold text-white mb-4">Add New Plan</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Plan Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Price per month"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Duration (months)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Features (one per line)"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="popular"
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="popular" className="text-white">Mark as popular</label>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold"
                  >
                    Add Plan
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

export default AdminPlans;