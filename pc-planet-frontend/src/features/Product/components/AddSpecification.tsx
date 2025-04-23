import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../components';
import { FiPlus } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FormControl } from 'react-bootstrap';
import AddSpecificationProperty from './AddSpecificationProperty';
import EmptyBox from '../../../components/patterns/EmptyBox';
import { ProductDetailsModel, ProductSpecification } from '../../models/Product';

const AddSpecification: React.FC<{
  editSpecifications?: ProductSpecification[];
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ editSpecifications = [], setProductInfo }) => {
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(editSpecifications);

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, { id: null, type: '', properties: [] }]);
  };

  const handleChangeSpecification = (index: number, field: string, value: string) => {
    setSpecifications(
      specifications.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((__dirname, i) => i !== index));
  };

  useEffect(() => {
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, specifications: specifications }));
  }, [specifications, setProductInfo]);

  useEffect(() => {
    if (editSpecifications.length > 0 && specifications.length === 0) {
      setSpecifications(editSpecifications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSpecifications]);

  return (
    <div className='border rounded-top'>
      <div className='d-flex justify-content-between p-2 bg-light border-bottom'>
        <h5>Specifications</h5>
      </div>
      <div className='d-flex flex-column gap-3 p-3'>
        {specifications.length > 0 ? (
          specifications.map((specification, index) => (
            <div key={index} className='border rounded'>
              <div className='d-flex justify-content-between align-items-center border-bottom p-2 bg-info text-white'>
                <h6>Specification Type</h6>
                <AppButton
                  onClick={() => {
                    removeSpecification(index);
                  }}
                  className='p-0 bg-transparent'
                >
                  <RiDeleteBin6Line size={24} />
                </AppButton>
              </div>
              <div className='d-flex flex-column gap-2 p-2'>
                <div className='w-100'>
                  <FormControl
                    type='text'
                    value={specification.type}
                    onChange={(e) => handleChangeSpecification(index, 'type', e.target.value)}
                    placeholder='Enter Specification Type'
                    isInvalid={!specification.type}
                  />
                </div>
                <AddSpecificationProperty
                  specificationIndex={index}
                  specifications={specifications}
                  setSpecifications={setSpecifications}
                  specification={specification}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyBox message={'No Specifications'} />
        )}
        <div className='text-center'>
          <AppButton className='bg-white text-primary' onClick={addSpecification}>
            <div className='d-flex gap-1'>
              <FiPlus size={20} /> <h6>ADD SPECIFICATION</h6>
            </div>
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AddSpecification;
