import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setUser(false);
    setIsLogin(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "" },
    { label: "Menu", to: "" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  const activeLinkClass = "text-orange-400 font-semibold";
  const inactiveLinkClass =
    "text-white hover:text-orange-400 transition duration-300 font-medium";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <nav
          className={`max-w-7xl mx-auto mt-3 flex items-center justify-between rounded-2xl border px-6 py-3 shadow-lg transition-all duration-300 ${
            scrolled
              ? "bg-gray-500/30 border-orange-500/30 backdrop-blur-lg"
              : "bg-white-100/10 border-white/10 backdrop-blur-lg"
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

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {isLogin && user ? (
              <div className="flex items-center gap-3 border-l border-white/20 pl-4">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                  <img
                    src={user.photo}
                    alt={user.fullname}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <Link
                  to="/user/dashboard"
                  className="text-white text-sm font-semibold hover:text-orange-400 transition duration-300"
                >
                  {user.fullname}
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-500 transition duration-300 ml-1"
                  title="Logout"
                >
                  <AiOutlineLogout size={20} />
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md"
          >
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mx-3 mt-2 rounded-2xl border border-orange-500/20 bg-gray-900/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
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
                    isActive
                      ? "text-orange-400"
                      : "text-white hover:text-orange-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Auth */}
            <div className="mt-4 pb-2">
              {isLogin && user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                      <img
                        src={user.photo}
                        alt={user.fullname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Link
                      to="/user/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-sm font-semibold hover:text-orange-400 transition"
                    >
                      {user.fullname}
                    </Link>
                  </div>

                  {/* Mobile Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-red-400 hover:text-red-500 text-sm font-semibold transition"
                  >
                    <AiOutlineLogout size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
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
                    className="flex-1 text-center rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-4 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
