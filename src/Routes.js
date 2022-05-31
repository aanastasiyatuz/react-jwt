import React from 'react';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Check from './components/Check/Check';
import ProductsList from './components/Product/ProductsList';
import ProductDetail from './components/Product/ProductDetail';
import ProductUpdate from './components/Product/ProductUpdate';
import AddProduct from './components/Product/ProductCreate';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/register" element={<Register></Register>} />
                <Route exact path="/login" element={<Login></Login>} />
                <Route exact path="/check-token" element={<Check></Check>} />
                <Route exact path="/products" element={<ProductsList></ProductsList>} />
                <Route exact path="/add-product" element={<AddProduct></AddProduct>} />
                <Route  path="/product/:id" element={<ProductDetail></ProductDetail>} />
                <Route exact path="/product-update/:id" element={<ProductUpdate></ProductUpdate>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;