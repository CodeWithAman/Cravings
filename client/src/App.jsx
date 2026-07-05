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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
