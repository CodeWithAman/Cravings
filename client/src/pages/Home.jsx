import React from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import herobgImg from "../assets/hero-bg.jpg";
import cardImg_1 from "../assets/restaurant-Image-1.avif";
import cardImg_2 from "../assets/restaurant-Image-2.webp";
import cardImg_3 from "../assets/restaurant-Image-3.webp";
import cardImg_4 from "../assets/restaurant-Image-4.jpg";

const Home = () => {
  return (
    <>
      <div className=" min-h-screen">
        <section className=" relative text-(--color-primary-content) py-16 md:py-40 overflow-hidden">
          <div className=" absolute inset-0 z-0">
            <div className=" relative w-full h-full overflow-hidden">
              <div className=" absolute inset-0 transition-opacity">
                <img
                  src={herobgImg}
                  alt="slide 1"
                  className=" w-full h-full object-cover"
                />
              </div>
              <div></div>
              <div></div>
              <div></div>
              <buttoon></buttoon>
              <buttoon></buttoon>
              <div></div>
            </div>
          </div>
          <div className=" absolute inset-0 bg-black/40 z-10" />
          <div className=" relative z-20  max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" text-center mb-8">
              <h1 className=" text-4xl md:text-5xl font-bold mb-4">
                Your Favorite Food,
                <br />
                Delivered Fast
              </h1>
              <p className=" text-lg md:text-xl opacity-90 mb-8">
                Order from thousands of restaurants and get it delivered to your
                doorstep
              </p>
              <div className=" flex gap-4 justify-center">
                <button className=" bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  <Link to={"/register"}>Sign Up</Link>
                </button>
                <button className=" bg-(--color-base-100) text-(--color-base-content) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition">
                  <Link to={"/order-now"}>Order Now</Link>
                </button>
              </div>
            </div>
            <div className=" flex items-center bg-(--color-base-100) rounded-lg px-4 py-3 max-w-4xl mx-auto">
              <IoSearch className=" text-(--color-base-content) text-xl mr-3" />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className=" bg-(--color-base-100) w-full outline-none text-(--color-primary)"
              />
            </div>
          </div>
        </section>

        <section className=" py-4 md:py-8 bg-linear-to-b from-(--color-primary) to-(--color-primary-content)">
          <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-8">
              <h2 className=" text-2xl md:text-3xl font-bold text-(--color-primary-content) mb-2">
                Featured Restaurants
              </h2>
              <p className=" text-(--color-primary-content)/70">
                3 restaurant available
              </p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className=" flex flex-col bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105">
                <div className=" relative h-48 overflow-hidden bg-(--color-base-200)">
                  <img
                    src={cardImg_1}
                    alt="Under The Mango Tree"
                    className=" w-full h-full object-cover"
                  />
                  <div className=" absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex  items-center gap-1 font-semibold text-sm">
                    <IoIosStar />
                    3.6
                  </div>
                </div>
                <div className=" flex flex-col p-4">
                  <h3 className=" font-bold text-(--color-content) text-lg mb-1">
                    Under The Mango Tree
                  </h3>
                  <p className=" text-(--color-base-content) text-sm mb-3">
                    Enjoy the thrill of grill and barbecue at Under The Mango
                    Tree restaurant at Jehan Numa Palace, Bhopal. Head here now!
                  </p>
                  <div className=" flex flex-wrap gap-2 mb-3">
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      indian
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      chineese
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      ittalian
                    </span>
                  </div>
                  <div className=" mt-auto pt-3 border-t border-(--color-base-200)">
                    <button className=" w-full bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                      <Link to={"restaurant-menu"}>Explore Menu</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105">
                <div className=" relative h-48 overflow-hidden bg-(--color-base-200)">
                  <img
                    src={cardImg_2}
                    alt="Raj Darbar"
                    className=" w-full h-full object-cover"
                  />
                  <div className=" absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex  items-center gap-1 font-semibold text-sm">
                    <IoIosStar />
                    4.8
                  </div>
                </div>
                <div className=" flex flex-col p-4">
                  <h3 className=" font-bold text-(--color-content) text-lg mb-1">
                    Raj Darbar
                  </h3>
                  <p className=" text-(--color-base-content) text-sm mb-3">
                    Raj Darbar is a one-of-a-kind Indian restaurant that offers
                    a unique dining experience for families and friends with a
                    dhaba-style theme.
                  </p>
                  <div className=" flex flex-wrap gap-2 mb-3">
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      indian
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      chineese
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      ittalian
                    </span>
                  </div>
                  <div className=" mt-auto pt-3 border-t border-(--color-base-200)">
                    <button className=" w-full bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                      <Link to={"restaurant-menu"}>Explore Menu</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105">
                <div className=" relative h-48 overflow-hidden bg-(--color-base-200)">
                  <img
                    src={cardImg_3}
                    alt="Countryside Culture"
                    className=" w-full h-full object-cover"
                  />
                  <div className=" absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex  items-center gap-1 font-semibold text-sm">
                    <IoIosStar />
                    4.1
                  </div>
                </div>
                <div className=" flex flex-col p-4">
                  <h3 className=" font-bold text-(--color-content) text-lg mb-1">
                    Countryside Culture
                  </h3>
                  <p className=" text-(--color-base-content) text-sm mb-3">
                    A hidden gem away from the city, offering lush green meadows
                    and peaceful walking paths for relaxation
                  </p>
                  <div className=" flex flex-wrap gap-2 mb-3">
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      indian
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      chineese
                    </span>
                  </div>
                  <div className=" mt-auto pt-3 border-t border-(--color-base-200)">
                    <button className=" w-full bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                      <Link to={"restaurant-menu"}>Explore Menu</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105">
                <div className=" relative h-48 overflow-hidden bg-(--color-base-200)">
                  <img
                    src={cardImg_4}
                    alt="Sharma & Vishnu Fast Food"
                    className=" w-full h-full object-cover"
                  />
                  <div className=" absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex  items-center gap-1 font-semibold text-sm">
                    <IoIosStar />
                    3.9
                  </div>
                </div>
                <div className=" flex flex-col p-4">
                  <h3 className=" font-bold text-(--color-content) text-lg mb-1">
                    Sharma & Vishnu Fast Food
                  </h3>
                  <p className=" text-(--color-base-content) text-sm mb-3">
                    It is highly famous among locals for its massive South
                    Indian dosas, sizzling Chinese starters, and signature thick
                    cold coffee.
                  </p>
                  <div className=" flex flex-wrap gap-2 mb-3">
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      indian
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      chineese
                    </span>
                    <span className=" text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize">
                      south indian
                    </span>
                  </div>
                  <div className=" mt-auto pt-3 border-t border-(--color-base-200)">
                    <button className=" w-full bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                      <Link to={"restaurant-menu"}>Explore Menu</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" bg-(--color-base-100) py-12 md:py-16">
          <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" text-center mb-12">
              <h2 className=" text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
                Cravings by the Numbers
              </h2>
              <p className=" text-lg text-(--color-base-content)">
                See why millions trust us for their daily food delivery needs
              </p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className=" bg-white rounded-lg p-8  shadow-md hover:shadow-lg transition text-center">
                <div className=" mb-4">
                  <div className=" text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                    2.5M+
                  </div>
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Successful Deliveries
                </h3>
                <p className=" text-(--color-base-content)">
                  Orders delivered with care and precision
                </p>
              </div>
              <div className=" bg-white rounded-lg p-8  shadow-md hover:shadow-lg transition text-center">
                <div className=" mb-4">
                  <div className=" text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                    500K+
                  </div>
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Happy Customers
                </h3>
                <p className=" text-(--color-base-content)">
                  Satisfied users enjoying delicious food
                </p>
              </div>
              <div className=" bg-white rounded-lg p-8  shadow-md hover:shadow-lg transition text-center">
                <div className=" mb-4">
                  <div className=" text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                    5K+
                  </div>
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Partner Restaurants
                </h3>
                <p className=" text-(--color-base-content)">
                  Restaurants serving amazing cuisine
                </p>
              </div>
              <div className=" bg-white rounded-lg p-8  shadow-md hover:shadow-lg transition text-center">
                <div className=" mb-4">
                  <div className=" text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                    1K+
                  </div>
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Active Delivery Partners
                </h3>
                <p className=" text-(--color-base-content)">
                  Riders ensuring quick and safe delivery
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className=" bg-white py-12 md:py-16">
          <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" text-center mb-12">
              <h2 className=" text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
                What Our Customers Say
              </h2>
              <p className=" text-lg text-(--color-base-content)">
                Real feedback from real food lovers
              </p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className=" bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4 text-xl">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Amazing Service!
                </h3>
                <p className=" text-(--color-base-content) mb-4">
                  "The food arrived hot and fresh. The delivery was incredibly
                  fast. Highly impressed with Cravings' service!"
                </p>
                <div className=" flex items-center gap-3">
                  <div className=" w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                    AJ
                  </div>
                  <div>
                    <p className=" font-semibold text-(--color-content)">
                      Arun J.
                    </p>
                    <p className=" text-sm text-(--color base-content">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4 text-xl">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Best App Ever!
                </h3>
                <p className=" text-(--color-base-content) mb-4">
                  "Easy to use interface, wide variety of restaurants, and quick
                  delivery. I order from Cravings every week!"
                </p>
                <div className=" flex items-center gap-3">
                  <div className=" w-12 h-12 rounded-full bg-(--color-accent) flex items-center justify-center text-white font-bold">
                    SP
                  </div>
                  <div>
                    <p className=" font-semibold text-(--color-content)">
                      Sneha P.
                    </p>
                    <p className=" text-sm text-(--color base-content">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4 text-xl">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <h3 className=" text-lg font-semibold text-(--color-content) mb-2">
                  Excellent Choices
                </h3>
                <p className=" text-(--color-base-content) mb-4">
                  "Love the variety of restaurants available. Found my new
                  favorite spot through Cravings. Definitely worth it!"
                </p>
                <div className=" flex items-center gap-3">
                  <div className=" w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div>
                    <p className=" font-semibold text-(--color-content)">
                      Raj Kumar
                    </p>
                    <p className=" text-sm text-(--color base-content">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" bg-(--color-primary) text-(--color-primary-content) py-12 md:py-16">
          <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className=" text-3xl md:text-4xl font-bold mb-4">
              Become a Restaurant Partner
            </h2>
            <p className=" text-lg opacity-90 mb-8">
              Grow your business with Cravings. Join thousands of restaurants
              already delivering with us.
            </p>
            <button className=" bg-(--color-base-100) text-(--color-primary) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition">
              <Link to={"/register"}>Partner With Us</Link>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
