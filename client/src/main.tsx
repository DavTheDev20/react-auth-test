import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App component={<Home />} />,
  },
  {
    path: '/register',
    element: <App component={<Register />} />,
  },
]);

const root: any = document.getElementById('root');

createRoot(root).render(<RouterProvider router={router} />);
