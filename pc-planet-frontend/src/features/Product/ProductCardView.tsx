import React from "react";
import ProductCard from "./components/ProductCard";
import { STATUS } from "../../utils/helperFunction";
import { Loader } from "../../components/patterns/Loader";

const ProductCardView: React.FC<{
  products: any;
  status: string;
  categoryName: string;
}> = ({ products, status, categoryName }) => {
  return (
    <>
      {status === STATUS.LOADING && <Loader />}
      {status === STATUS.SUCCESS && (
        <div
          className={`row ${
            !categoryName ? "row-cols-xl-5" : ""
          } row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-2`}
        >
          {products.length > 0
            ? products.map((product: any, i: number) => (
                <div key={i}>
                  <ProductCard product={product} />
                </div>
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default ProductCardView;
