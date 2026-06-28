import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Menu", to: "/" },
    { label: "Contact Us", to: "/contact-Us" },
  ];

  const activeLinkClass = "text-orange-400 font-semibold";
  const inactiveLinkClass = "text-white hover:text-orange-400 transition duration-300 font-medium";

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* Main Nav */}
      <nav
        className={`max-w-7xl mx-auto mt-3 flex items-center justify-between rounded-2xl border px-6 py-3 shadow-lg transition-all duration-300 ${
          scrolled
            ? "bg-black/30 border-orange-600/50 backdrop-blur-xl"
            : "bg-white-900/90 border-white/20 backdrop-blur-lg"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaHamburger className="text-orange-400 text-2xl" />
          <h1 className="text-2xl font-extrabold">
            <span className="text-white">Crav</span>
            <span className="text-orange-400">ings</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                isActive ? activeLinkClass : inactiveLinkClass
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-white text-sm font-medium backdrop-blur-md transition hover:bg-white hover:text-black duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl btn-shimmer px-5 py-2 text-white text-sm font-semibold transition hover:opacity-90 hover:scale-105 duration-300"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md"
        >
          <span
            className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mx-3 mt-2 rounded-2xl border border-orange-500/20 bg-gray-900/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 border-b border-white/10 text-sm font-medium transition duration-300 ${
                  isActive ? "text-orange-400" : "text-white hover:text-orange-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex gap-3 mt-4 pb-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-white text-sm font-medium hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center rounded-xl btn-shimmer px-4 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;