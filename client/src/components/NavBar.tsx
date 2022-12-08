import { Link } from 'react-router-dom';

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

  return (
    <nav style={navBarStyles.nav}>
      <Link to="/">React Auth</Link>
      <ul style={navBarStyles.navLinks}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
