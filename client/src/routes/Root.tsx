import { Outlet, Link } from 'react-router-dom';
import '../../Root.css';

export default function Root() {
  const currenYear = new Date().getFullYear();

  return (
    <div className="Root">
      <nav>
        <Link to="/">React Auth</Link>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
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
