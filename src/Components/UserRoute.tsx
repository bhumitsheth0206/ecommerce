import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AdminUser from "../Pages/AdminUser";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AdminProductList from "../Pages/AdminProductList";
import Cart from "../Pages/Cart";
import PrivateUserRoute from "./PrivateUserRoute";
import Order from "../Pages/Order";

const UserRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/order" element={<Order />} />
                <Route path="/admin/user" element={
                    <PrivateAdminRoute>
                        <AdminUser />
                    </PrivateAdminRoute> }
                />
                <Route path="/admin/product" element={
                    <PrivateAdminRoute>
                        <AdminProductList />
                    </PrivateAdminRoute> }
                />
                <Route path="/cart" element={
                    <PrivateUserRoute>
                        <Cart />
                    </PrivateUserRoute> }
                />
            </Routes>
        </Router>
    );
};

export default UserRoute;