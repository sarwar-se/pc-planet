import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductDetailsById } from './productApi';
import { getImageUrl } from '../../utils/helperFunction';
import { AppButton, Loader } from '../../components';
import NotFound from '../../components/patterns/NotFound';
import { no_image } from '../../assets';
import ProductReview from './components/ProductReview';
import { STATUS } from '../../constants/appConstants';
import FeatureView from './components/FeatureView';
import { ProductDetailsModel } from '../models/Product';

const ProductDetails = () => {
  const { state } = useLocation();
  const productId = state?.productId;
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  const specificationSection = useRef<HTMLDivElement>(null);
  const descriptionSection = useRef<HTMLDivElement>(null);
  const reviewSection = useRef<HTMLDivElement>(null);

  const [productDetails, setProductDetails] = useState<ProductDetailsModel>({
    id: 0,
    name: '',
    code: '',
    model: '',
    price: 0,
    status: 'OUT_OF_STOCK',
    brand: null,
    category: null,
    keyFeatures: [],
    image: '',
    warranty: 0,
    specifications: [],
    descriptions: [],
    images: [],
  });
  const [selectedImage, setSelectedImage] = useState(no_image);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageClick = (image: string) => {
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
    <div className='container d-flex flex-column gap-3 my-3'>
      {fetchStatus === STATUS.LOADING && <Loader />}
      {fetchStatus === STATUS.SUCCESS && (
        <>
          <section className='bg-white shadow-sm d-flex flex-column flex-lg-row justify-content-around p-4 rounded gap-3'>
            {/* image view */}
            <div className='d-flex flex-column align-items-center gap-4 img-section'>
              <div>
                <img
                  src={selectedImage ? `${getImageUrl(selectedImage)}` : no_image}
                  style={{ width: '300px' }}
                  alt='Selected'
                />
              </div>

              <div className='d-flex'>
                {productDetails.images.map((image) => (
                  <img
                    key={image.id}
                    src={`${getImageUrl(image.fileName)}`}
                    alt={`Thumbnail ${image.id}`}
                    className={`thumbnail border p-1 ${
                      selectedImage === image.fileName && 'thumbnail-selected'
                    }`}
                    onClick={() => handleImageClick(image.fileName)}
                  />
                ))}
              </div>
            </div>

            {/* key feature */}
            <div className='feature-section'>
              <FeatureView productDetails={productDetails} />
            </div>
          </section>

          <div className='d-flex gap-2'>
            <AppButton
              onClick={() => {
                scrollToSection(specificationSection);
              }}
              className={'fw-bold px-sm-5'}
            >
              Specification
            </AppButton>
            <AppButton
              onClick={() => {
                scrollToSection(descriptionSection);
              }}
              className={'fw-bold px-sm-5'}
            >
              Descriprion
            </AppButton>
            <AppButton
              onClick={() => {
                scrollToSection(reviewSection);
              }}
              className={'fw-bold px-sm-5'}
            >
              Review
            </AppButton>
          </div>

          {/* Specification */}
          <section className='bg-white shadow-sm p-4 rounded' ref={specificationSection}>
            {productDetails.specifications.length > 0 ? (
              <>
                <span className='fs-5 fw-bold'>Specifications</span>
                <div className='d-flex flex-column mt-3'>
                  {productDetails.specifications.map((spec) => (
                    <Fragment key={spec.id}>
                      {spec.properties.length > 0 && (
                        <>
                          <span className='product-spec'>{spec.type}</span>
                          {spec.properties.map((property) => (
                            <div className='d-flex gap-1 product-spec-detail'>
                              <span key={property.id} className='w-25'>
                                {property.name ? property.name : ''}
                              </span>
                              <div className='d-flex flex-column'>
                                {property.propertyValues.map((propertyValue) => (
                                  <span key={propertyValue.id} className='opacity-75'>
                                    {propertyValue.value ? propertyValue.value : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </Fragment>
                  ))}
                </div>
              </>
            ) : (
              <NotFound minHeight='min-height-20vh' primaryText='Product details not found' />
            )}
          </section>

          {/* Descriptions */}
          <section className='bg-white shadow-sm p-4 rounded' ref={descriptionSection}>
            {productDetails.descriptions.length > 0 ? (
              <>
                <span className='fs-5 fw-bold'>Descriptions</span>
                <div className='d-flex flex-column gap-3 mt-3'>
                  {productDetails.descriptions.map((description, i) => (
                    <div key={i}>
                      <div className='fw-bold'>{description.name}</div>
                      <div>{description.value}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <NotFound minHeight='min-height-20vh' primaryText='Product description not found' />
            )}
          </section>

          {/* Review */}
          <div ref={reviewSection}>
            <ProductReview />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
