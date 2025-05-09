import React from 'react';

const MainContent = () => {
  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      {/* Welcome Banner */}
      <div className="bg-[#B51661] rounded-lg p-6 mb-6 flex items-center">
        <div className="mr-4">
          <img 
            src="/group.png" 
            alt="Faniverse Logo" 
            className="w-32 h-16"
          />
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-bold">Welcome to Faniverse</h2>
          <p className="mt-1">
            At FANIVERSE, we envision a world where sports transcend boundaries, uniting fans from diverse backgrounds to celebrate their shared love for the game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;