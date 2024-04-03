import Header from "../components/Header";
import DashboardInformationalMessage from "../components/DashboardInformationalMessage";
import HealthQuestionnaire from "../components/HealthQuestionaire";
import Footer from "../components/Footer";


const Dashboard = () => {
    return (
        <div className="main">
            <Header />
            <DashboardInformationalMessage />
            <div className="dashboard-container">
                <HealthQuestionnaire />
            </div>
            <Footer />
        </div>
    )
};

export default Dashboard;