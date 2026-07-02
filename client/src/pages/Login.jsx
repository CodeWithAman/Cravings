import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import {
  FiTruck,
  FiCoffee,
  FiStar,
  FiMail,
  FiLock,
  FiLogIn,
} from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validateError, setValidateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setValidateError("Please fill in all fields.");
      return;
    }
    setValidateError("");
    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };
    console.log("Login Data Submitted:", payload);

    try {
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      // setIsLogin(true);
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(
        error.response.status + "|" + error.response?.data?.message ||
          error.message,
      );
    }
  };

  const inputClass =
    "border-2 border-gray-200 rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition w-full";

  const tags = [
    { icon: <FiTruck size={13} />, label: "Fast Delivery" },
    { icon: <FiCoffee size={13} />, label: "Fresh Food" },
    { icon: <FiStar size={13} />, label: "Top Rated" },
  ];

  return (
    <>
      <div className="page-enter h-screen overflow-hidden bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 grid md:grid-cols-2 items-center px-8 pt-20 pb-4 gap-8">
        {/* Left — Branding */}
        <div className="left-enter hidden md:flex flex-col items-center justify-center gap-6 text-white">
          <div className="flex items-center gap-3">
            <MdOutlineFastfood size={48} className="text-orange-400" />
            <h1 className="text-4xl font-extrabold">
              Crav<span className="text-orange-400">ings</span>
            </h1>
          </div>

          <div className="animate-float drop-shadow-2xl text-orange-400">
            <MdOutlineFastfood size={100} />
          </div>

          <p className="text-2xl font-bold text-center leading-snug">
            Delicious food,{" "}
            <span className="text-orange-400">delivered fast</span>
            <br />
            to your doorstep.
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

        {/* Right — Login Card */}
        <div className="right-enter flex items-center justify-center h-full overflow-hidden">
          <div className="card-enter w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
            <div className="text-center mb-5">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 rounded-full text-xs font-semibold px-4 py-1.5 mb-2">
                <FiLogIn size={12} /> Welcome back!
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Sign in to Cravings
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Login to continue to your account.
              </p>
            </div>

            {validateError && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center mb-4">
                {validateError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <Link
                    to=""
                    className="text-xs text-orange-500 font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-shimmer inline-flex items-center justify-center gap-2 text-white font-bold py-3 rounded-2xl hover:opacity-90 hover:scale-[1.01] transition-all duration-200 text-base mt-1"
              >
                <FiLogIn size={17} /> Login
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-gray-400 text-xs">OR</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="space-y-1.5 text-center text-sm text-gray-500">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
              <p>
                Need help?{" "}
                <Link
                  to="/contact-us"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
