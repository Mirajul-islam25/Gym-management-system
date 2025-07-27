// import { createBrowserRouter } from 'react-router-dom';
// import Root from '../Component/Root/Root';
// import ErrorPage from '../Component/ErrorPage/ErrorPage';
// // import { BrowserRouter as Router } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// import Home from '../Pages/Home/Home';
// import Login from '../Pages/Login/Login';
// import Register from '../Pages/Register/Register';
// import AdminDashboard from '../Pages/Admin/AdminDashboard';
// import AdminMembers from '../Pages/Admin/AdminMembers';
// import AdminPlans from '../Pages/Admin/AdminPlans';
// import AdminTrainers from '../Pages/Admin/AdminTrainers';
// import MemberDashboard from '../Pages/Member/MemberDashboard';
// import MemberPayments from '../Pages/Member/MemberPayments';
// import MemberSchedule from '../Pages/Member/MemberSchedule';
// import ProtectedRoute from '../Component/ProtectedRoute ';


// const MyRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root></Root>,
//     errorElement: <ErrorPage></ErrorPage>,
//       children: [
//       {
//         path: "/",
//         element: <Home></Home>
//       },
//       {
//         path: "login",
//         element: <Login></Login>
//       },
//       {
//         path: "register",
//         element: <Register></Register>
//       },
//         // Admin Routes
//       {
//         path: "/admin/dashboard",
//         element : (
//                 <ProtectedRoute role="admin">
//                 <AdminDashboard></AdminDashboard>
//                 </ProtectedRoute>
//               )
//       },
//       {
//         path: "/admin/members",
//         element : (
//                 <ProtectedRoute role="admin">
//                 <AdminMembers></AdminMembers>
//                 </ProtectedRoute>
//               )
//       },
//       {
//         path: "/admin/plans",
//         element : (
//                 <ProtectedRoute role="admin">
//                 <AdminPlans></AdminPlans>
//                 </ProtectedRoute>
//               )
//       },
//       {
//         path: "/admin/trainers",
//         element : (
//                 <ProtectedRoute role="admin">
//                 <AdminTrainers></AdminTrainers>
//                 </ProtectedRoute>
//               )
//       },
//       // Member Routes
//       {
//         path: "/member/dashboard",
//         element : (
//                 <ProtectedRoute role="member">
//                 <MemberDashboard></MemberDashboard>
//                 </ProtectedRoute>
//               )
//       },
//       {
//         path: "/member/payments",
//         element : (
//                 <ProtectedRoute role="member">
//                 <MemberPayments></MemberPayments>
//                 </ProtectedRoute>
//               )
//       },
//       {
//         path: "/member/schedule",
//         element : (
//                 <ProtectedRoute role="member">
//                 <MemberSchedule></MemberSchedule>
//                 </ProtectedRoute>
//               )
//       },
//     ]
//   },
// ]);

// export default MyRouter;