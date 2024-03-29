
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="logo-container">
        <img src="./src/assets/images/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="button-container">
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Homepage;