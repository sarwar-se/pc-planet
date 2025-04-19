import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetailsById } from './productApi';
import { ProductDetailsModel } from '../models/Product';
import CreateOrUpdateProduct from './CreateOrUpdateProduct';

const initialValue = {
  id: null,
  name: '',
  code: '',
  model: '',
  price: null,
  status: undefined,
  brand: null,
  category: null,
  keyFeatures: [],
  image: '',
  warranty: 0,
  specifications: [],
  descriptions: [],
  attributeValues: [],
  images: [],
};

const UpdateProduct = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetailsModel>(initialValue);

  useEffect(() => {
    if (productId) {
      getProductDetailsById(+productId).then((response) => {
        const { data } = response;
        setProductDetails(data);
      });
    }
  }, [productId]);

  return (
    <>
      <CreateOrUpdateProduct editProduct={productDetails} />
    </>
  );
};

export default UpdateProduct;
