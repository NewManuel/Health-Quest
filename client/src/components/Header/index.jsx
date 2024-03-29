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
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
