import React from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;