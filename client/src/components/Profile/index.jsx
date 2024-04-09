import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: Auth.getProfile().data.username,
    email: Auth.getProfile().data.email
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: { ...formData }
      });
      console.log('Profile updated:', data);

      // Set the new token in local storage
      Auth.setToken(data.updateUser.token);

      // Set success message and redirect after 3 seconds
      setSuccessMessage('Profile updated successfully! Redirecting to your notebook.');
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, show error message to user
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteUser();
      // Clear id token
      Auth.logout();
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Handle error, show error message to user
    }
  };

  return (
    <div className="update-profile">
      <h2>Update Profile</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <button className='delete-profile-btn' onClick={() => setShowConfirmation(true)}>Delete Profile</button>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete your account?</p>
          <div className="delete-button-container">
            <button onClick={handleDeleteConfirmation}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );

};

export default ProfileComponent;
