import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const profile = Auth.getProfile();
  const username = profile?.data?.username;
  return (
    <header>
      <h1>HEALTH QUEST</h1>
      <div className='header-buttons'>
        <Link to="/previous-entries" className="view-entries-button">
          Previous Entries
        </Link>
        <Link to={`/profiles/${username}`} className="my-profile-button">
          My Profile
        </Link>
        <Link to={`/graph/${username}`} className="my-profile-button">
          View Graph
        </Link>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
