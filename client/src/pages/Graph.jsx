import Header from "../components/Header";
import Footer from "../components/Footer";
import LineGraph from "../components/LineGraph";
import { useLocation } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';


const Graph = () => {
  const location = useLocation();
  return (
    <div className="main">
      <Header />
      <LineGraph />
      <div className="go-back-container">
        {location.pathname !== '/dashboard' && <GoBackButton />}
      </div>
      <Footer />
    </div>
  )
};

export default Graph;