import React from 'react';

const UserStats = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6 sm:text-3xl">User Stats</h2>

      {/* Posts and Comments Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Posts Uploaded</h3>
          <p className="text-2xl text-gray-900 dark:text-gray-100 mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Comments Made</h3>
          <p className="text-2xl text-gray-900 dark:text-gray-100 mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Comments History</h3>
          <ul className="mt-2">
            <li className="text-sm text-gray-600 dark:text-gray-300">No comments made yet.</li>
          </ul>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Activity History</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          (No activity recorded yet.)
        </p>
      </div>
    </div>
  );
};

export default UserStats;
