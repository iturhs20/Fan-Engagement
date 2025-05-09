import React from 'react';
import { Search, Mail, Bell, ChevronDown } from 'lucide-react';

const TopNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full bg-gray-900 text-white px-4 py-3">
      
      {/* Hamburger Menu for mobile - optional */}
      <button className="lg:hidden text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 mx-6 max-w-2xl relative">
        <input 
          type="text" 
          placeholder="Search products" 
          className="bg-gray-800 text-gray-200 w-full py-2 px-4 rounded-md pl-10"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
      </div>
      
      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <button className="text-gray-300 hover:text-white">
          <Mail className="w-5 h-5" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-600 overflow-hidden">
            <img src="/image.png" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="hidden md:inline text-sm font-medium">Henry Klein</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;