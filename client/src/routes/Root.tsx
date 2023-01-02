import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { authProvder, useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

import '../Root.css';

export default function Root() {
  const currenYear = new Date().getFullYear();

  const user = useAuth();
  const navigate = useNavigate();

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    const { target }: any = event;

    const email = target.email.value;
    const password = target.password.value;

    authProvder.login(email, password, () => {
      console.log('Signed in');
      window.location.reload();
    });
  };

  const logout = () => {
    authProvder.logout(() => {
      console.log('Signed out');
      navigate('/', { replace: true });
      window.location.reload();
    });
  };

  return (
    <div className="Root">
      <nav>
        <Link to="/">React Auth</Link>
        {user ? (
          <ul>
            <li>
              <Link to="/secret">Secret</Link>
            </li>
            <li>
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <div id="login-form">
                <form onSubmit={login}>
                  <input
                    type={'email'}
                    placeholder={'enter email...'}
                    name="email"
                  />
                  <input
                    type={'password'}
                    placeholder={'enter password...'}
                    name="password"
                  />
                  <br />
                  <button type="submit">Login</button>
                </form>
              </div>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
      <footer>© Davin Reid {currenYear}</footer>
    </div>
  );
}
