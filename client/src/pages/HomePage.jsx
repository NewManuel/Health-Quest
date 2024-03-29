import { Link } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className="homepage">
      <div className="brand-container">
        <h1 className="brand">HEALTH QUEST</h1>
      </div>
      <div className="button-container">
        <Link className="login-button" to="/login">
          Login
        </Link>
        <Link className="signup-button" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Homepage;