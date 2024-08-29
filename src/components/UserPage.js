
import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-blue-600 mt-6 text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-6 text-lg font-medium">Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Directory</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 border border-gray-200"
          >
            <div className="flex-shrink-0 h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-blue-700">
              {user.id}
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>

  );
};

export default UserPage;
