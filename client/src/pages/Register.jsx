import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import {
  FiTruck, FiCoffee, FiStar, FiGift,
  FiUser, FiMail, FiPhone, FiCalendar, FiLock, FiUserPlus,
} from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      setValidateError("Passwords do not match.");
      return;
    }
    setValidateError("");
    const payload = {
      fullname: registerData.fullname,
      email: registerData.email.toLowerCase(),
      phone: registerData.phone,
      gender: registerData.gender,
      dob: registerData.dob,
      password: registerData.password,
    };
    console.log("Register Data Submitted:", payload);

    try {
      const res = await api.post("/auth/register", payload);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.res?.data?.message || error.message);
    }
  };

  const inputClass =
    "border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition w-full";

  const inputWithIcon =
    "border-2 border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition w-full";

  const tags = [
    { icon: <FiTruck size={12} />, label: "Fast Delivery" },
    { icon: <FiCoffee size={12} />, label: "Fresh Food" },
    { icon: <FiStar size={12} />, label: "Top Rated" },
    { icon: <FiGift size={12} />, label: "Best Offers" },
  ];

  return (
    <div className="page-enter h-screen overflow-hidden bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 grid md:grid-cols-2 items-center px-8 pt-20 pb-4 gap-8">

      {/* Left — Branding */}
      <div className="left-enter hidden md:flex flex-col items-center justify-center gap-5 text-white">
        <div className="flex items-center gap-3">
          <MdOutlineFastfood size={48} className="text-orange-400" />
          <h1 className="text-4xl font-extrabold">
            Crav<span className="text-orange-400">ings</span>
          </h1>
        </div>

        <div className="animate-float drop-shadow-2xl text-orange-400">
          <FiTruck size={90} />
        </div>

        <p className="text-2xl font-bold text-center leading-snug">
          Join us today &{" "}
          <span className="text-orange-400">get 50% off</span>
          <br />
          your first order!
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-300 rounded-full px-4 py-1.5 text-sm font-semibold"
            >
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Right — Register Card */}
      <div className="right-enter flex items-center justify-center h-full overflow-hidden">
        <div className="card-enter w-full max-w-lg bg-white rounded-3xl shadow-2xl p-5">

          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 rounded-full text-xs font-semibold px-4 py-1 mb-2">
              <FiUserPlus size={11} /> Let's get started!
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-xs mt-1">
              Register to start your journey with us.
            </p>
          </div>

          {validateError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2 text-xs text-center mb-3">
              {validateError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2.5">

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <FiUser size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullname"
                  value={registerData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Email</label>
              <div className="relative">
                <FiMail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Phone Number</label>
              <div className="relative">
                <FiPhone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Gender</label>
              <select
                name="gender"
                value={registerData.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Date of Birth</label>
              <div className="relative">
                <FiCalendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleChange}
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <div className="relative">
                <FiLock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <FiLock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={inputWithIcon}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="col-span-2 w-full btn-shimmer inline-flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl hover:opacity-90 hover:scale-[1.01] transition-all duration-200 text-sm"
            >
              <FiUserPlus size={15} /> Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="text-center text-sm text-gray-500 space-y-1.5">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                Login
              </Link>
            </p>
            <p>
              Need help?{" "}
              <Link to="/contact-us" className="text-orange-500 font-semibold hover:underline">
                Contact Us
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;