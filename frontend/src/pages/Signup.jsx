import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import delivery from "../assets/delivery2.png";
import useAPI from "../hooks/useAPI";

function Signup() {
  const api = useAPI();
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
    const data = await api.post("signup", userdata);
    setMsg(data.msg);
    console.log(data);
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 ">
      {/* Signup Form Section */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 w-full lg:w-1/2 mt-3">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6 mt-6 sm:mt-0 whitespace-nowrap">
        Create Your Account
      </h1>
          <form onSubmit={submitHandler} className="space-y-5">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Google Signup Button */}
          <button className="w-full mt-5 flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 shadow-md hover:border-blue-500 hover:shadow-lg transition-all">
            <FontAwesomeIcon className="mr-2 text-red-500" icon={faGoogle} />
            Sign up with Google
          </button>

          {msg && (
            <p className="text-lg text-red-600 font-semibold text-center mt-4">
              {msg}
            </p>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex justify-center items-center w-full lg:w-1/2 bg-blue-900 lg:h-auto">
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        <img
          className="w-full object-cover opacity-90 lg:max-h-[80vh] lg:w-5/6 rounded-lg"
          src={delivery}
          alt="Food Delivery"
        />
        <h1 className="absolute bottom-6 sm:bottom-10 md:bottom-14 lg:bottom-16 text-center text-white font-bold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 sm:px-10 w-full">
          Order food. Discover best <br /> restaurants. <i>Chaubey Food!</i>
        </h1>
      </div>
    </div>
  );
}

export default Signup;
