import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import AppButton from './AppButton';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (): void => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div>
      <InputGroup style={{ width: '9rem' }}>
        <AppButton onClick={handleDecrement} className={'fw-bold bg-light border text-dark'}>
          -
        </AppButton>
        <FormControl
          type='number'
          value={quantity}
          onChange={handleInputChange}
          className='p-0 text-center'
        />
        <AppButton onClick={handleIncrement} className={'fw-bold bg-light border text-dark'}>
          +
        </AppButton>
      </InputGroup>
    </div>
  );
};

export default QuantitySelector;
