import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetailsById } from "./productApi";
import {
  getAvailabilitiesType,
  numberFormat,
  STATUS,
} from "../../utils/helperFunction";
import { AppButton, Loader } from "../../components";
import NotFound from "../../components/patterns/NotFound";
import { no_image } from "../../assets";
import { FaCartPlus } from "react-icons/fa";
import QuantitySelector from "../../components/patterns/QuantitySelector";

const ProductDetails = () => {
  const { state } = useLocation();
  const productId = state?.productId;
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  const specificationSection = useRef(null);
  const descriptionSection = useRef(null);
  const reviewSection = useRef(null);

  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(no_image);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavoir: "smooth" });
  };

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
    <div className="container d-flex flex-column gap-3 my-3">
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

              <div className="d-flex gap-2 mt-3">
                <QuantitySelector />
                <AppButton onClick={() => {}} className={""}>
                  <FaCartPlus size={20} /> Add To Cart
                </AppButton>
              </div>
            </div>
          </section>

          <div className="d-flex gap-2">
            <AppButton
              onClick={() => {
                scrollToSection(specificationSection);
              }}
              className={"fw-bold px-sm-5"}
            >
              Specification
            </AppButton>
            <AppButton
              onClick={() => {
                scrollToSection(descriptionSection);
              }}
              className={"fw-bold px-sm-5"}
            >
              Descriprion
            </AppButton>
            <AppButton
              onClick={() => {
                scrollToSection(reviewSection);
              }}
              className={"fw-bold px-sm-5"}
            >
              Review
            </AppButton>
          </div>

          {/* Specification view */}
          <section
            className="bg-white shadow-sm p-4 rounded"
            ref={specificationSection}
          >
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
                            <div className="d-flex gap-1 product-spec-detail">
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

          {/* Details view */}
          <section
            className="bg-white shadow-sm p-4 rounded"
            ref={descriptionSection}
          >
            {productDetails.descriptions.length > 0 ? (
              <>
                <span className="fs-5 fw-bold">Descriptions</span>
                <div className="d-flex flex-column gap-3 mt-3">
                  {productDetails.descriptions.map((description, i) => (
                    <div key={i}>
                      <div className="fw-bold">{description.name}</div>
                      <div>{description.value}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <NotFound primaryText="Product description not found" />
            )}
          </section>

          {/* Review */}
          <section
            className="bg-white shadow-sm p-4 rounded"
            ref={reviewSection}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <span className="fs-5 fw-bold">Reviews</span>
                <span>Customers Review</span>
              </div>
              <div>
                <AppButton onClick={() => {}} className={"default-btn"}>
                  Write a Review
                </AppButton>
              </div>
            </div>
            <hr />
            <div>
              <NotFound primaryText="This product has no reviews yet. Be the first one to write a review." />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
