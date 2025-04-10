import React, { useEffect, useState } from 'react';
import { getProductAttributeByCategoryId, getProductAttributeBySubCategoryId } from '../productApi';
import ProductAttribute from './ProductAttribute';
import EmptyBox from '../../../components/patterns/EmptyBox';
import { ProductDetailsModel } from '../../models/Product';

type AttributeValue = {
  id: number;
  value?: string;
};

export interface AttributePayload {
  id: number;
  name?: string;
  attributeValues?: AttributeValue[];
}

const AddProductAttribute: React.FC<{
  categoryId: number;
  subCategoryId: number;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ categoryId, subCategoryId, setProductInfo }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number>>({});

  const [attributes, setAttributes] = useState<AttributePayload[]>([]);

  const changeHandler = (attributeId: number, attributeValueId: number) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeId]: attributeValueId }));
  };

  useEffect(() => {
    if (subCategoryId) {
      getProductAttributeBySubCategoryId(subCategoryId)
        .then((response) => {
          const { data } = response;
          setAttributes(data);
          setSelectedAttributes({});
        })
        .catch(() => null);
    } else if (categoryId) {
      getProductAttributeByCategoryId(categoryId)
        .then((response) => {
          const { data } = response;
          setAttributes(data);
          setSelectedAttributes({});
        })
        .catch(() => null);
    }
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    const attributes: { id: number }[] = Object.values(selectedAttributes).map((attributeId) => ({
      id: attributeId,
    }));
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, attributeValues: attributes }));
  }, [selectedAttributes, setProductInfo]);

  return (
    <div className='border rounded-top'>
      <div className='d-flex justify-content-between align-items-center bg-light border-bottom px-2 py-1'>
        <h5>Attributes</h5>
      </div>
      <div>
        {attributes.length > 0 ? (
          <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 m-0 p-3 g-2'>
            {attributes.map((attribute: AttributePayload, i) => (
              <div key={i}>
                <ProductAttribute
                  attribute={attribute}
                  selectedAttributes={selectedAttributes}
                  changeHandler={changeHandler}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyBox message={'No Attributes'} />
        )}
      </div>
    </div>
  );
};

export default AddProductAttribute;
