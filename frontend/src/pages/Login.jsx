import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import delivery from "../assets/banner-mobile.png";
import { UserContext } from "../contexts/useUserContext";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";

const Login = () => {
  const { setAccessToken, setUserId } = useContext(UserContext);
  const api = useAPI();
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const { next } = useParams();

  const handleFormChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userdata.email && userdata.password) {
      const data = await api.post("login", userdata);
      if (data.token) {
        setAccessToken(data.token);
        setUserId(data.userId);
        navigation(next || "/");
      } else {
        setError(data.msg);
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen bg-gray-100  py-8 md:px-12 lg:px-20  items-stretch lg:items-center flex flex-col-reverse lg:flex-row">
      
      {/* Left Section - Image */}
      <div className="bg-white w-full flex flex-col items-center p-4 rounded-lg shadow-1xl h-full border border-gray-200">
        <div className="w-full flex justify-center items-center mb-6">
          <img
            src={delivery}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg shadow-lg border border-gray-300"
            alt="Login Banner"
          />
        </div>
        <div className="text-center w-full px-4 ">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 leading-snug">
            Order food. Discover best restaurants. <br />
            <span className="text-violet-900 italic font-black drop-shadow-lg">
              Chaubey Food Hub!
            </span>
          </h2>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center p-4 md:p-8 h-full">
        <div className="w-full max-w-md md:max-w-lg bg-white p-8 rounded-lg shadow-xl h-full flex flex-col justify-center">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-violet-900 text-center mb-6 leading-tight w-full max-w-max mx-auto whitespace-nowrap">
        Login to Your Account
      </h1>
      

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email*
              </label>
              <input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                value={userdata.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password*
              </label>
              <input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                value={userdata.password}
                onChange={handleFormChange}
                required
              />
            </div>

            <button className="w-full bg-violet-900 text-white font-semibold py-3 rounded-md hover:bg-violet-800 transition-transform hover:scale-105">
              Login
            </button>
          </form>

          <button className="w-full mt-5 flex items-center justify-center bg-white border border-gray-300 py-3 rounded-md font-semibold text-gray-700 shadow-md hover:border-violet-500 hover:shadow-lg transition-transform hover:scale-105">
            <FontAwesomeIcon className="mr-2 text-red-500" icon={faGoogle} />
            Sign in with Google
          </button>

          {msg && <p className="text-lg text-green-600 font-semibold text-center mt-4">{msg}</p>}
          {error && <p className="text-lg text-red-600 font-semibold text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
