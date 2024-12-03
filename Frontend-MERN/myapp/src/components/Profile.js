import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      axios
        .get(`http://127.0.0.1:5000/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
          setError(null);
        })
        .catch(() => {
          setError('Failed to fetch user data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear session storage token
    navigate('/'); // Navigate to login page after logout
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg dark:shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6 sm:text-3xl">
        Profile
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        user ? (
          <div className="flex flex-col items-center mb-6">
            <img
              src={`http://127.0.0.1:5000/uploads/${user.profilePicture || 'default.webp'}`}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover cursor-pointer"
              onClick={handleOpenModal} // Open modal when profile picture is clicked
            />
            <strong className="block text-lg font-semibold text-gray-800 dark:text-white sm:text-xl mt-4">{user.username}</strong>
            <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">{user.email}</p>
            <p className="text-lg sm:text-xl">{user.bio || 'No bio provided.'}</p>
          </div>
        ) : (
          <p className="text-center">No user data available.</p>
        )
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-transparent p-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
            {/* Image Wrapper */}
            <div className="relative">
              {/* Cross Icon */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white text-3xl z-10"
              >
                &times;
              </button>

              {/* Image */}
              <img
                src={`http://127.0.0.1:5000/uploads/${user.profilePicture || 'default.webp'}`}
                alt="Profile Modal"
                className="w-full h-auto object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
