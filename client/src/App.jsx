import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserDashborad from "./pages/dashboard/UserDashborad";

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
          <Route path="/contact-Us" element={<ContactUs />} />

          {/* dashborad routes */}
          <Route path="/user/dashboard" element={<UserDashborad/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
