import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validateError, setValidateError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(
        error.response?.status + "|" + error.response?.data?.message ||
          error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className=" h-[90vh] bg-[url(/foodTable.webp)] flex items-center justify-items-start bg-cover bg-center p-10 md:ps-30">
        <div className=" bg-white rounded-lg shadow-md px-10 py-6 max-w-md w-full">
          <h1 className=" text-3xl font-bold text-(--color-primary) mb-2 text-center">
            Welcome Back
          </h1>
          <p className=" text-(--color-secondary) text-center mb-6">
            Login to your Cravings account
          </p>

          {validateError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-center">
              {validateError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className=" mb-4">
              <label
                htmlFor="email"
                className="block text-(--color-neutral) font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                className=" w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300)"
              />
            </div>
            <div className=" mb-4">
              <label
                htmlFor="password"
                className="block text-(--color-neutral) font-semibold mb-2"
              >
                Password
              </label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                  className=" w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className=" absolute right-3 top-2.5 text-(--color-secondary) hover:text-(--color-primary) transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className=" flex items-center justify-between mb-6">
              <label
                htmlFor="rememberMe"
                className=" flex items-center gap-2 cursor-pointer text-(--color-secondary)"
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="cursor-pointer"
                />
                <span className=" text-sm">Remember me</span>
              </label>
              <Link
                to={"/forgot-password"}
                className=" text-sm text-(--color-primary) hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className=" w-full py-3 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className=" relative mb-6">
            <div className=" absolute inset-0 flex items-center">
              <div className=" w-full border-t border-gray-300"></div>
            </div>
            <div className=" relative flex justify-center text-sm">
              <span className=" px-2 bg-white text-gray-500 text-sm">
                Don't have an account?
              </span>
            </div>
          </div>
          <p className=" text-center text-(--color-secondary) text-sm">
            <Link
              to={"/register"}
              className=" text-(--color-primary) font-semibold hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
