import React from 'react';
import '../styles.css'; // Ensure this CSS file has the updated styles
import Layout from './Layout';

const MemberProfile = () => {
    // Retrieve user data from local storage
    const username = localStorage.getItem('username');
    const admin_id = localStorage.getItem('admin_id');
    const email = localStorage.getItem('email');

    return (

        
        <div className='form-container'>
            <div className="profile-page-wrapper">
            <Layout />
            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {/* Placeholder for user avatar */}
                        <img src="/image/icon.png" alt="User Avatar" className="avatar-image" />
                    </div>
                    <h2 className='profile-title'>{username}</h2>
                    <div className="profile-details">
                        <div className="profile-item">
                            <span className="profile-label">Admin ID:</span>
                            <span className="profile-value">{admin_id}</span>
                        </div>
                        <div className="profile-item">
                            <span className="profile-label">Email:</span>
                            <span className="profile-value">{email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default MemberProfile;
