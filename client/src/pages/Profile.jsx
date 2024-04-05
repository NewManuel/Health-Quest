import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileComponent from "../components/Profile";
import { useLocation } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';


const Profile = () => {
  const location = useLocation();
  return (
    <div className="main">
      <Header />
      <ProfileComponent />
      <div className="go-back-container">
        {location.pathname !== '/dashboard' && <GoBackButton />}
      </div>
      <Footer />
    </div>
  )
};

export default Profile;