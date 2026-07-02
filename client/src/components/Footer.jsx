import React from "react";
import { Link } from "react-router-dom";
import cravingLogo from "../assets/circleLogo.png";

const Footer = () => {
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
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={"/about"}>About</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={"/order-now"}>Order Now</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">For Restaurants</h4>
              <ul className=" space-y-2">
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/register/restaurant'}>Partner With Us</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/restaurant-dashboard'}>Restaurant Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">For Riders</h4>
              <ul className=" space-y-2">
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/register/rider'}>Become a Rider</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/rider-dashboard'}>Rider Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-lg font-semibold mb-4">
                Feedback & Support
              </h4>
              <ul className=" space-y-2">
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/feedback'}>Submit Feedback</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/help-center'}>Help Center</Link>
                </li>
                <li className=" text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  <Link to={'/contact-Us'}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className=" border-t border-(--color-neutral-content) my-8" />
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <p className=" text-sm  text-(--color-neutral-content) mb-4 md:mb-0">
              © 2026 Cravings. All rights reserved.
            </p>
            <div className=" flex gap-6">
              <Link to={'/privacy-policy'}>
                <span className=" text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Privacy Policy
                </span>
              </Link>
              <Link to={'/terms-of-service'}>
                <span className=" text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Terms of Service
                </span>
              </Link>
              <Link to={'/site-map'}>
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
