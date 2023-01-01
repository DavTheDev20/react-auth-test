import { Outlet, Link } from 'react-router-dom';
import '../Root.css';

export default function Root() {
  const currenYear = new Date().getFullYear();

  return (
    <div className="Root">
      <nav>
        <Link to="/">React Auth</Link>
        <ul>
          <li>
            <div>
              <form style={{ textAlign: 'center' }} id="login-form">
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
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
      <footer>© Davin Reid {currenYear}</footer>
    </div>
  );
}
