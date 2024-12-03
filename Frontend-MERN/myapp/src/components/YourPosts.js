import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const YourPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = jwtDecode(sessionStorage.getItem('token')).id;

    axios
      .get(`http://127.0.0.1:5000/api/posts?userId=${userId}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg dark:shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6 sm:text-3xl">My Posts</h2>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-xl text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">No posts available.</p>
      )}
    </div>
  );
};

export default YourPosts;
