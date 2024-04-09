import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const location = useLocation();
  const profile = Auth.getProfile();
  const username = profile?.data?.username;
  console.log(location);

  // Encode the username to handle spaces
  const encodedUsername = encodeURIComponent(username);

  const isDashboard = location.pathname === '/dashboard';
  const isPreviousEntries = location.pathname === '/previous-entries';
  const isProfile = location.pathname === `/profiles/${encodedUsername}`;
  const isGraph = location.pathname === `/graph/${encodedUsername}`;

  return (
    <header>
      <h1>HEALTH QUEST</h1>
      <div className='header-buttons'>
        {isDashboard && (
          <>
            <Link to="/previous-entries" className="view-entries-button">
              Previous Entries
            </Link>
            <Link to={`/profiles/${encodedUsername}`} className="my-profile-button">
              My Profile
            </Link>
            <Link to={`/graph/${encodedUsername}`} className="my-profile-button">
              View Graph
            </Link>
          </>
        )}
        {isPreviousEntries && (
          <>
            <Link to={`/profiles/${encodedUsername}`} className="my-profile-button">
              My Profile
            </Link>
            <Link to={`/graph/${encodedUsername}`} className="my-profile-button">
              View Graph
            </Link>
          </>
        )}
        {isProfile && (
          <>
            <Link to="/previous-entries" className="view-entries-button">
              Previous Entries
            </Link>
            <Link to={`/graph/${encodedUsername}`} className="my-profile-button">
              View Graph
            </Link>
          </>
        )}
        {isGraph && (
          <>
            <Link to="/previous-entries" className="view-entries-button">
              Previous Entries
            </Link>
            <Link to={`/profiles/${encodedUsername}`} className="my-profile-button">
              My Profile
            </Link>
          </>
        )}
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
