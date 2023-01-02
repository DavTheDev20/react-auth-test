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
            <div id="login-form">
              <form>
                <input type={'email'} placeholder={'enter email...'} />
                <input type={'password'} placeholder={'enter password...'} />
                <br />
                <button type="submit">Login</button>
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
