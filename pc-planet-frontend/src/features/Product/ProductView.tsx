import React, { useEffect, useState } from "react";
import "./product.css";
import { getAllProduct } from "./productApi";
import ProductCardView from "./ProductCardView";
import { STATUS } from "../../utils/fetchStatus";

const Product = () => {
  const [products, setProducts] = useState<any>([]);
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    setFetchStatus(STATUS.LOADING);
    getAllProduct()
      .then((response) => {
        const { data } = response;
        setProducts(data);
        setFetchStatus(STATUS.SUCCESS);
      })
      .catch(() => {
        setFetchStatus(STATUS.ERROR);
      });
  }, []);

  return (
    <div className="container d-flex">
      <div className="col-3"></div>
      <div className="col-9">
        <ProductCardView products={products} status={fetchStatus} />
      </div>
    </div>
  );
};

export default Product;
