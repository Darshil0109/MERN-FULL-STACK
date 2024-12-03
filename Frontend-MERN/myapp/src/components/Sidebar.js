import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Retrieve the token from sessionStorage
  const token = sessionStorage.getItem('token');


  // Check localStorage for theme preference on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  useEffect(() => {
    if (token) {
      try {
        // Decode the token to get user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch user data using the decoded user ID
        axios
          .get(`http://127.0.0.1:5000/api/users/${userId}`)
          .then((response) => {
            setUser(response.data);  // Set the user data (including profile info)
            setError(null);  // Reset any previous errors
          })
          .catch(() => {
            setError('Failed to fetch user data.');
          });
      } catch (err) {
        setError('Invalid token.');
      }
    } else {
      setError('No token found. Please log in.');
    }
  }, [token]); // Only run effect when token changes

  if (!token) {
    // If no token is found, show login prompt or redirect
    return (
      <div className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-screen flex flex-col">
        <div className="flex-grow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">OPAL</h2>
            <ul>
              <li>
                <Link to="/dashboard/profile" className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/settings" className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/posts" className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Your Posts
                </Link>
              </li>
              <li>
                <Link to="/dashboard/explore" className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Explore
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 mt-auto bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-center">
          <p>User profile not found. Please log in.</p>
        </div>
      </div>
    );
  }

  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-xl p-2 z-50 absolute right-6 top-4"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times': 'fa-bars'}  text-gray-800 dark:text-white`}></i>
      </button>
      <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-screen transition-transform duration-300 flex flex-col z-10 absolute lg:static`}>
        <div className="flex-grow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">OPAL</h2>
            <ul>
              <li>
                <Link to="/dashboard/" onClick={isSidebarOpen? toggleSidebar : ''} className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/settings" onClick={isSidebarOpen? toggleSidebar : ''} className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/posts" onClick={isSidebarOpen? toggleSidebar : ''} className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Your Posts
                </Link>
              </li>
              <li>
                <Link to="/dashboard/explore" onClick={isSidebarOpen? toggleSidebar : ''} className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  Explore
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Show Error Message if there's an error */}
        {error && (
          <div className="p-4 mt-auto bg-red-600 dark:bg-red-700 text-white text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Profile Section moved to bottom */}
        <div className="p-4 mt-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-start space-x-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-xl">
          {user ? (
            <>
              <img
                src={`http://127.0.0.1:5000/uploads/${user.profilePicture || "default.webp"}`} // Use default if no profile picture exists
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.username}</span>
                <Link to="/dashboard/profile" onClick={isSidebarOpen? toggleSidebar : ''} className="text-xs text-gray-400 dark:text-gray-500 hover:underline">
                  View Profile
                </Link>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
  