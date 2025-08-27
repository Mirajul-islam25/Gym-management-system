import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Calendar, TrendingUp, Plus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '../../Component/StatsCard/StatsCard';
import AnimatedBackground from '../../Component/AnimatedBackground';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Members', value: '0', icon: Users, color: 'bg-gradient-to-r from-purple-500 to-pink-500', change: '+0%' },
    { title: 'Monthly Revenue', value: '$0', icon: CreditCard, color: 'bg-gradient-to-r from-green-500 to-emerald-500', change: '+0%' },
    { title: 'Active Sessions', value: '0', icon: Activity, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', change: '+0%' },
    { title: 'Growth Rate', value: '0%', icon: TrendingUp, color: 'bg-gradient-to-r from-orange-500 to-red-500', change: '+0%' }
  ]);

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5000/api/dashboard/stats');
      const statsData = await statsResponse.json();
      
      // Fetch recent activities
      const activitiesResponse = await fetch('http://localhost:5000/api/dashboard/activities');
      const activitiesData = await activitiesResponse.json();
      
      // Update stats
      setStats([
        { 
          title: 'Total Members', 
          value: statsData.totalMembers.toLocaleString(), 
          icon: Users, 
          color: 'bg-gradient-to-r from-purple-500 to-pink-500', 
          change: '+12%' 
        },
        { 
          title: 'Monthly Revenue', 
          value: `$${statsData.monthlyRevenue.toLocaleString()}`, 
          icon: CreditCard, 
          color: 'bg-gradient-to-r from-green-500 to-emerald-500', 
          change: '+8%' 
        },
        { 
          title: 'Active Sessions', 
          value: statsData.activeSessions.toString(), 
          icon: Activity, 
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500', 
          change: '+5%' 
        },
        { 
          title: 'Growth Rate', 
          value: `${statsData.growthRate}%`, 
          icon: TrendingUp, 
          color: 'bg-gradient-to-r from-orange-500 to-red-500', 
          change: '+3%' 
        }
      ]);
      
      // Update activities
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: 'Add New Member', icon: Users, link: '/admin/members', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { title: 'Create Plan', icon: CreditCard, link: '/admin/plans', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { title: 'Schedule Session', icon: Calendar, link: '/admin/schedule', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading dashboard...</div>
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
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'member' ? 'bg-purple-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-white">{activity.message}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                No recent activities
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;