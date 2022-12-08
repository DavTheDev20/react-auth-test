import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
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
  {
    path: '/login',
    element: <App component={<Login />} />,
  },
]);

const root: any = document.getElementById('root');

createRoot(root).render(<RouterProvider router={router} />);
