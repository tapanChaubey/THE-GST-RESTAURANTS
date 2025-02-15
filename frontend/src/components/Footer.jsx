import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full border-t py-12 px-6 md:px-20">
      {/* Footer Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-gray-900 text-center md:text-left">

        {/* About Section */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-gray-900">ABOUT THE GST</p>
          <Link className="hover:text-gray-700 transition-all duration-300">Blog</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Work With Us</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Investor Relations</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Contact Us</Link>
        </div>

        {/* Restaurants Section */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-gray-900">THE GST RESTAURANTS</p>
          <Link className="hover:text-gray-700 transition-all duration-300">The GST</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">District</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Village</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Champaran</Link>
        </div>

        {/* Learn More Section */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-gray-900">LEARN MORE</p>
          <Link className="hover:text-gray-700 transition-all duration-300">Privacy</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Security</Link>
          <Link className="hover:text-gray-700 transition-all duration-300">Terms</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <p className="text-lg font-bold text-gray-900">SOCIAL LINKS</p>
          <div className="flex gap-6 mt-2">
            <Link className="text-blue-500 hover:scale-110 transition-all duration-300">
              <FaLinkedin size={28} />
            </Link>
            <Link className="text-gray-700 hover:scale-110 transition-all duration-300">
              <FaGithub size={28} />
            </Link>
            <Link className="text-pink-500 hover:scale-110 transition-all duration-300">
              <IoLogoInstagram size={28} />
            </Link>
            <Link className="text-red-500 hover:scale-110 transition-all duration-300">
              <SiGmail size={28} />
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t pt-4">
        © {new Date().getFullYear()} GST Restaurants. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
