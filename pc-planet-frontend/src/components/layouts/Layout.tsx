import React from "react";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
