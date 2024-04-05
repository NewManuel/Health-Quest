import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardInfoMessage from "../components/DashboardInfoMessage";
import HealthQuestionnaire from "../components/HealthQuestionaire";


const Dashboard = () => {
    return (
        <div className="main">
            <Header />
            <DashboardInfoMessage />
            <div className="dashboard-container">
                <HealthQuestionnaire />
            </div>
            <Footer />
        </div>
    )
};

export default Dashboard;