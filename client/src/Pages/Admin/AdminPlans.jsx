import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration_months: '',
    features: '',
    popular: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch plans from backend
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/plans');
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const planData = {
        ...formData,
        price: parseFloat(formData.price),
        duration_months: parseInt(formData.duration_months),
        features: formData.features.split('\n').filter(f => f.trim() !== '')
      };

      let response;
      if (editingPlan) {
        // Update existing plan
        response = await fetch(`http://localhost:5000/api/plans/${editingPlan.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(planData)
        });
      } else {
        // Create new plan
        response = await fetch('http://localhost:5000/api/plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(planData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save plan');
      }

      // Refresh plans list
      await fetchPlans();
      
      // Show success message
      setSuccessMessage(`Plan ${editingPlan ? 'updated' : 'created'} successfully!`);
      
      // Reset form and close modal
      setFormData({
        name: '',
        price: '',
        duration_months: '',
        features: '',
        popular: false
      });
      setEditingPlan(null);
      setShowModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Error saving plan:', err);
    }
  };

  // Handle edit plan
  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      duration_months: plan.duration_months,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : (plan.features || ''),
      popular: plan.popular || false
    });
    setShowModal(true);
  };

  // Handle delete plan
  const handleDeletePlan = async (planId) => {
    if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/plans/${planId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete plan');
      }

      // Refresh plans list
      await fetchPlans();
      setSuccessMessage('Plan deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting plan:', err);
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      duration_months: '',
      features: '',
      popular: false
    });
  };

  // Get gradient color based on plan name
  const getPlanColor = (planName) => {
    switch (planName.toLowerCase()) {
      case 'silver':
        return 'from-gray-500 to-gray-600';
      case 'gold':
        return 'from-yellow-500 to-yellow-600';
      case 'platinum':
        return 'from-purple-500 to-purple-600';
      case 'basic':
        return 'from-blue-500 to-blue-600';
      case 'premium':
        return 'from-indigo-500 to-indigo-600';
      default:
        return 'from-green-500 to-green-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white text-xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
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
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mt-4 sm:mt-0"
            >
              <Plus className="h-5 w-5" />
              <span>Add Plan</span>
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length > 0 ? (
            plans.map((plan, index) => (
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
                  <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-r ${getPlanColor(plan.name)} flex items-center justify-center mb-4`}>
                    <span className="text-white font-bold text-xl">{plan.name[0]}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-1">
                    ${plan.price}
                    <span className="text-lg text-gray-400 font-normal">/month</span>
                  </div>
                  <p className="text-gray-400">{plan.duration_months} month commitment</p>
                </div>

                <div className="space-y-3 mb-6">
                  {Array.isArray(plan.features) && plan.features.length > 0 ? (
                    plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No features listed</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditPlan(plan)}
                    className="flex-1 bg-green-500/20 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeletePlan(plan.id)}
                    className="bg-red-500/20 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No plans found</div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                <span>Create Your First Plan</span>
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Plan Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Basic, Premium, Gold"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Monthly Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Duration (months)</label>
                  <input
                    type="number"
                    name="duration_months"
                    placeholder="e.g., 1, 3, 6, 12"
                    value={formData.duration_months}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Features (one per line)</label>
                  <textarea
                    name="features"
                    placeholder="Access to all equipment\nFree fitness assessment\n24/7 gym access"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="popular"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="popular" className="text-gray-300">Mark as popular plan</label>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
                  >
                    {editingPlan ? 'Update Plan' : 'Add Plan'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-lg font-semibold border border-gray-600"
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