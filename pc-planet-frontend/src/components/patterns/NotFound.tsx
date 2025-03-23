import React from 'react';
import { not_found_icon } from '../../assets';

const NotFound: React.FC<{ primaryText: string; secondaryText?: string }> = ({
  primaryText = 'Not Found!',
  secondaryText,
}) => {
  return (
    <div className='not-found'>
      <div className='d-flex flex-column align-items-center'>
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
