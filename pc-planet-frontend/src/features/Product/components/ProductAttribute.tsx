import React from 'react';
import { Form } from 'react-bootstrap';
import { AttributePayload } from './AddProductAttribute';

const ProductAttribute: React.FC<{
  attribute: AttributePayload;
  selectedAttributes: Record<number, number>;
  changeHandler: (value: number, attributeId: number) => void;
}> = ({ attribute, selectedAttributes, changeHandler }) => {
  return (
    <div className='border rounded-top shadow-sm h-100'>
      <div className='bg-light p-2 text-center border-bottom'>
        <h6>{attribute.name}</h6>
      </div>
      <div className='p-3'>
        {attribute.attributeValues &&
          attribute.attributeValues.map((item) => (
            <Form.Check
              key={item.id}
              label={item.value}
              type={'radio'}
              name={item.value}
              checked={selectedAttributes[attribute.id] === item.id}
              onChange={() => {
                changeHandler(attribute.id, item.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductAttribute;
