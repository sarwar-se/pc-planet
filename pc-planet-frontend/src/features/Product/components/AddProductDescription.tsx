import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../components';
import { FiPlus } from 'react-icons/fi';
import { FormControl } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EmptyBox from '../../../components/patterns/EmptyBox';
import { ProductDescription, ProductDetailsModel } from '../../models/Product';

const AddProductDescription: React.FC<{
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ setProductInfo }) => {
  const [descriptions, setDescriptions] = useState<ProductDescription[]>([]);

  const addNewDescription = () => {
    setDescriptions((prev) => [...prev, { id: null, name: '', value: '' }]);
  };

  const handleChangeDescription = (index: number, field: string, value: string) => {
    setDescriptions(
      descriptions.map((description, i) =>
        i === index ? { ...description, [field]: value } : description,
      ),
    );
  };

  const removeItem = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => index !== i));
  };

  useEffect(() => {
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, descriptions: descriptions }));
  }, [descriptions, setProductInfo]);

  return (
    <div className='border rounded-top'>
      <div className='d-flex justify-content-between align-items-center px-2 bg-light border-bottom'>
        <h5>Descriptions</h5>
        <AppButton
          className='bg-transparent text-primary'
          onClick={() => {
            addNewDescription();
          }}
        >
          <div className='d-flex gap-1'>
            <FiPlus size={20} /> <h6>ADD DESCRIPTION</h6>
          </div>
        </AppButton>
      </div>

      <div className='p-3'>
        {descriptions.length > 0 ? (
          descriptions.map((item, index) => (
            <div key={index} className='d-flex py-1'>
              <div className='d-flex flex-column gap-2 w-100 border rounded p-2 bg-light'>
                <div className=''>
                  <FormControl
                    type='text'
                    value={item.name}
                    onChange={(e) => handleChangeDescription(index, 'name', e.target.value)}
                    placeholder='Enter Title'
                  />
                </div>
                <div className=''>
                  <FormControl
                    as={'textarea'}
                    rows={3}
                    type='text'
                    value={item.value}
                    onChange={(e) => handleChangeDescription(index, 'value', e.target.value)}
                    placeholder='Enter Details'
                    isInvalid={!item.value}
                  />
                </div>
              </div>
              <AppButton
                onClick={() => {
                  removeItem(index);
                }}
                className='p-0 bg-transparent'
              >
                <RiDeleteBin6Line size={24} color='gray' />
              </AppButton>
            </div>
          ))
        ) : (
          <EmptyBox message={'No Descriptions'} />
        )}
      </div>
    </div>
  );
};

export default AddProductDescription;
