'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  ShoppingBag,
  Users,
  Award,
  PieChart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname(); // Get current route path

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const navItems = [
    { icon: <PieChart className="w-5 h-5 text-purple-500" />, label: 'Awareness', href: '/' },
    { icon: <ThumbsUp className="w-5 h-5 text-yellow-500" />, label: 'On Boarding', href: '/onboarding' },
    { icon: <MessageSquare className="w-5 h-5 text-red-500" />, label: 'Engagement', href: '/engagement' },
    { icon: <ShoppingBag className="w-5 h-5 text-green-500" />, label: 'Micro Market Strategy', href: '/micro-marketing' },
    { icon: <Users className="w-5 h-5 text-indigo-500" />, label: 'Management Analysis', href: '/management' },
    { icon: <Award className="w-5 h-5 text-yellow-400" />, label: 'Contest', href: '/contest' },
  ];

  const MobileToggle = () => (
    <button
      onClick={toggleSidebar}
      className="md:hidden fixed z-20 bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const Overlay = () =>
    isMobile && isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
    ) : null;

  return (
    <>
      <Overlay />
      <MobileToggle />

      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-20 bg-gray-900 text-gray-400 h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isMobile ? 'w-64' : isMinimized ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isMinimized ? (
            <div className="text-2xl font-bold tracking-wider text-white">FANIVERSE</div>
          ) : (
            <img src="/logo-mini.svg" alt="Logo" className="h-10 w-10 rounded-full" />
          )}
          {!isMobile && (
            <button onClick={toggleMinimize} className="text-white">
              {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
        </div>

        {/* User Profile */}
        {!isMinimized && (
          <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
            <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden relative">
              <img src="/image.png" alt="User" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">Henry Klein</div>
              <div className="text-sm text-gray-500">Gold Member</div>
            </div>
            <button>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {!isMinimized && <div className="text-xs uppercase tracking-wider mb-2">Navigation</div>}
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={index}>
                      <Link href={item.href} passHref legacyBehavior>
                        <a
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                            isActive
                              ? 'bg-gray-800 text-white border-l-4 border-purple-500'
                              : 'hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {item.icon}
                          {!isMinimized && <span>{item.label}</span>}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;