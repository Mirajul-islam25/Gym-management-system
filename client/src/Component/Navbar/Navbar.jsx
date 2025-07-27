import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Dumbbell, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = user ? (
    user.role === 'admin' ? [
      { path: '/admin/dashboard', label: 'Dashboard' },
      { path: '/admin/members', label: 'Members' },
      { path: '/admin/plans', label: 'Plans' },
      { path: '/admin/trainers', label: 'Trainers' },
    ] : [
      { path: '/member/dashboard', label: 'Dashboard' },
      { path: '/member/schedule', label: 'Schedule' },
      { path: '/member/payments', label: 'Payments' },
    ]
  ) : [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            >
              <Dumbbell className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GymPro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-500/20"
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white p-2 rounded-md transition-colors hover:bg-red-500/20"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black/40 backdrop-blur-md border-t border-purple-500/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <div className="border-t border-purple-500/20 pt-2">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;