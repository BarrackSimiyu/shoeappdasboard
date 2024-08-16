import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiosInstance'; // Ensure axiosInstance is imported
import '../styles.css'; // Ensure this CSS file has the updated styles
import Layout from './Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [salesData, setSalesData] = useState([]);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get('/get-all-orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Example token
                }
            });
            const ordersData = response.data.orders || response.data; // Adjust based on actual response structure
            setOrders(ordersData);
            setFilteredOrders(ordersData); // Initially, show all orders

            // Prepare data for order items chart
            const dataForChart = ordersData.reduce((acc, order) => {
                order.items.forEach(item => {
                    acc.push({
                        orderId: order.order_id,
                        shoeId: item.shoe_id,
                        quantity: item.quantity,
                        price: item.price
                    });
                });
                return acc;
            }, []);
            setChartData(dataForChart);

            // Prepare data for sales summary chart
            const salesSummary = ordersData.reduce((acc, order) => {
                const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                acc.push({
                    orderId: order.order_id,
                    totalQuantity,
                    totalAmount
                });
                return acc;
            }, []);
            setSalesData(salesSummary);

        } catch (err) {
            setError('Failed to fetch orders');
            console.error('Error response:', err.response); // Log detailed error info
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const results = orders.filter(order =>
            order.order_id.toString().includes(searchTerm) ||
            order.user_id.toString().includes(searchTerm)
        );
        setFilteredOrders(results);
    }, [searchTerm, orders]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchOrders();
    };

    return (
        <div className="view-orders-container">
            <Layout />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <form onSubmit={handleSubmit} className="view-orders-form">
                <button type="submit" className="submit-button">Refresh Orders</button>
            </form>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {filteredOrders.length > 0 && (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Shoe ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order.order_id}>
                                {order.items.map((item, index) => (
                                    <tr key={index}>
                                        {index === 0 && (
                                            <td rowSpan={order.items.length}>{order.order_id}</td>
                                        )}
                                        {index === 0 && (
                                            <td rowSpan={order.items.length}>{order.user_id}</td>
                                        )}
                                        <td>{item.shoe_id}</td>
                                        <td>{item.quantity}</td>
                                        <td>KES: {item.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}

            {filteredOrders.length === 0 && !loading && !error && (
                <div className="no-orders">No orders found</div>
            )}

            {chartData.length > 0 && (
                <div className="chart-container">
                    <h2>Order Items Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="orderId" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {salesData.length > 0 && (
                <div className="chart-container">
                    <h2>Sales Summary Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={salesData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="orderId" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalQuantity" fill="#82ca9d" />
                            <Bar dataKey="totalAmount" fill="#ff7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default ViewOrders;
