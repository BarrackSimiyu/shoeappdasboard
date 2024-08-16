import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaTag, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons
import '../styles.css'; // Import styles.css
import CheckSession from '../helpers/CheckSession';

const Sidebar = () => {
    const navigate = useNavigate();
    const { username, admin_id, access_token } = CheckSession();

    const handleLogout = () => {
        // Clear session storage or local storage where you store the token
        localStorage.removeItem('access_token');
        navigate('/signin');
    };

    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <Link to="/">
                        <FaHome className="icon" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/add-shoes">
                        <FaPlus className="icon" />
                        Add Shoes
                    </Link>
                </li>
                <li>
                    <Link to="/add-category">
                        <FaTag className="icon" />
                        Add Category
                    </Link>
                </li>
                <li>
                    <Link to="/view-orders">
                        <FaListAlt className="icon" />
                        View Orders
                    </Link>
                </li>
                <li onClick={handleLogout} className="logout">
                    <FaSignOutAlt className="icon" />
                    Logout
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
