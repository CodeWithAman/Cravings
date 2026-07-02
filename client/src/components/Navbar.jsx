import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import navLogo from "../assets/logo-light.png";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setUser(false);
    setIsLogin(false);
    navigate("/");
  };

  return (
    <>
      <div className=" sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
        <div className="h-full">
          <Link to={"/"}>
            <img src={navLogo} alt="Logo" className="w-fit h-full" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isLogin && user ? (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-(--color-primary-content) shrink-0">
                <img
                  src={user.photo}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <Link
                to="/user/dashboard"
                className="text-(--color-primary-content) text-sm font-semibold hover:opacity-80 transition duration-300"
              >
                {user.fullname}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-(--color-primary-content) hover:opacity-70 transition duration-300 ml-1"
                title="Logout"
              >
                <AiOutlineLogout size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={"/login"}
                className=" text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className=" bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
