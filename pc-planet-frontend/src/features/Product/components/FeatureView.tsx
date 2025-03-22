import React from 'react';
import { getAvailabilitiesType, numberFormat } from '../../../utils/helperFunction';
import QuantitySelector from '../../../components/patterns/QuantitySelector';
import { AppButton } from '../../../components';
import { FaCartPlus } from 'react-icons/fa';

const FeatureView: React.FC<{ productDetails: any }> = ({ productDetails }) => {
  console.log(productDetails);
  return (
    <>
      <span className='fs-5 fw-bold' style={{ color: 'blueviolet' }}>
        {productDetails.name}
      </span>

      <div className='d-flex flex-column flex-md-row gap-2 mt-2 product-info'>
        <span className='bg-light border rounded-pill px-2'>
          <span className='opacity-75'>Price:</span>{' '}
          <span className='fw-bold'>{numberFormat(productDetails.price)}৳</span>
        </span>
        <span className='bg-light border rounded-pill px-2'>
          <span className='opacity-75'>Status:</span>{' '}
          <span className='fw-bold'>{getAvailabilitiesType(productDetails.status)}</span>
        </span>
        <span className='bg-light border rounded-pill px-2'>
          <span className='opacity-75'>Product Code:</span>{' '}
          <span className='fw-bold'>{productDetails.code}</span>
        </span>
        <span className='bg-light border rounded-pill px-2'>
          <span className='opacity-75'>Brand:</span>{' '}
          <span className='fw-bold'>{productDetails.brand.name}</span>
        </span>
      </div>

      <div className='d-flex flex-column mt-3'>
        <h6 className='fs-5 fw-bold'>Key features</h6>
        <ul>
          {productDetails.keyFeatures.map((keyFeature: any) => (
            <li key={keyFeature.id}>
              {keyFeature.name ? keyFeature.name + ': ' + keyFeature.value : keyFeature.value}
            </li>
          ))}
        </ul>
      </div>

      <div className='d-flex gap-2 mt-3'>
        <QuantitySelector />
        <AppButton onClick={() => null} className={'custom-fill-btn'}>
          <FaCartPlus size={20} /> Add To Cart
        </AppButton>
      </div>
    </>
  );
};

export default FeatureView;
