import React, { useContext } from "react";
import ProductCardView from "./ProductCardView";
import { STATUS } from "../../utils/helperFunction";
import { AppContext } from "../../components/layouts/Layout";

const SearchProduct = () => {
  const context = useContext(AppContext)!;
  const { products } = context;

  return (
    <div className="container mt-2">
      <div className="product-container">
        <ProductCardView
          products={products}
          status={STATUS.SUCCESS}
          categoryName={""}
        />
      </div>
    </div>
  );
};

export default SearchProduct;
