import { Outlet, Link } from 'react-router-dom';
import { authProvider } from '../auth';
import '../Root.css';
import { deleteCookie, getCookie, setCookie } from '../utils/cookieUtils';

export default function Root() {
  const currenYear = new Date().getFullYear();
  const token = getCookie('token');
  return (
    <div className="Root">
      <nav>
        <Link to="/">React Auth</Link>
        <ul>
          <li>
            {!token ? (
              <div>
                <form
                  style={{ textAlign: 'center' }}
                  id="login-form"
                  onSubmit={(event: React.FormEvent) => {
                    event.preventDefault();
                    const { target } = event;
                    const email = target.email.value;
                    const password = target.password.value;

                    if (!email || !password)
                      return alert('Please enter email and password to login');

                    return authProvider.signIn(email, password, () => {
                      if (authProvider.isAuthenticated === true) {
                        console.log('Signed In');
                        setCookie('token', authProvider.token);
                        window.location.reload();
                      }
                    });
                  }}
                >
                  <input
                    type={'email'}
                    placeholder={'enter your email'}
                    name="email"
                  />
                  <br />
                  <input
                    type={'password'}
                    placeholder={'enter your password'}
                    name="password"
                  />
                  <br />
                  <button
                    type="submit"
                    style={{
                      marginTop: '5px',
                      padding: '5px',
                      width: '75%',
                      cursor: 'pointer',
                    }}
                  >
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <a
                href="#"
                onClick={() => {
                  deleteCookie('token');
                  window.location.reload();
                }}
              >
                Logout
              </a>
            )}
          </li>
          {!token ? (
            <li>
              <Link to="/register">Register</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
      <footer>© Davin Reid {currenYear}</footer>
    </div>
  );
}
