import React from 'react';
import { FaHome, FaUser, FaBell, FaCog } from 'react-icons/fa'; // Import icons from react-icons
import '../styles.css'; // Import the updated CSS file

const TopBar = () => {
    const user = localStorage.getItem("username")
    return (
        <div className="topbar">
            <div className="topbar-content">
                <div className="brand">
                    <h1>EliteEchelons</h1>
                </div>
                <div className="topbar-nav">
                    <ul>
                        <li>
                            <a href="/">
                                <FaHome className="icon" />
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/profile">
                                <FaUser className="icon" />
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="/notifications">
                                <FaBell className="icon" />
                                Notifications
                            </a>
                        </li>
                        <li>
                            <a href="/settings">
                                <FaCog className="icon" />
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="user-info">
                    <img src="/image/icon.png" alt="User Avatar" className="user-avatar" />
                    <span className="user-name">{user}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
