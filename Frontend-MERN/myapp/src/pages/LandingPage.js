import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-opacity-70 bg-black">
        <h1 className="text-3xl font-bold">OPAL</h1>
        <div>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="ml-4 px-4 py-2 text-sm font-medium text-purple-700 bg-white rounded-md hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col-reverse lg:flex-row items-center justify-between p-6 lg:p-16">
        {/* Left Side: Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl lg:text-6xl font-extrabold leading-snug">
            Connect. Share. Inspire.  
            <span className="block text-yellow-300">Your Social Media World.</span>
          </h2>
          <p className="text-lg lg:text-xl font-light text-gray-200">
            Join OPAL and take your social media experience to the next level.  
            A platform designed to connect and inspire.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 text-lg font-semibold text-purple-700 bg-white rounded-md shadow-md hover:bg-gray-200"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 text-lg font-semibold text-white border-2 border-white rounded-md hover:bg-white hover:text-purple-700"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Social Media"
            className="rounded-lg shadow-lg w-80 h-80 object-cover lg:w-96 lg:h-96"
          />
        </div>
      </header>

        
      {/* Features Section */}
      <section className="py-12 px-6 lg:px-16 bg-white text-gray-800">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-purple-700 mb-12">
          Why OPAL?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <i className="fas fa-users text-4xl text-purple-700 mb-4"></i>
            <h3 className="text-xl font-semibold">Connect with Friends</h3>
            <p className="text-gray-600">
              Easily find and connect with people who matter to you.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <i className="fas fa-share-alt text-4xl text-purple-700 mb-4"></i>
            <h3 className="text-xl font-semibold">Share Your Stories</h3>
            <p className="text-gray-600">
              Post updates, share photos, and express yourself.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <i className="fas fa-lock text-4xl text-purple-700 mb-4"></i>
            <h3 className="text-xl font-semibold">Privacy First</h3>
            <p className="text-gray-600">
              We prioritize your privacy and data security.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} OPAL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
