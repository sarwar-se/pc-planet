import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { ProductInfo } from '../../features/models/Product';

type AppContextType = {
  products: ProductInfo[];
  setProducts: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

const Layout: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

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
