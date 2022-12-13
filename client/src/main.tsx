import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
    path: '/test',
    element: (
      <AuthenticatedRoute>
        <div>
          <h1>You're authenticated.</h1>
          <button
            onClick={() => {
              const cookie = getCookie('token');
              alert('Cookie: ' + cookie);
            }}
          >
            Check Status
          </button>
        </div>
      </AuthenticatedRoute>
    ),
  },
]);

const root: any = document.getElementById('root');

createRoot(root).render(<RouterProvider router={router} />);
