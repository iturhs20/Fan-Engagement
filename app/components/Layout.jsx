import React from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;