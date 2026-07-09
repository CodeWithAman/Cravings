import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import navLogo from "../assets/logo-light.png";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin, role, setRole } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (role === "restaurant") {
      navigate("/restaurant/dashboard");
    } else if (role === "rider") {
      navigate("/rider/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("cravingUser");
      setUser(false);
      setIsLogin(false);
      setRole?.(null);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while logging out.",
      );
    }
  };

  return (
    <>
      <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
        <div className="h-full">
          <Link to="/">
            <img src={navLogo} alt="Logo" className="w-fit h-full" />{" "}
          </Link>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-2">
            <button
              className="flex gap-2 items-center text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content)  px-3 py-1 rounded"
              title="Go to Dashboard"
              onClick={handleNavigate}
            >
              <img
                src={user?.photo.url}
                alt={user?.fullname}
                className="w-12 h-12 rounded-full object-cover object-top"
              />
              <div className="flex flex-col items-start">
                <span className="text-base">{user?.fullname}</span>
                <span className="text-xs text-(--color-primary-content)/80 uppercase font-semibold">
                  {role}
                </span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) hover:bg-(--color-error) px-3 py-3 rounded"
              title="Logout"
            >
              <AiOutlineLogout />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register/customer"
              className="bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
