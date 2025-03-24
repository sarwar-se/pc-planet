import React from 'react';
import { not_found_icon } from '../../assets';

const NotFound: React.FC<{ minHeight?: string; primaryText: string; secondaryText?: string }> = ({
  minHeight,
  primaryText = 'Not Found!',
  secondaryText,
}) => {
  return (
    <div className={`not-found ${minHeight}`}>
      <div className='d-flex flex-column align-items-center gap-2'>
        <div className='text-'>
          <img src={not_found_icon} width={60} alt='Not found' />
        </div>
        <div className='text-center'>
          <h6 className=' opacity-50'>{primaryText}</h6>
          <h6 className=' opacity-75'>{secondaryText}</h6>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
