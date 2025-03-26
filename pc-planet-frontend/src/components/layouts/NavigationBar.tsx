import React, { useEffect, useState } from 'react';
import './navigationbar.css';
import Header from './Header';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import { getProductCategories } from '../../features/Product/productApi';

export type ProductBrand = {
  id: number;
  name: string;
};

export type ProductSubCategory = {
  id: number;
  name: string;
  brands: ProductBrand[];
};

export interface ProductCategory {
  id: number;
  name: string;
  subCategories: ProductSubCategory[];
}

const NavigationBar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([
    {
      id: 0,
      name: '',
      subCategories: [],
    },
  ]);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  useEffect(() => {
    getProductCategories()
      .then((response) => {
        const { data } = response;
        setCategories(data);
      })
      .catch();
  }, []);

  return (
    <>
      <Header handleShowSidebar={handleShowSidebar} />

      {/* Secondary Navbar for Categories (Desktop View) */}
      <TopBar categories={categories} />

      {/* Offcanvas Sidebar for Small, Medium, Large Screens & Mobile View */}
      <SideBar
        categories={categories}
        showSidebar={showSidebar}
        handleCloseSidebar={handleCloseSidebar}
      />

      {/* Bottom Navigation Bar for Small, Medium, Large Screens & Mobile View */}
      <BottomBar />
    </>
  );
};

export default NavigationBar;
