import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axiosInstance from '../helpers/axiosInstance'; // Import axiosInstance
import '../styles.css'; // Import styles.css
import Layout from './Layout';

const AdminSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.post('/admin_signin', { email, password })
            .then((response) => {
                setLoading(false);
                if (response?.data && response?.data?.access_token && response?.data?.member) {
                    // Save data to local storage
                    localStorage.setItem("admin_id", response?.data?.member?.admin_id);
                    localStorage.setItem("username", response?.data?.member?.username);
                    localStorage.setItem("email", response?.data?.member?.email);
                    localStorage.setItem("phone", response?.data?.member?.phone);
                    localStorage.setItem("access_token", response?.data?.access_token);

                    // Redirect user to home page
                    navigate("/");
                } else {
                    // Login failed
                    setFailure("LOGIN FAILED");
                }
            })
            .catch((error) => {
                setFailure(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Admin Sign In</h2>
                {loading && <div className='text-warning'>Please Wait...</div>}
                {failure && <div className="error-text">{failure}</div>}
                {success && <div className="success-text">{success}</div>}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
                <br />
                <Link to="/signup" style={{textAlign:"center", color:"red"}}>Don't have an account? Sign up</Link>
            </form>
        </div>
    );
};

export default AdminSignin;
