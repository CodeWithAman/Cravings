import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contact Form:", contactData);
    setSuccessMessage("Your message has been sent successfully!");
    setContactData({
      fullname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    try {
      const res = await api.post("/public/contactUs" , contactData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.res?.data?.message || error.message);
    }
  };

  const inputClass =
    "border-2 border-gray-200 rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition w-full";

  return (
    <div className="page-enter h-screen overflow-hidden bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 grid md:grid-cols-2 items-center px-8 pt-20 pb-4 gap-8">
      {/* Left — Branding */}
      <div className="left-enter hidden md:flex flex-col items-center justify-center gap-6 text-white">
        <div className="flex items-center gap-3">
          <span className="text-5xl">🍔</span>
          <h1 className="text-4xl font-extrabold">
            Crav<span className="text-orange-400">ings</span>
          </h1>
        </div>

        <div className="text-7xl drop-shadow-2xl animate-bounce">📩</div>

        <p className="text-2xl font-bold text-center leading-snug">
          We'd love to <span className="text-orange-400">hear from you.</span>
          <br />
          We're here to help!
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          {["📍 Mumbai", "📞 24/7 Support", "⚡ Fast Reply", "❤️ We Care"].map(
            (tag) => (
              <span
                key={tag}
                className="bg-orange-500/20 border border-orange-500/40 text-orange-300 rounded-full px-4 py-1.5 text-sm font-semibold"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Right — Contact Card */}
      <div className="right-enter  flex items-center justify-center h-full overflow-hidden py-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-orange-50 border border-orange-200 text-orange-600 rounded-full text-xs font-semibold px-4 py-1.5 mb-2">
              📩 Get in touch!
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Send us your message and we'll get back to you.
            </p>
          </div>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-2.5 text-sm text-center mb-3">
              ✅ {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={contactData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={contactData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className={inputClass}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={contactData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Message
              </label>
              <textarea
                rows="3"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="col-span-2 w-full btn-shimmer text-white font-bold py-3 rounded-2xl hover:opacity-90 hover:scale-[1.01] transition-all duration-200 text-sm"
            >
              Send Message →
            </button>
          </form>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className=" text-center space-y-1.5 gap-6 text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
            <p>
              New here?{" "}
              <Link
                to="/register"
                className="text-orange-500 font-semibold hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
