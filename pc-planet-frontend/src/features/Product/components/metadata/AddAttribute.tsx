import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { STATUS } from '../../../../constants/appConstants';
import axios from 'axios';
import { FormControl, Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';
import { CreateProductAttribute } from '../../../models/ProductMetadata';
import { saveOrUpdateProductAttribute } from '../../productApi';
import { AppButton } from '../../../../components';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AddAttribute: React.FC<{
  selectedCategory: number;
  selectedSubCategory: number;
  fetchAttributes: () => void;
  productAttribute: CreateProductAttribute;
  setProductAttribute: React.Dispatch<React.SetStateAction<CreateProductAttribute>>;
}> = ({
  selectedCategory,
  selectedSubCategory,
  fetchAttributes,
  productAttribute,
  setProductAttribute,
}) => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const addNewAttributeValue = () => {
    setProductAttribute((prev) => ({
      ...prev,
      attributeValues: [...prev.attributeValues, { id: null, value: '' }],
    }));
  };

  const handleAttributeInputChange = (value: string) => {
    setProductAttribute((prev) => ({ ...prev, name: value }));
  };

  const handleAttributeValueInputChange = (valueIndex: number, value: string) => {
    const updatedAttributeValues = productAttribute.attributeValues.map((attributValue, i) => {
      return i === valueIndex ? { ...attributValue, value: value } : attributValue;
    });
    setProductAttribute({ ...productAttribute, attributeValues: updatedAttributeValues });
  };

  const removeNewAttributeValue = (valueIndex: number) => {
    const updatedAttributeValues = productAttribute.attributeValues.filter(
      (_, index) => index !== valueIndex,
    );
    setProductAttribute({
      ...productAttribute,
      attributeValues: updatedAttributeValues,
    });
  };

  const submitAttribute = () => {
    setStatus(STATUS.LOADING);
    saveOrUpdateProductAttribute(productAttribute)
      .then(() => {
        setStatus(STATUS.SUCCESS);
        setProductAttribute({
          id: null,
          name: '',
          attributeValues: [],
          categoryId: selectedCategory,
          subCategoryId: selectedSubCategory,
        });
        fetchAttributes();
      })
      .catch((error) => {
        setStatus(STATUS.ERROR);
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          setErrorMessage(message);
        } else {
          setErrorMessage('Unexpected error');
        }
      });
  };

  return (
    <div className='d-flex flex-column gap-1 border border-info rounded bg-white'>
      <div className='rounded-top p-2 bg-primary text-white'>
        <span className='fw-bold'>Add/Modify Attribute</span>
      </div>

      <div className='d-flex gap-3 flex-column p-3'>
        <div className='d-flex w-100'>
          <FormControl
            type='text'
            value={productAttribute.name}
            onChange={(e) => handleAttributeInputChange(e.target.value)}
            placeholder='Enter Attribute Name'
            isInvalid={!productAttribute.name}
          />
        </div>
        <div className='ms- border border-warning rounded bg-light'>
          <div className='bg-warning text-secondary p-2 rounded-top'>
            <span className='fw-bold'>Add Value</span>
          </div>
          <div className='d-flex flex-column gap-3 p-3'>
            {productAttribute.attributeValues.length > 0 && (
              <div className='d-flex flex-column gap-2'>
                {productAttribute.attributeValues.map((attributeValue, valueIndex) => (
                  <div key={valueIndex} className='d-flex w-100'>
                    <FormControl
                      type='text'
                      value={attributeValue.value}
                      onChange={(e) => handleAttributeValueInputChange(valueIndex, e.target.value)}
                      placeholder='Enter Addribute Value'
                      isInvalid={!attributeValue.value}
                    />
                    <AppButton
                      onClick={() => {
                        removeNewAttributeValue(valueIndex);
                      }}
                      className='p-0 bg-transparent'
                    >
                      <RiDeleteBin6Line size={24} color='gray' />
                    </AppButton>
                  </div>
                ))}
              </div>
            )}

            <div className='text-end'>
              <AppButton
                className='bg-white border border-primary text-primary'
                onClick={addNewAttributeValue}
              >
                <div className='d-flex align-items-center'>
                  <GoPlus size={18} /> <span>ADD ATTRIBUTE VALUE</span>
                </div>
              </AppButton>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-end'>
          <AppButton className='custom-outline-btn' onClick={submitAttribute}>
            Submit Attribute
          </AppButton>
        </div>
      </div>

      <ToastContainer position='bottom-end' className='position-fixed m-1'>
        <Toast
          onClose={() => setStatus(STATUS.IDLE)}
          show={status === STATUS.ERROR}
          delay={4000}
          autohide
          bg='danger'
        >
          <ToastHeader>
            <strong className='me-auto'>Fail!</strong>
          </ToastHeader>
          <ToastBody className='text-white'>{errorMessage}</ToastBody>
        </Toast>

        <Toast
          onClose={() => setStatus(STATUS.IDLE)}
          show={status === STATUS.SUCCESS}
          delay={4000}
          autohide
          bg='success'
        >
          <ToastHeader>
            <strong className='me-auto'>Success!</strong>
          </ToastHeader>
          <ToastBody className='text-white'>Product attribute updated successfully</ToastBody>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AddAttribute;
