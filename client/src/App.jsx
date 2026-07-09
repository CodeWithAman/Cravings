import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import CustomerDashborad from "./pages/dashboard/CustomerDashborad";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:userType" element={<Register />} />
          <Route path="/contact-Us" element={<ContactUs />} />

          {/* dashborad routes */}
          <Route path="/customer/dashboard" element={<CustomerDashborad/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard/>} />
          <Route path="/rider/dashboard" element={<RiderDashboard/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
