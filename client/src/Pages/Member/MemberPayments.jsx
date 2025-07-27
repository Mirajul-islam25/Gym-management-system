import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CreditCard, Download, Filter, Calendar } from 'lucide-react';
import AnimatedBackground from '../../Component/AnimatedBackground';

const MemberPayments = () => {
  const [payments] = useState([
    {
      id: 1,
      date: '2024-01-15',
      amount: 49,
      plan: 'Gold Membership',
      status: 'completed',
      paymentMethod: 'Credit Card (**** 1234)',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 49,
      plan: 'Gold Membership',
      status: 'completed',
      paymentMethod: 'Credit Card (**** 1234)',
      invoiceNumber: 'INV-2023-012'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 49,
      plan: 'Gold Membership',
      status: 'completed',
      paymentMethod: 'Credit Card (**** 1234)',
      invoiceNumber: 'INV-2023-011'
    },
    {
      id: 4,
      date: '2023-10-15',
      amount: 29,
      plan: 'Silver Membership',
      status: 'completed',
      paymentMethod: 'PayPal',
      invoiceNumber: 'INV-2023-010'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Payment History</h1>
          <p className="text-gray-300">Track your membership payments and download invoices</p>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="h-8 w-8 text-green-400" />
              <span className="text-gray-300">Total Paid</span>
            </div>
            <div className="text-3xl font-bold text-white">${totalPaid}</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-8 w-8 text-blue-400" />
              <span className="text-gray-300">Next Payment</span>
            </div>
            <div className="text-xl font-bold text-white">Feb 15, 2024</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="h-8 w-8 text-purple-400" />
              <span className="text-gray-300">Current Plan</span>
            </div>
            <div className="text-xl font-bold text-white">Gold - $49/mo</div>
          </div>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              filter === 'all' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>All Payments</span>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('failed')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === 'failed' 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Failed
          </button>
        </motion.div>

        {/* Payments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Payment Method</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Invoice</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-white">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{payment.plan}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">${payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{payment.paymentMethod}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{payment.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">No payments found for the selected filter.</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberPayments;