import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
