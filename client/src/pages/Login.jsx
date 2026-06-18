import React, { useState } from "react";
import Deliveryboy from "../assets/deliberyboy.png";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [vaildateErrror, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    console.log("Login Data Submitted " ,loginData);

    const payload = {
      email:loginData.email.toLowerCase(),
      password:loginData.password,
    }
  }

  return (
    <>
      <div className=" h-[91.8vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 gap-20 items-center">
        <div className=" hidden md:block">
          <img src={Deliveryboy} alt="image" className=" rotate-y-180" />
        </div>

        <div className=" w-md h-90 bg-(--background) rounded shadow p-10 flex flex-col justify-center">
          <div className=" font-bold text-4xl text-center mb-5">
            Welcome Back!
          </div>

          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange}
                className=" border p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-(--accent)"
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
                className=" border p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-(--accent)"
              />
            </div>

            <button
              type="submit"
              className="w-92 mt-6 bg-(--primary) text-white font-semibold py-2 px-4 rounded-xl hover:bg-(--success)"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
