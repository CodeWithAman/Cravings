import React from "react";
import { Link } from "react-router-dom";
import FoodBg from "../assets/food-bg.jpg";
import HeroFood from "../assets/food.webp";
import CheeseBurger from "../assets/cheeseburger.png";
import ItalianPizza from "../assets/ItalianPizza.png";
import ChickenBiryani from "../assets/ChickenBiryani.png";
import Pasta from "../assets/Pasta.png";

const categories = [
  { icon: "🍕", title: "Pizza" },
  { icon: "🍔", title: "Burger" },
  { icon: "🍜", title: "Noodles" },
  { icon: "🍰", title: "Dessert" },
];

const foods = [
  { name: "Cheese Burger", price: "₹199", img: CheeseBurger },
  { name: "Italian Pizza", price: "₹349", img: ItalianPizza },
  { name: "Chicken Biryani", price: "₹249", img: ChickenBiryani },
  { name: "Pasta", price: "₹229", img: Pasta },
];

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${FoodBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto min-h-screen px-6 sm:px-8 grid md:grid-cols-2 items-center gap-8 pt-24 pb-12">
          {/* Left Text */}
          <div className="text-white page-enter">
            <span className="inline-block btn-shimmer px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
              Fast Delivery 🚚
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
              Delicious Food 
              <br />
              Delivered
              <br />
              <span className="text-orange-400">To Your Door</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-xl">
              Enjoy fresh meals from your favourite restaurants with lightning
              fast delivery and amazing offers every day.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/"
                className="btn-shimmer px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 hover:opacity-90 duration-300 text-sm sm:text-base"
              >
                Order Now →
              </Link>

              <Link
                to="/contact-us"
                className="border border-white px-8 py-3 rounded-xl text-white hover:bg-white hover:text-black duration-300 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "200+", label: "Restaurants" },
                { value: "30min", label: "Avg Delivery" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-orange-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-center right-enter">
            <img
              src={HeroFood}
              alt="Food"
              className="w-80 lg:w-96 drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            ["⚡", "Fast Delivery", "Order in minutes"],
            ["🍴", "Fresh Food", "Always hot & fresh"],
            ["⭐", "Top Rated", "5 star experience"],
            ["🎁", "Best Offers", "Deals every day"],
          ].map(([icon, title, sub]) => (
            <div
              key={title}
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 text-center hover:-translate-y-2 duration-300"
            >
              <div className="text-4xl sm:text-5xl">{icon}</div>
              <h3 className="font-bold text-base sm:text-xl mt-4">{title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Categories ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-12 sm:pb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10">
          Popular <span className="text-orange-500">Categories</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c) => (
            <div
              key={c.title}
              className="bg-linear-to-br from-orange-400 to-red-500 rounded-3xl p-6 sm:p-8 text-center text-white hover:scale-105 duration-300 cursor-pointer"
            >
              <div className="text-5xl sm:text-6xl">{c.icon}</div>
              <p className="mt-4 font-bold text-lg sm:text-xl">{c.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-12 sm:pb-16">
        <div className="rounded-3xl bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              ⏰ Limited Time Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Get 50% OFF
            </h2>
            <p className="mt-2 text-white/80 text-sm sm:text-base">
              On your first order. Don't miss out!
            </p>
          </div>

          <Link
            to="/"
            className="bg-white text-red-500 font-bold px-8 py-3 rounded-xl hover:scale-105 duration-300 whitespace-nowrap text-sm sm:text-base"
          >
            Order Now →
          </Link>
        </div>
      </section>

      {/* ── Popular Dishes ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10">
          Popular <span className="text-orange-500">Dishes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {foods.map((food) => (
            <div
              key={food.name}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={food.img}
                  alt={food.name}
                  className="h-48 sm:h-56 w-full object-cover group-hover:scale-105 duration-300"
                />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg sm:text-xl">{food.name}</h3>
                <p className="text-gray-400 text-xs mt-1">Fresh & delicious</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-extrabold text-orange-500 text-lg">
                    {food.price}
                  </span>

                  <button className="btn-shimmer text-white px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 duration-300">
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
