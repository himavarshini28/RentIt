import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-xl rounded-2xl w-[95%] max-w-7xl transition-all duration-300 ">
      <div className="px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-cyan-600">
          RentIt
        </Link>

        <div className="hidden sm:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</Link>
          <Link to="/property" className="text-gray-700 hover:text-blue-600 transition font-medium">Properties</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">Contact</Link>
          <Link to="/login" className="text-cyan-600 hover:text-cyan-800 font-medium transition">Login</Link>
          <Link
            to="/signup"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm"
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-6 pb-4">
          <div className="space-y-3 mt-2">
            <Link to="/" className="block text-gray-700 hover:text-cyan-600 transition font-medium">Home</Link>
            <Link to="/properties" className="block text-gray-700 hover:text-cyan-600 transition font-medium">Properties</Link>
            <Link to="/about" className="block text-gray-700 hover:text-cyan-600 transition font-medium">About</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-cyan-600 transition font-medium">Contact</Link>
            <Link to="/login" className="block text-cyan-600 hover:text-cyan-800 font-medium transition">Login</Link>
            <Link
              to="/signup"
              className="block bg-cyan-600 hover:bg-cyan-700 text-white text-center py-2 rounded-md font-medium transition duration-200 shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
