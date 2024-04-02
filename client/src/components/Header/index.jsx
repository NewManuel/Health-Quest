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
      <p>Hello {Auth.getProfile().data.username.charAt(0).toUpperCase() + Auth.getProfile().data.username.slice(1)}, we are so glad you're here. Tracking your habits is one of the first steps towards building a life full of health and vitality. </p>
      <p>As you wind down for the day, take a moment to reflect on your experiences. How did today go? What were the highlights and challenges you encountered? Reflecting on your day can provide valuable insights into your habits and patterns.</p>
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
