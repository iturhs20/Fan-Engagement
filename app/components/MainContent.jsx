import React from 'react';

const MainContent = () => {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      {/* Main content */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        Welcome to your Faniverse dashboard. Access all your tools and analytics from this central hub.
      </p>
    </div>
  );
};

export default MainContent;