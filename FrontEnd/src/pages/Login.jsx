import React, { useState } from 'react';
import delivery from '../assets/delivery1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const [userdata, setUserdata] = useState({});
  const [msg, setMsg] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:7777/login", {
      method: "post",
      body: JSON.stringify(userdata),
      headers: {
        'Content-Type': "application/json"
      },
    });
    const data = await response.json();
    setMsg(data.msg);
  }

  function HandlerFrom(e) {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
        {/* Left Section (Login Form) */}
        <div className="flex flex-col justify-center items-center bg-blue-900 py-6 px-4">
          <div className="w-full max-w-md bg-white border rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-center text-blue-900 mb-4 sm:mb-6">
              Login Your Account
            </h1>
            <form onSubmit={submitHandler} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={HandlerFrom}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password*</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={HandlerFrom}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white text-lg py-2 rounded-md font-medium hover:bg-blue-600 cursor-pointer"
              >
                Submit
              </button>
            </form>
            <button
              className="w-full mt-4 bg-gray-50 py-2 rounded font-semibold text-center border cursor-pointer hover:bg-white hover:border-blue-400"
            >
              <FontAwesomeIcon className="px-2" icon={faGoogle} /> Sign in with Google
            </button>
            {msg && <p className="text-lg text-orange-600 font-semibold text-center mt-3">{msg}</p>}
          </div>
        </div>

        {/* Right Section (Image and Text) */}
        <div className="relative flex justify-center items-center bg-blue-900">
          <img
            className="w-full h-full object-cover opacity-70"
            src={delivery}
            alt="Delivery Illustration"
          />
          <h1 className="absolute bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 text-center text-white font-bold leading-tight 
               text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 sm:px-8 w-full">
  Order food. Discover best <br /> restaurants. The GST!
</h1>


        </div>
      </div>
    </>
  );
}

export default Login;