import React, { useState, useEffect } from 'react';
import { MoreVertical, ThumbsUp, MessageSquare, BarChart2, 
  ShoppingBag, Users, Award, PieChart, Menu, X } from 'lucide-react';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems = [
    { icon: <PieChart className="w-5 h-5 text-purple-500" />, label: 'Awareness', active: true },
    { icon: <ThumbsUp className="w-5 h-5 text-yellow-500" />, label: 'On Boarding' },
    { icon: <MessageSquare className="w-5 h-5 text-red-500" />, label: 'Engagement' },
    { icon: <BarChart2 className="w-5 h-5 text-blue-500" />, label: 'Conversion' },
    { icon: <ShoppingBag className="w-5 h-5 text-green-500" />, label: 'Micro Market Strategy' },
    { icon: <Users className="w-5 h-5 text-indigo-500" />, label: 'Management Analysis' },
    { icon: <Award className="w-5 h-5 text-yellow-400" />, label: 'Contest' },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Mobile toggle button that stays fixed on screen
  const MobileToggle = () => (
    <button 
      onClick={toggleSidebar}
      className="md:hidden fixed z-20 bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  // Overlay for mobile when sidebar is open
  const Overlay = () => (
    isMobile && isOpen ? (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={() => setIsOpen(false)}
      />
    ) : null
  );

  return (
    <>
      <Overlay />
      <MobileToggle />
      
      <div 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-20 bg-gray-900 text-gray-400 h-screen flex flex-col transition-transform duration-300 ease-in-out ${
          isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="text-2xl font-bold tracking-wider text-white">FANIVERSE</div>
        </div>
        
        {/* User Profile */}
        <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
          <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden relative">
            <img src="/image.png" alt="User" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">Henry Klein</div>
            <div className="text-sm text-gray-500">Gold Member</div>
          </div>
          <button>
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="text-xs uppercase tracking-wider mb-2">Navigation</div>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm 
                        ${item.active ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;