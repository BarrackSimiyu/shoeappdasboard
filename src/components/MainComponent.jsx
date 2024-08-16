import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiosInstance';
import '../styles.css';
import Layout from './Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);

    const fetchOrdersAndCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const [ordersResponse, categoriesResponse] = await Promise.all([
                axiosInstance.get('/get-all-orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }),
                axiosInstance.get('/shoe_category', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
            ]);

            const ordersData = ordersResponse.data.orders || ordersResponse.data;
            const categoriesData = categoriesResponse.data || [];

            // Calculate total number of products
            const totalProductsCount = ordersData.reduce((total, order) => {
                return total + order.items.reduce((sum, item) => sum + item.quantity, 0);
            }, 0);

            setOrders(ordersData);
            setCategories(categoriesData);
            setTotalCategories(categoriesData.length);
            setTotalOrders(ordersData.length);
            setTotalProducts(totalProductsCount);

            // Prepare data for chart: Total products sold per order
            const dataForChart = ordersData.map(order => ({
                orderId: order.order_id,
                totalProducts: order.items.reduce((sum, item) => sum + item.quantity, 0)
            }));

            setChartData(dataForChart);

        } catch (err) {
            setError('Failed to fetch data');
            console.error('Error response:', err.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdersAndCategories();
    }, []);

    return (
        <div className="view-orders-container">
            <Layout />

            <section className="home-container">
                <div className="home-row">
                    <div className="home-card-wrapper">
                        <div className="home-card blue shadow">
                            <div>PRODUCTS SOLD</div>
                            <div className="home-card-body">{totalProducts}</div>
                        </div>
                    </div>
                    <div className="home-card-wrapper">
                        <div className="home-card orange shadow">
                            <div>CATEGORIES</div>
                            <div className="home-card-body">{totalCategories}</div>
                        </div>
                    </div>
                    <div className="home-card-wrapper">
                        <div className="home-card red shadow">
                            <div>ORDERS</div>
                            <div className="home-card-body">{totalOrders}</div>
                        </div>
                    </div>
                </div>

                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}

                {chartData.length > 0 && (
                    <div className="chart-container">
                        <h2>Products Sold per Order</h2>
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
                                <Bar dataKey="totalProducts" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ViewOrders;
