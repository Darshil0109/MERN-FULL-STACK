import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching check
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password validation check
    else if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character."
      );
      return;
    }

    try {
      // Send registration request using axios
      const response = await axios.post('http://127.0.0.1:5000/auth/register/', { name, email, password });

      // Assuming response includes token and user data
      const { token, user } = response.data;
      
      // Store the token in session storage
      sessionStorage.setItem('token', token);

      // Success message
      setMessage(`Welcome, ${user.username}!`);
      setError(''); // Clear any previous error message
      navigate('/dashboard');

    } catch (error) {
      setMessage(''); // Clear previous success message if any
      
      // Handle HTTP errors without exposing details
      if (error.response) {
        setError(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i
              onClick={() => setPasswordVisible(!passwordVisible)}
              className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} text-gray-500 hover:text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
            ></i>
          </div>
          <div className="space-y-2 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password:</label>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} text-gray-500 hover:text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
            ></i>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
            <p className="text-sm">
              Already a member?{" "}
              <Link
                to="/login"  
                className="text-indigo-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
