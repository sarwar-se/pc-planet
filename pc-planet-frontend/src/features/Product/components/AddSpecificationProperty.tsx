import React from 'react';
import { FormControl } from 'react-bootstrap';
import { AppButton } from '../../../components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import { ProductSpecification, PropertyValue, SpecificationProperty } from '../../models/Product';

const AddSpecificationProperty: React.FC<{
  specificationIndex: number;
  specifications: ProductSpecification[];
  setSpecifications: React.Dispatch<React.SetStateAction<ProductSpecification[]>>;
  specification: ProductSpecification;
}> = ({ specificationIndex, specifications, setSpecifications, specification }) => {
  const addProperty = () => {
    setSpecifications(
      specifications.map((specification: ProductSpecification, index: number) => {
        if (index !== specificationIndex) return specification;
        return {
          ...specification,
          properties: [...specification.properties, { id: null, name: '', propertyValues: [] }],
        };
      }),
    );
  };

  const handleChangeProperty = (propIndex: number, value: string) => {
    setSpecifications((prev: ProductSpecification[]) =>
      prev.map((specification: ProductSpecification, specIndx: number) => {
        if (specIndx !== specificationIndex) return specification;

        const updatedProperties = specification.properties.map(
          (property: SpecificationProperty, i: number) =>
            i === propIndex ? { ...property, name: value } : property,
        );
        return { ...specification, properties: updatedProperties };
      }),
    );
  };

  const removeProperty = (specPropertyIndex: number) => {
    setSpecifications(
      specifications.map((specification: ProductSpecification, specIndex: number) => {
        if (specIndex !== specificationIndex) return specification;

        const updatedProperties = specification.properties.filter(
          (_: SpecificationProperty, propIndex: number) => propIndex !== specPropertyIndex,
        );
        return { ...specification, properties: updatedProperties };
      }),
    );
  };

  const addPropertyValue = (propertyIndex: number) => {
    setSpecifications(
      specifications.map((specification: ProductSpecification, index: number) => {
        if (index !== specificationIndex) return specification;

        const updatedProperties = specification.properties.map(
          (property: SpecificationProperty, propIndex: number) => {
            if (propIndex !== propertyIndex) return property;

            return {
              ...property,
              propertyValues: [...property.propertyValues, { id: null, value: '' }],
            };
          },
        );

        return { ...specification, properties: updatedProperties };
      }),
    );
  };

  const handleChangePropertyValue = (propIndex: number, valueIndex: number, value: string) => {
    setSpecifications((prev: ProductSpecification[]) =>
      prev.map((specification: ProductSpecification, specIndx: number) => {
        if (specIndx !== specificationIndex) return specification;

        const updatedProperty = specification.properties.map(
          (property: SpecificationProperty, propIndx: number) => {
            if (propIndx !== propIndex) return property;

            const updatedPropertyValues = property.propertyValues.map(
              (propertyValue: PropertyValue, pvIndex: number) =>
                pvIndex === valueIndex ? { ...propertyValue, value: value } : propertyValue,
            );

            return {
              ...property,
              propertyValues: updatedPropertyValues,
            };
          },
        );
        return { ...specification, properties: updatedProperty };
      }),
    );
  };

  const removePropertyValue = (pIndex: number, pvIndex: number) => {
    setSpecifications(
      specifications.map((specification: ProductSpecification, specIndex: number) => {
        if (specIndex !== specificationIndex) return specification;
        const updatedProperties = specification.properties.map(
          (property: SpecificationProperty, proIndex: number) => {
            if (proIndex !== pIndex) return property;
            const updatedPropertyValues = property.propertyValues.filter(
              (_: PropertyValue, valueIndex: number) => valueIndex !== pvIndex,
            );

            return { ...property, propertyValues: updatedPropertyValues };
          },
        );
        return { ...specification, properties: updatedProperties };
      }),
    );
  };

  return (
    <div className='ms-5'>
      <h6 className='pt-2'>Specification Properties</h6>
      <div className='d-flex flex-column gap-3'>
        {specification.properties.map((specProperty, index) => (
          <div key={index} className='border rounded'>
            <div className='d-flex justify-content-between align-items-center mb-1 rounded-top bg-custom-blueviolet p-2'>
              <h6 className='text-light'>Propertie Name</h6>
              <AppButton
                onClick={() => {
                  removeProperty(index);
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
                  value={specProperty.name}
                  onChange={(e) => handleChangeProperty(index, e.target.value)}
                  placeholder='Enter Propertie Name'
                  isInvalid={!specProperty.name}
                />
              </div>
              <div className='ms-5 border p-3 bg-light rounded'>
                <h6>Property Values</h6>
                <div>
                  {specProperty.propertyValues.map((propValue, valueIndex) => (
                    <div key={valueIndex} className='d-flex align-items-center'>
                      <div className='d-flex flex-column gap-2 py-1 w-100'>
                        <div className='w-100'>
                          <FormControl
                            type='text'
                            value={propValue.value}
                            onChange={(e) =>
                              handleChangePropertyValue(index, valueIndex, e.target.value)
                            }
                            placeholder='Enter Property Value'
                            isInvalid={!propValue.value}
                          />
                        </div>
                      </div>
                      <div>
                        <AppButton
                          onClick={() => {
                            removePropertyValue(index, valueIndex);
                          }}
                          className='p-0 bg-transparent'
                        >
                          <RiDeleteBin6Line size={24} color='gray' />
                        </AppButton>
                      </div>
                    </div>
                  ))}
                  <div className='text-end mt-2'>
                    <AppButton
                      className='bg-white border border-primary text-primary'
                      onClick={() => addPropertyValue(index)}
                    >
                      <div className='d-flex align-items-center'>
                        <GoPlus size={18} /> <span>ADD VALUE</span>
                      </div>
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='text-end'>
          <AppButton className='bg-white border border-primary text-primary' onClick={addProperty}>
            <div className='d-flex align-items-center'>
              <GoPlus size={18} /> <span>ADD PROPERTY</span>
            </div>
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AddSpecificationProperty;
