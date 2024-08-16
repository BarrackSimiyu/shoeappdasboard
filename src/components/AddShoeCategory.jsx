import React, { useState } from 'react';
import axiosInstance from '../helpers/axiosInstance'; // Import axiosInstance
import '../styles.css'; // Import styles.css
import CheckSession from '../helpers/CheckSession';
import Layout from './Layout';

const AddShoeCategory = () => {
    const { admin_id } = CheckSession(); // Assuming CheckSession returns { admin_id, access_token }
    const [category_name, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setFailure(null);

        axiosInstance.post('/addshoecategory', {
            admin_id,
            category_name
        })
        .then(function (response) {
            console.log(response.data);
            setLoading(false);
            setSuccess('Shoe category added successfully'); // Fixed success message
        })
        .catch(function (error) {
            console.log(error.message);
            setLoading(false);
            setFailure('Failed to add category'); // Fixed failure message
        });
    };

    return (
       <div className='form-container'>
        <Layout/>
         <div>
            <form onSubmit={handleSubmit} className="form">
                <h2>Add Shoe Category</h2>
                {loading && <div className='text-danger'>Please Wait...</div>}
                {failure && <div className="error-text">{failure}</div>}
                {success && <div className="success-text">{success}</div>}
                <label htmlFor="category-name">Category Name:</label>
                <input
                    type="text"
                    id="category-name"
                    value={category_name}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <button type="submit">Add Category</button>
            </form>
        </div>
       </div>
    );
};

export default AddShoeCategory;
