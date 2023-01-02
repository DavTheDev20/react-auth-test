import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './error-page';
import Home from './routes/Home';
import Register from './routes/Register';
import { AuthContextType, authProvider } from './auth';
import './index.css';

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
    ],
  },
]);

// let AuthContext = React.createContext<AuthContextType>(null!);

// function AuthProvider({ children }: { children: React.ReactNode }) {
//   let [userInfo, setUserInfo] = useState({
//     email: "",
//     password: ""
//   });

//   let [user, setUser] = useState<any>(null);

//   let signIn = () => {
//     return authProvider.signIn()
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
