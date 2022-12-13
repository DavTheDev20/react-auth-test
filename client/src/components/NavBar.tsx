import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from '../utils/cookieUtils';

const NavBar = () => {
  const navBarStyles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      height: '10vh',
      justifyContent: 'space-around',
      backgroundColor: 'lightblue',
    },
    navLinks: {
      display: 'flex',
      width: '15vw',
      listStyleType: 'none',
      justifyContent: 'space-around',
    },
  };

  const [token, setToken] = useState('');

  const getToken = () => {
    const token: any = getCookie('token');
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <nav style={navBarStyles.nav}>
      <Link to="/">React Auth</Link>
      <ul style={navBarStyles.navLinks}>
        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <a
            href="#"
            onClick={() => {
              deleteCookie('token');
              setToken('');
            }}
          >
            Logout
          </a>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
