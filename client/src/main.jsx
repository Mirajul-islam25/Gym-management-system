// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import {
//   RouterProvider,
// } from "react-router-dom";
// import Router from './Router/Router.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={Router} />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);