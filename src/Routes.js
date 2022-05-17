import React from 'react';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Check from './components/Check/Check';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Register></Register>} />
                <Route exact path="/login" element={<Login></Login>} />
                <Route exact path="/check-token" element={<Check></Check>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;