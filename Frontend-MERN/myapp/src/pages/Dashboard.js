import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import YourPosts from '../components/YourPosts';
import Explore from '../components/Explore';
import UserStats from '../components/UserStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      setLoading(false);  // If token exists, allow rendering the dashboard
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />
      <div className="flex-1 p-4 sm:p-8 bg-gray-100 dark:bg-black">
        <Routes>
          <Route path="" element={<UserStats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="posts" element={<YourPosts />} />
          <Route path="explore" element={<Explore />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
