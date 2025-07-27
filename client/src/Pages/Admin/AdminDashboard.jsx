import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Users, CreditCard, Calendar, TrendingUp, Plus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '../../Component/StatsCard/StatsCard';
import AnimatedBackground from '../../Component/AnimatedBackground';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Members', value: '1,234', icon: Users, color: 'bg-gradient-to-r from-purple-500 to-pink-500', change: '+12%' },
    { title: 'Monthly Revenue', value: '$45,320', icon: CreditCard, color: 'bg-gradient-to-r from-green-500 to-emerald-500', change: '+8%' },
    { title: 'Active Sessions', value: '87', icon: Activity, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', change: '+5%' },
    { title: 'Growth Rate', value: '23%', icon: TrendingUp, color: 'bg-gradient-to-r from-orange-500 to-red-500', change: '+3%' }
  ];

  const recentActivities = [
    { id: 1, type: 'member', message: 'New member John Doe joined', time: '2 hours ago' },
    { id: 2, type: 'payment', message: 'Payment received from Sarah Wilson', time: '4 hours ago' },
    { id: 3, type: 'plan', message: 'Gold plan purchased by Mike Johnson', time: '6 hours ago' },
    { id: 4, type: 'trainer', message: 'New trainer Alex Smith added', time: '1 day ago' }
  ];

  const quickActions = [
    { title: 'Add New Member', icon: Users, link: '/admin/members', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { title: 'Create Plan', icon: CreditCard, link: '/admin/plans', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { title: 'Schedule Session', icon: Calendar, link: '/admin/schedule', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' }
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
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's what's happening at your gym.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="block"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${action.color} p-6 rounded-xl text-white cursor-pointer transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-6 w-6" />
                    <span className="font-semibold">{action.title}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-white">{activity.message}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;