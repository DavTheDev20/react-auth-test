import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Data from './pages/Data';
import { AuthenticatedRoute } from './auth';
import { getCookie } from './utils/cookieUtils';

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
  {
    path: '/data',
    element: (
      <AuthenticatedRoute>
        <App component={<Data />} />
      </AuthenticatedRoute>
    ),
  },
]);

const root: any = document.getElementById('root');

createRoot(root).render(<RouterProvider router={router} />);
