import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axiosInstance from '../helpers/axiosInstance'; // Import axiosInstance
import '../styles.css'; // Import styles.css

const AdminSignup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.post('/admin_signup', {
            email,
            username,
            phone,
            password
        })
        .then((response) => {
            setSuccess(response?.data?.message);
            setLoading(false);
            navigate('/signin');
        })
        .catch((error) => {
            setLoading(false);
            setFailure(error.message);
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Admin Sign Up</h2>
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
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <button type="submit">Sign Up</button>
                <br />
                <Link to="/signin" style={{textAlign:"center", color:"red"}}>Already have an account? Sign in</Link>
            </form>
        </div>
    );
};

export default AdminSignup;
