import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, CreditCard, Award, Target, TrendingUp } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Member Management',
      description: 'Efficiently manage member profiles, subscriptions, and attendance tracking.',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Schedule Management',
      description: 'Organize classes, trainer sessions, and gym equipment bookings seamlessly.',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Handle membership fees, plan upgrades, and payment history with ease.',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Performance Tracking',
      description: 'Monitor member progress, set goals, and celebrate achievements.',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Help members set and achieve their fitness goals with personalized plans.',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reports',
      description: 'Get insights into gym performance, member retention, and revenue trends.',
      color: 'bg-gradient-to-r from-teal-500 to-blue-500'
    }
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              GymPro
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              The ultimate gym management system designed for modern fitness centers. 
              Streamline operations, enhance member experience, and grow your business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Run Your Gym
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools designed to simplify gym management and enhance member satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Active Gyms</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-300">Members Managed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Gym?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Join thousands of gym owners who have revolutionized their business with GymPro.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;