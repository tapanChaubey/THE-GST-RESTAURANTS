import React from "react";
import banner from "../assets/banner-mobile.png";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

function Contact() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen bg-gray-50 px-4 py-8 md:px-12 lg:px-20 gap-8 items-stretch">
      {/* Left Section */}
      <div className="bg-white w-full flex flex-col items-center p-6 rounded-lg shadow-xl h-full">
        {/* Banner Image */}
        <div className="w-full flex justify-center items-center mb-6">
          <img
            src={banner}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-md shadow-md"
            alt="Contact Banner"
          />
        </div>

        {/* Social Media Links */}
        <div className="bg-violet-800 w-full flex flex-col items-center justify-center space-y-4 p-6 text-white rounded-lg shadow-md flex-grow">
          <h2 className="text-2xl font-semibold">Follow Me</h2>
          <div className="grid grid-cols-2 gap-6 md:flex md:gap-8">
            <Link
              to="https://www.linkedin.com/in/tapanchaubey/"
              className="flex flex-col items-center hover:text-gray-300 transition-transform hover:scale-110"
            >
              <FaLinkedin size={28} />
              <span className="text-sm mt-1">LinkedIn</span>
            </Link>
            <Link
              to="https://github.com/tapanChaubey"
              className="flex flex-col items-center hover:text-gray-300 transition-transform hover:scale-110"
            >
              <FaGithub size={28} />
              <span className="text-sm mt-1">GitHub</span>
            </Link>
            <Link
              to="https://www.instagram.com/tapankumar4702/?hl=en"
              className="flex flex-col items-center hover:text-gray-300 transition-transform hover:scale-110"
            >
              <IoLogoInstagram size={28} />
              <span className="text-sm mt-1">Instagram</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center hover:text-gray-300 transition-transform hover:scale-110"
            >
              <SiGmail size={28} />
              <span className="https://www.linkedin.com/in/tapanchaubey/">Gmail</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="flex items-center justify-center p-4 md:p-8 h-full">
        <div className="w-full max-w-md md:max-w-lg bg-white p-8 rounded-lg shadow-xl h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-violet-900 text-center mb-6">
            Get in Touch
          </h1>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name*
              </label>
              <input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                name="name"
                type="text"
                placeholder="Enter your name"
                id="name"
                required
              />
            </div>

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
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Phone
              </label>
              <input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                id="phone"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Message*
              </label>
              <textarea
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="Enter your message"
                name="message"
                id="message"
                rows="4"
                required
              ></textarea>
            </div>

            <button className="w-full bg-violet-900 text-white font-semibold py-3 rounded-md hover:bg-violet-800 transition-transform hover:scale-105">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
