import Auth from '../../utils/auth';

const DashboardInformationalMessage = () => {
    return (
        <div className='dashboardMessageContainer'>
            <p>Hello {Auth.getProfile().data.username.charAt(0).toUpperCase() + Auth.getProfile().data.username.slice(1)}, we are so glad you're here. Tracking your habits is one of the first steps towards building a life full of health and vitality. </p>
            <br></br>
            <p>As you wind down for the day, take a moment to reflect on your experiences. How did today go? What were the highlights and challenges you encountered? Reflecting on your day can provide valuable insights into your habits and patterns.</p>
        </div>
    );
};

export default DashboardInformationalMessage;