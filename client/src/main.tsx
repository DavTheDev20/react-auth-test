import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { authProvder, useAuth } from './auth';
import Root from './routes/Root';
import ErrorPage from './error-page';
import Home from './routes/Home';
import Register from './routes/Register';
import './index.css';

const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const auth = useAuth();

  if (auth) return children;

  return <h1>Must Sign In to View Content</h1>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/secret',
        element: (
          <RequireAuth>
            <h1>Secret</h1>
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
