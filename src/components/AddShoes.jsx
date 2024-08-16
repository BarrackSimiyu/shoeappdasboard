import React, { useEffect, useState } from 'react';
import axiosInstance from '../helpers/axiosInstance';
import CheckSession from '../helpers/CheckSession';
import '../styles.css'; // Import styles.css
import Layout from './Layout';

const AddShoes = () => {
    const { admin_id } = CheckSession();
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [brand_name, setBrandName] = useState('');
    const [quantity, setQuantity] = useState(''); // State for quantity
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/shoe_category', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setCategories(response?.data);
            } catch (err) {
                setFailure('Failed to fetch categories');
                console.error(err);
            }
        };
        
        fetchCategories();
    }, []);
    
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setFailure(null);
        
        if (!category_id || !name || !price || !description || !brand_name || !quantity || !image) {
            setLoading(false);
            setFailure('All fields are required.');
            return;
        }
        
        const formData = new FormData();
        formData.append('admin_id', admin_id);
        formData.append('category_id', category_id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('brand_name', brand_name);
        formData.append('quantity', quantity); // Append quantity
        formData.append('file', image);
        
        try {
            const response = await axiosInstance.post('/addshoes_photo', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setSuccess('Shoe added successfully');
        } catch (error) {
            console.error(error.response?.data || error.message);
            setFailure('Failed to add shoe');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (event) => {
        console.log("Selected category ID:", event.target.value);
        setCategoryId(event.target.value);
    };

    return (
        <div className='form-container'>
            <Layout />
            <div>
                <form onSubmit={handleSubmit} className="form">
                    <h2>Add Shoes</h2>
                    {loading && <div className='text-warning'>Please Wait...</div>}
                    {failure && <div className="error-text">{failure}</div>}
                    {success && <div className="success-text">{success}</div>}

                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="brand_name">Brand:</label>
                    <input
                        type="text"
                        id="brand_name"
                        value={brand_name}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />

                    <label htmlFor="category_id">Category:</label>
                    <select id="category_id" value={category_id} onChange={handleCategoryChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />

                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="file"
                        id="photo"
                        onChange={handleFileChange}
                    />

                    <button type="submit">Add Shoe</button>
                </form>
            </div>
        </div>
    );
};

export default AddShoes;
