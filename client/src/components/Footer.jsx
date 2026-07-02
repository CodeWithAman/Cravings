import React from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiChevronRight,
  FiGift,
  FiSend,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  MdOutlineFastfood,
  MdOutlineLocalPizza,
  MdOutlineRamenDining,
  MdOutlineCake,
} from "react-icons/md";
import { GiHamburger } from "react-icons/gi";

const Footer = () => {
  const socialIcons = [
    { icon: <FaFacebookF size={14} />, label: "Facebook" },
    { icon: <FaInstagram size={14} />, label: "Instagram" },
    { icon: <FaTwitter size={14} />, label: "Twitter" },
    { icon: <FaYoutube size={14} />, label: "YouTube" },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Menu", to: "/menu" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  const categories = [
    { icon: <MdOutlineLocalPizza size={15} />, label: "Pizza", to: "/menu" },
    { icon: <GiHamburger size={15} />, label: "Burgers", to: "/menu" },
    { icon: <MdOutlineRamenDining size={15} />, label: "Noodles", to: "/menu" },
    { icon: <MdOutlineCake size={15} />, label: "Desserts", to: "/menu" },
  ];

  const contactItems = [
    { icon: <FiMapPin size={15} />, text: "123 Food Street, Mumbai, India" },
    { icon: <FiPhone size={15} />, text: "+91 98765 43210" },
    { icon: <FiMail size={15} />, text: "hello@cravings.com" },
    { icon: <FiClock size={15} />, text: "Mon - Sun: 9:00 AM – 11:00 PM" },
  ];

  return (
    <>
      <footer className="bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MdOutlineFastfood size={30} className="text-orange-400" />
              <h1 className="text-2xl font-extrabold">
                Crav<span className="text-orange-400">ings</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delicious food delivered fast to your doorstep. Fresh meals from
              your favourite restaurants every day.
            </p>
            <div className="flex gap-3 mt-2">
              {socialIcons.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 text-white"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-orange-400">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-sm hover:text-orange-400 transition duration-300 flex items-center gap-2"
                  >
                    <FiChevronRight size={14} className="text-orange-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-orange-400">Categories</h3>
            <ul className="flex flex-col gap-2">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 text-sm hover:text-orange-400 transition duration-300 flex items-center gap-2"
                  >
                    <span className="text-orange-500">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-orange-400">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              {contactItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5 shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-gray-400 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-orange-500/20">
          <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <FiGift size={18} className="text-orange-400" />
                Get exclusive offers!
              </h4>
              <p className="text-gray-400 text-sm mt-1">
                Subscribe to our newsletter and never miss a deal.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-orange-500/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 transition"
              />
              <button className="btn-shimmer inline-flex items-center gap-2 text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 text-sm whitespace-nowrap">
                <FiSend size={14} /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500/20">
          <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © 2025{" "}
              <span className="text-orange-400 font-semibold">Cravings</span>.
              All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    to="/"
                    className="text-gray-500 text-sm hover:text-orange-400 transition duration-300"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
