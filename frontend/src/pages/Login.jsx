import React, { useContext, useState } from "react";
import delivery from "../assets/delivery1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../contexts/useUserContext";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";

function Login() {
  const { setAccessToken, setUserId } = useContext(UserContext);
  const api = useAPI();
  const [userdata, setUserdata] = useState({});
  const [msg, setMsg] = useState("");
  const navigation = useNavigate();
  const { next } = useParams();

  async function submitHandler(e) {
    e.preventDefault();
    const data = await api.post("login", userdata);
    if (data.token) {
      setAccessToken(data.token);
      setUserId(data.userId);
      navigation(next || "/");
    } else {
      setMsg(data.msg);
    }
  }

  function HandlerFrom(e) {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
      {/* Left Section - Login Form */}
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 to-blue-700 py-6 px-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-blue-900 mb-6 whitespace-nowrap overflow-hidden">
  Login to Your Account
</h1>

      
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={HandlerFrom}
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
                onChange={HandlerFrom}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Google Login */}
          <button className="w-full mt-5 flex items-center justify-center bg-gray-50 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 shadow-md hover:border-blue-500 hover:shadow-lg transition-all">
            <FontAwesomeIcon className="mr-2 text-red-500" icon={faGoogle} />
            Sign in with Google
          </button>

          {/* Error Message */}
          {msg && <p className="text-lg text-red-600 font-semibold text-center mt-4">{msg}</p>}
        </div>
      </div>

      {/* Right Section - Image with Text */}
      <div className="relative flex justify-center items-center bg-blue-900">
        <img
          className="w-full h-full object-cover opacity-75"
          src={delivery}
          alt="Food Delivery"
        />
        <h1 className="absolute bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 text-center text-white font-bold leading-tight 
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 sm:px-8 w-full whitespace-normal">
  Order food. Discover best restaurants. <i>Chaubey Food Hub!</i>
</h1>

      </div>
    </div>
  );
}

export default Login;
