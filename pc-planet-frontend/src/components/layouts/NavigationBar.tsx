import React from 'react';
import './navigationbar.css';
import Header from './Header';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';

const NavigationBar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    <>
      <Header handleShowSidebar={handleShowSidebar} />

      {/* Secondary Navbar for Categories (Desktop View) */}
      <TopBar />

      {/* Offcanvas Sidebar for Small, Medium, Large Screens & Mobile View */}
      <SideBar showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar} />

      {/* Bottom Navigation Bar for Small, Medium, Large Screens & Mobile View */}
      <BottomBar />
    </>
  );
};

export default NavigationBar;
