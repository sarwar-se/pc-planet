import React from "react";
import ProductCard from "./components/ProductCard";

const ProductCardView = () => {
  return (
    <div className="col-9">
      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-2">
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductCardView;
