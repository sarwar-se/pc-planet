import React from "react";
import ProductCard from "./components/ProductCard";
import { STATUS } from "../../utils/helperFunction";
import { Loader } from "../../components/patterns/Loader";
import NotFound from "../../components/patterns/NotFound";

const ProductCardView: React.FC<{
  products: any;
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
                !categoryName ? "row-cols-xl-5" : ""
              } row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-2`}
            >
              {products.map((product: any, i: number) => (
                <div key={i}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <NotFound
              primaryText={"Sorry! No product Founds"}
              secondaryText={"Please try searching for something else"}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductCardView;
