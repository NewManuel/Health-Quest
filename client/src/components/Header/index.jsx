import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <h1>HEALTH QUEST</h1>
      <div className='header-buttons'>
        <Link to="/previous-entries" className="view-entries-button">
          View Previous Entries
        </Link>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
