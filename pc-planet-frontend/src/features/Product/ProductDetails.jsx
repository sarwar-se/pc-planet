import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetailsById } from "./productApi";
import {
  getAvailabilitiesType,
  numberFormat,
  STATUS,
} from "../../utils/helperFunction";
import { Loader } from "../../components";
import NotFound from "../../components/patterns/NotFound";
import { no_image } from "../../assets";

const ProductDetails = () => {
  const { state } = useLocation();
  const productId = state?.productId;
  const [productDetails, setProductDetails] = useState({});
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  const [selectedImage, setSelectedImage] = useState(no_image);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    setFetchStatus(STATUS.LOADING);
    getProductDetailsById(productId)
      .then((response) => {
        const { data } = response;
        setProductDetails(data);
        setSelectedImage(data.image);
        setFetchStatus(STATUS.SUCCESS);
      })
      .catch(() => {
        setFetchStatus(STATUS.ERROR);
      });
  }, [productId]);

  return (
    <div className="container mt-3">
      {fetchStatus === STATUS.LOADING && <Loader />}
      {fetchStatus === STATUS.SUCCESS && (
        <>
          <section className="bg-white shadow-sm d-flex flex-column flex-lg-row justify-content-around p-4 rounded gap-3">
            {/* image view */}
            <div className="d-flex flex-column align-items-center gap-4 img-section">
              <div>
                <img
                  src={selectedImage ? `/images/${selectedImage}` : no_image}
                  style={{ width: "300px" }}
                  alt="Selected"
                />
              </div>

              <div className="d-flex">
                {productDetails.images.map((image) => (
                  <img
                    key={image.id}
                    src={`/images/${image.fileName}`}
                    alt={`Thumbnail ${image.id}`}
                    className="thumbnail border p-1"
                    onClick={() => handleImageClick(image.fileName)}
                  />
                ))}
              </div>
            </div>

            {/* feature view */}
            <div className="feature-section">
              <span className="fs-5 fw-bold" style={{ color: "blueviolet" }}>
                {productDetails.name}
              </span>
              <div className="d-flex flex-column flex-md-row gap-2 mt-2 product-info">
                <span className="bg-light border rounded-pill px-2">
                  <span className="opacity-75">Price:</span>{" "}
                  <span className="fw-bold">
                    {numberFormat(productDetails.price)}৳
                  </span>
                </span>
                <span className="bg-light border rounded-pill px-2">
                  <span className="opacity-75">Status:</span>{" "}
                  <span className="fw-bold">
                    {getAvailabilitiesType(productDetails.status)}
                  </span>
                </span>
                <span className="bg-light border rounded-pill px-2">
                  <span className="opacity-75">Product Code:</span>{" "}
                  <span className="fw-bold">{productDetails.code}</span>
                </span>
                <span className="bg-light border rounded-pill px-2">
                  <span className="opacity-75">Brand:</span>{" "}
                  <span className="fw-bold">{productDetails.brand.name}</span>
                </span>
              </div>
              <div className="d-flex flex-column mt-3">
                <h6 className="fs-5 fw-bold">Key features</h6>
                <ul>
                  {productDetails.keyFeatures.map((keyFeature, i) => (
                    <li key={i}>
                      {keyFeature.name
                        ? keyFeature.name + ": " + keyFeature.value
                        : keyFeature.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Specification view */}
          <section className="bg-white shadow-sm mt-2 p-4 rounded">
            {productDetails.specifications.length > 0 ? (
              <>
                <span className="fs-5 fw-bold">Specifications</span>
                <div className="d-flex flex-column mt-3">
                  {productDetails.specifications.map((spec, i) => (
                    <>
                      {spec.specificationDetails.length > 0 && (
                        <>
                          <span className="product-spec">{spec.category}</span>
                          {spec.specificationDetails.map((detail, i) => (
                            <div className="d-flex product-spec-detail">
                              <span className="w-25">
                                {detail.name ? detail.name : ""}
                              </span>
                              <span className="opacity-75">
                                {detail.value ? detail.value : ""}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ))}
                </div>
              </>
            ) : (
              <NotFound primaryText="Product details not found" />
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
