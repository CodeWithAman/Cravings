import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cravingLogo from "../assets/circleLogo.png";

const Footer = () => {
  const loaction = useLocation().pathname;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <>
      <footer className="bg-(--color-neutral) text-(--color-neutral-content) py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className=" text-sm text-(--color-neutral-content) text-center mb-8">
            --- Your favorite food delivery platform connecting customers with
            restaurants and riders. ---
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <img
                src={cravingLogo}
                alt="Cravings Logo"
                className=" mb-4 w-32 "
              />
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">Quick Links</h4>
              <ul className=" space-y-2">
                <li
                  onClick={() => navigate("/")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={() => navigate("/about")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  About
                </li>
                <li
                  onClick={() => navigate("/order-now")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Order Now
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">For Restaurants</h4>
              <ul className=" space-y-2">
                <li
                  onClick={() => navigate("/register/restaurant")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Partner With Us
                </li>
                <li
                  onClick={() => navigate("/restaurant-dashboard")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Restaurant Dashboard
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">For Riders</h4>
              <ul className=" space-y-2">
                <li
                  onClick={() => navigate("/register/rider")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Become a Rider
                </li>
                <li
                  onClick={() => navigate("/rider-dashboard")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Rider Dashboard
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">
                Feedback & Support
              </h4>
              <ul className=" space-y-2">
                <li
                  onClick={() => navigate("/feedback")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Submit Feedback
                </li>
                <li
                  onClick={() => navigate("/help-center")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Help Center
                </li>
                <li
                  onClick={() => navigate("/contact")}
                  className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                >
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
          <div className=" border-t border-(--color-neutral-content) my-8" />
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <p className=" text-sm  text-(--color-neutral-content) mb-4 md:mb-0">
              &copy; {currentYear} Cravings. All rights reserved.
            </p>
            <div className=" flex gap-6">
              <Link to={"/privacy-policy"}>
                <span className=" text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Privacy Policy
                </span>
              </Link>
              <Link to={"/terms-of-service"}>
                <span className=" text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Terms of Service
                </span>
              </Link>
              <Link to={"/site-map"}>
                <span className=" text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Site Map
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
