import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

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
        <Footer />
      </React.Fragment>
    </AppContext.Provider>
  );
};

export default Layout;
