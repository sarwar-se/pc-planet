import React from 'react';
import ProductCard from './components/ProductCard';
import { STATUS } from '../../constants/appConstants';
import { Loader } from '../../components/patterns/Loader';
import NotFound from '../../components/patterns/NotFound';
import { ProductInfo } from '../models/Product';

const ProductCardView: React.FC<{
  products: ProductInfo[];
  status: string;
  categoryName: string | undefined;
}> = ({ products, status, categoryName }) => {
  return (
    <>
      {status === STATUS.LOADING && <Loader />}
      {status === STATUS.SUCCESS && (
        <>
          {products.length > 0 ? (
            <div
              className={`row ${
                !categoryName ? 'row-cols-xl-5' : ''
              } row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-2`}
            >
              {products.map((product: ProductInfo, i: number) => (
                <div key={i}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <NotFound
              minHeight='min-height-60vh'
              primaryText={'Sorry! No product Founds'}
              secondaryText={'Please try searching for something else'}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductCardView;
