import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";



const Routs = () =>
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={ Home } />
                <Route path="/shop" exact Component={ Shop } />
                <Route path="/signin" exact Component={ Signin } />
                <Route path="/signup" exact Component={ Signup } />
                <Route path="/user/dashboard" exact Component={ Dashboard } />
                <Route path="/admin/dashboard" exact Component={ AdminDashboard } />
                <Route path="/create/category" exact Component={ AddCategory } />
                <Route path="/create/product" exact Component={ AddProduct } />
                <Route path="/product/:productId" exact Component={ Product } />
                <Route path="/cart" exact Component={ Cart } />
                <Route path="/admin/orders" exact Component={ Orders } />
                <Route path="/profile/:userId" exact Component={ Profile } />
                <Route path="/admin/products" exact Component={ ManageProducts } />
                <Route path="/admin/product/update/:productId" exact Component={ UpdateProduct } />
            </Routes>
        </BrowserRouter>
    )
}


export default Routs;