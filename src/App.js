import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import AdminSignin from './components/AdminSignin';
import AdminSignup from './components/AdminSignup';
import AddShoeCategory from './components/AddShoeCategory';
import AddShoes from './components/AddShoes';
import MemberProfile from './components/MemberProfile';
import MainComponent from './components/MainComponent';
import ViewOrders from './components/ViewOrders';
import CheckSession from './helpers/CheckSession';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Component, ...rest }) => {
    const { access_token } = CheckSession();
    return access_token ? <Component {...rest} /> : <Navigate to="/signin" />;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<AdminSignin />} />
                <Route path="/signup" element={<AdminSignup />} />
                <Route path="/add-shoes" element={<PrivateRoute element={AddShoes} />} />
                <Route path="/add-category" element={<PrivateRoute element={AddShoeCategory} />} />
                <Route path="/view-orders" element={<PrivateRoute element={ViewOrders} />} />
                <Route path="/profile" element={<PrivateRoute element={MemberProfile} />} />
                <Route path="/" element={<PrivateRoute element={MainComponent} />} />
                <Route path="*" element={<Navigate to="/signin" />} /> {/* Redirect to sign-in if no other route matches */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
