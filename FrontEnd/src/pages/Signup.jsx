import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import delivery from "../assets/delivery2.png";

function Signup() {
  const [userdata, setUserdata] = useState({});
  const [msg, setMsg] = useState("");

  function HandleFrom(e) {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:7777/signup", {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setMsg(data.msg);
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse w-full min-h-screen bg-gray-50 mb-1/2">
      {/* Signup Form (Top on Mobile, Right on Desktop) */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 w-full lg:w-1/2 flex-grow">
        <div className="w-full max-w-md bg-white border rounded-lg shadow-lg p-8 sm:p-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 whitespace-nowrap">
            Create Your Account
          </h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username*
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={HandleFrom}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={HandleFrom}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password*
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={HandleFrom}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white text-lg py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Google Signup Button */}
          <button className="w-full mt-5 bg-gray-100 py-3 rounded-lg font-semibold text-center border border-gray-300 cursor-pointer hover:bg-white hover:border-blue-400 transition">
            <FontAwesomeIcon className="mr-2" icon={faGoogle} /> Sign up with
            Google
          </button>
          {msg && (
            <p className="text-lg text-red-600 font-semibold text-center mt-4">
              {msg}
            </p>
          )}
        </div>
      </div>

      {/* Image Section (Bottom on Mobile, Left on Desktop) */}
      <div className="relative flex justify-end lg:justify-center items-center w-full lg:w-1/2 bg-blue-900 lg:h-auto">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <img
          className="w-full object-cover opacity-80 lg:max-h-[80vh] lg:w-5/6"
          src={delivery}
          alt="Food Delivery"
        />
        <h1 className="absolute bottom-5 sm:bottom-10 md:bottom-14 lg:bottom-16 text-center text-white font-bold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 sm:px-10 w-full">
          Order food. Discover best <br /> restaurants. The GST!
        </h1>
      </div>
    </div>
  );
}

export default Signup;
