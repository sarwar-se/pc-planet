import React, { useContext } from 'react';
import ProductCardView from './ProductCardView';
import { STATUS } from '../../constants/appConstants';
import { AppContext } from '../../components/layouts/Layout';

const SearchProduct = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext must be used within a AppContext.Provider');
  }
  const { products } = context;

  return (
    <div className='container mt-2'>
      <div className='product-container'>
        <ProductCardView products={products} status={STATUS.SUCCESS} categoryName={''} />
      </div>
    </div>
  );
};

export default SearchProduct;
