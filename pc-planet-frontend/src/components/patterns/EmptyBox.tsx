import React from 'react';

const EmptyBox: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className='d-flex justify-content-center align-items-center py-3'>
      <div className='empty-box w-25 py-3'>{message}</div>
    </div>
  );
};

export default EmptyBox;
