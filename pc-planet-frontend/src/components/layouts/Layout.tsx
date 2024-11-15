import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

type AppContextType = {
  products: any;
  setProducts: any;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const Layout: React.FC = () => {
  const [products, setProducts] = useState([]);

  return (
    <AppContext.Provider value={{ products, setProducts }}>
      <React.Fragment>
        <NavigationBar />
        <Outlet />
      </React.Fragment>
    </AppContext.Provider>
  );
};

export default Layout;
