import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

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
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end h-[90vh] p-10 md:pe-30 bg-cover bg-center bg-[url('/foodTable.webp')]">
        {/* Card Container */}
        <div className="w-full max-w-md px-10 py-6 bg-white rounded-lg shadow-md max-h-[90vh]">
          {/* Header */}
          <h1 className="mb-2 text-3xl font-bold text-center text-(--color-primary)">
            Create Account
          </h1>
          <p className="mb-4 text-center text-(--color-secondary)">
            Join us as a Customer, Restaurant, or Rider
          </p>

          {validateError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-center">
              {validateError}
            </div>
          )}

          {/* User Type Selector */}
          {/* <div class="mb-6">
            <label class="block mb-3 font-semibold text-(--color-neutral)">
              Register as:
            </label>
            <div class="flex gap-5">
              <label class="flex items-center gap-2 capitalize cursor-pointer text-(--color-neutral)">
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked
                  class="cursor-pointer"
                />
                customer
              </label>
              <label class="flex items-center gap-2 capitalize cursor-pointer text-(--color-neutral)">
                <input
                  type="radio"
                  name="userType"
                  value="restaurant"
                  class="cursor-pointer"
                />
                restaurant
              </label>
              <label class="flex items-center gap-2 capitalize cursor-pointer text-(--color-neutral)">
                <input
                  type="radio"
                  name="userType"
                  value="rider"
                  class="cursor-pointer"
                />
                rider
              </label>
            </div>
          </div> */}

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={registerData.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <input
                type="number"
                name="phone"
                placeholder="Enter your phone number"
                value={registerData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <select
                name="gender"
                value={registerData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              >
                <option value="" disabled hidden>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
              <input
                type="date"
                name="dob"
                value={registerData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral) placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={registerData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) border-(--color-base-300) text-(--color-neutral)"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer text-(--color-secondary)">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="mt-1 cursor-pointer"
                />
                <span className="text-sm">
                  I agree to the{" "}
                  <span className="hover:underline text-(--color-primary)">
                    terms and conditions.
                  </span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mb-4 font-semibold text-white transition-colors duration-300 rounded-md bg-(--color-primary) hover:bg-orange-700"
            >
              Register
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-sm text-center text-(--color-secondary)">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline text-(--color-primary)"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;