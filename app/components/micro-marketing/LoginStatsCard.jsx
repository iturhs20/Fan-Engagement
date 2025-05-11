import React from 'react';

const LoginStatsCard = ({ data }) => {
  // Count total Login_ID entries (not unique), excluding null/undefined/empty
  const totalLogins = data.filter(item => item.Login_ID).length;

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Login Statistics</h3>

      <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500 ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Logins</p>
            <p className="text-white text-3xl font-bold mt-2">{totalLogins}</p>
          </div>
          <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Total Login Records from filtered data
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginStatsCard;
