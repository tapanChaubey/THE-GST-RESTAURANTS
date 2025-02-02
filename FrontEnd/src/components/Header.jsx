import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars } from '@fortawesome/free-solid-svg-icons';  // Added faBars for hamburger menu
import logo from '../assets/logo.jpg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='flex items-center justify-between bg-[#EAE5D9] text-[#392E2D] font-medium text-3xl backdrop-blur-xl w-full border py-4 sticky top-0 z-10 px-6 sm:px-9 md:px-12'>
      <div className='flex items-center'>
        <Link to="/" className="text-lg cursor-pointer font-medium px-2">
          <img src={logo} alt="Logo" className="h-14 w-14 object-cover rounded-full" />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className='sm:hidden flex items-center'>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='text-3xl'>
          <FontAwesomeIcon icon={faBars} /> {/* Hamburger icon */}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className='hidden sm:flex items-center space-x-6'>
        <Link className='text-lg cursor-pointer font-medium px-2 hover:text-[#FF6F61] transition duration-300'>Food</Link>
        <Link className='text-lg cursor-pointer font-medium px-2 hover:text-[#FF6F61] transition duration-300'>Contact US</Link>
        <Link to="/addcard/" className='text-lg cursor-pointer font-medium px-1 hover:text-[#FF6F61] transition duration-300'>
          <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
        </Link>
        <Link to="/signup" className='text-lg cursor-pointer font-medium px-2 hover:text-[#FF6F61] transition duration-300'>Sign up</Link>
        <Link to="/login" className='text-lg cursor-pointer font-medium px-2 hover:text-[#FF6F61] transition duration-300'>Login</Link>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className='sm:hidden absolute top-16 right-6 bg-[#EAE5D9] text-[#392E2D] font-medium py-4 px-6 w-64 rounded-md shadow-lg'>
          <Link to="/" className='block py-2 hover:text-[#FF6F61]'>Home</Link>
          <Link className='block py-2 hover:text-[#FF6F61]'>Food</Link>
          <Link className='block py-2 hover:text-[#FF6F61]'>Contact US</Link>
          <Link to="/addcard" className='block py-2 hover:text-[#FF6F61]'>
            <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
          </Link>
          <Link to="/signup" className='block py-2 hover:text-[#FF6F61]'>Sign up</Link>
          <Link to="/login" className='block py-2 hover:text-[#FF6F61]'>Login</Link>
        </div>
      )}
    </div>
  )
}

export default Header;
