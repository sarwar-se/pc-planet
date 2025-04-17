import React from 'react';
import CategoryManagement from './components/metadata/CategoryManagement';
import SubCategoryManagement from './components/metadata/SubCategoryManagement';
import BrandManagement from './components/metadata/BrandManagement';
import ProductAttributeManagement from './components/metadata/ProductAttributeManagement';

const ProductMetadataManagement = () => {
  return (
    <div className='container'>
      <h3 className='text-center p-3'>Add Product Metadata</h3>
      <div className='bg-white p-3 border rounded shadow-sm'>
        <div className='d-flex flex-column gap-3'>
          <CategoryManagement />
          <SubCategoryManagement />
          <BrandManagement />
          <ProductAttributeManagement />
        </div>
      </div>
    </div>
  );
};

export default ProductMetadataManagement;
