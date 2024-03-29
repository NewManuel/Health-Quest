import Header from "../components/Header";
import Footer from "../components/Footer";
import HealthQuestionnaire from "../components/HealthQuestionaire";

const Dashboard = () => {
    return (
        <div className="main">
            <Header />
            <div className="dashboard-container">
                <HealthQuestionnaire />
            </div>
            <Footer />
        </div>
    )
};

export default Dashboard;