import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../components';
import { FiPlus } from 'react-icons/fi';
import { FormControl } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EmptyBox from '../../../components/patterns/EmptyBox';
import { ProductDetailsModel, ProductKeyFeature } from '../../models/Product';

const AddNewKeyFeature: React.FC<{
  editKeyFeatures?: ProductKeyFeature[];
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ editKeyFeatures = [], setProductInfo }) => {
  const [keyFeatures, setKeyFeatures] = useState<ProductKeyFeature[]>([]);

  const addNewKeyFeature = () => {
    setKeyFeatures((prev) => [...prev, { id: null, name: '', value: '' }]);
  };

  const handleChangeKeyFeature = (index: number, field: string, value: string) => {
    setKeyFeatures(keyFeatures.map((fet, i) => (i === index ? { ...fet, [field]: value } : fet)));
  };

  const removeItem = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => index !== i));
  };

  useEffect(() => {
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, keyFeatures: keyFeatures }));
  }, [keyFeatures, setProductInfo]);

  useEffect(() => {
    if (editKeyFeatures.length > 0 && keyFeatures.length === 0) {
      setKeyFeatures(editKeyFeatures);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editKeyFeatures]);

  return (
    <div className='border rounded-top'>
      <div className='d-flex justify-content-between align-items-center bg-light border-bottom px-2 py-1'>
        <h5>Key Features</h5>
        <AppButton
          className='bg-transparent text-primary'
          onClick={() => {
            addNewKeyFeature();
          }}
        >
          <div className='d-flex gap-1'>
            <FiPlus size={20} /> <h6>ADD KEY FEATURE</h6>
          </div>
        </AppButton>
      </div>
      <div className='p-3'>
        {keyFeatures.length > 0 ? (
          keyFeatures.map((item, index) => (
            <div key={index} className='d-flex py-1'>
              <div className='d-flex gap-2 w-100'>
                <div className='w-25'>
                  <FormControl
                    type='text'
                    value={item.name}
                    onChange={(e) => handleChangeKeyFeature(index, 'name', e.target.value)}
                    placeholder='Enter Name'
                  />
                </div>
                <div className='w-75'>
                  <FormControl
                    type='text'
                    value={item.value}
                    onChange={(e) => handleChangeKeyFeature(index, 'value', e.target.value)}
                    placeholder='Enter Description'
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
          <EmptyBox message={'No Key Features'} />
        )}
      </div>
    </div>
  );
};

export default AddNewKeyFeature;
