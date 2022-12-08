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
      <a href="#">React Auth</a>
      <ul style={navBarStyles.navLinks}>
        <li>
          <a href="/">Login</a>
        </li>
        <li>
          <a href="/">Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
