import React from "react";
import ProductCard from "./components/ProductCard";
import { STATUS } from "../../utils/fetchStatus";
import { Loader } from "../../components/patterns/Loader";

const ProductCardView: React.FC<{ products: any; status: string }> = ({
  products,
  status,
}) => {
  return (
    <>
      {status === STATUS.LOADING && <Loader />}
      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 g-2">
        {products.length > 0
          ? products.map((product: any, i: number) => (
              <div key={i}>
                <ProductCard product={product} />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default ProductCardView;
