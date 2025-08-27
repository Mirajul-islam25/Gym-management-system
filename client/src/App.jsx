import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import ProtectedRoute from './Component/ProtectedRoute ';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminMembers from './Pages/Admin/AdminMembers';
import AdminPlans from './Pages/Admin/AdminPlans';
import AdminTrainers from './Pages/Admin/AdminTrainers';
import MemberDashboard from './Pages/Member/MemberDashboard';
import MemberPayments from './Pages/Member/MemberPayments';
import MemberSchedule from './Pages/Member/MemberSchedule';
import AdminSchedule from './Pages/Admin/AdminSchedule';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/members" element={
                <ProtectedRoute role="admin">
                  <AdminMembers />
                </ProtectedRoute>
              } />
              <Route path="/admin/plans" element={
                <ProtectedRoute role="admin">
                  <AdminPlans />
                </ProtectedRoute>
              } />
              <Route path="/admin/schedule" element={
                <ProtectedRoute role="admin">
                  <AdminSchedule></AdminSchedule>
                </ProtectedRoute>
              } />
              <Route path="/admin/trainers" element={
                <ProtectedRoute role="admin">
                  <AdminTrainers />
                </ProtectedRoute>
              } />
              
              {/* Member Routes */}
              <Route path="/member/dashboard" element={
                <ProtectedRoute role="member">
                  <MemberDashboard />
                </ProtectedRoute>
              } />
              <Route path="/member/payments" element={
                <ProtectedRoute role="member">
                  <MemberPayments />
                </ProtectedRoute>
              } />
              <Route path="/member/schedule" element={
                <ProtectedRoute role="member">
                  <MemberSchedule />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


