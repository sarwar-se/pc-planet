import React, { Fragment, useEffect, useState } from 'react';
import './product.css';
import { getCategoryDetailsByName, getProducts, getSubCategoryDetailsByName } from './productApi';
import ProductCardView from './ProductCardView';
import { STATUS } from '../../constants/appConstants';
import FilterCard from '../../components/patterns/FilterCard';
import { FILTER_TYPE, GROUP_TYPE } from '../../constants/appConstants';
import { useParams } from 'react-router-dom';
import { productStatusMap } from '../../utils/helperFunction';
import { ProductInfo } from '../models/Product';

type AttributeValue = {
  id: number;
  value: string;
};

type ProductAttribute = {
  id: number;
  name: string;
  attributeValues: AttributeValue[];
};

type ProductBrand = {
  id: number;
  name: string;
};

interface CategoryDetails {
  id: number;
  name: string;
  brands: ProductBrand[];
  attributes: ProductAttribute[];
}

const Product = () => {
  const { category: categoryName } = useParams<string>();
  const { subCategory: subCategoryName } = useParams<string>();
  const { brand: brandName } = useParams<string>();

  const [fetchStatus, setFetchStatus] = useState<STATUS>(STATUS.IDLE);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({
    id: 0,
    name: '',
    brands: [],
    attributes: [],
  });

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedProductStatus, setSelectedProductStatus] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<string[]>([]);

  const getAvailabilitiesType = (): string[] => {
    return productStatusMap()
      .filter((type) => type.value !== 'OUT_OF_STOCK')
      .map((type) => type.label);
  };

  const getAvailabilitiesValue = (label: string): string => {
    const status = productStatusMap().find((item) => item.label === label);
    return status ? status.value : 'UNKNOWN';
  };

  const getbrandNames = (brands: ProductBrand[]): string[] => {
    return Array.from(new Set(brands.map((brand: ProductBrand) => brand.name)));
  };

  const getAttributeValues = (attributeValues: AttributeValue[]): string[] => {
    return Array.from(
      new Set(attributeValues.map((attributeValue: AttributeValue) => attributeValue.value)),
    );
  };

  const handleProductFilter = (filterType: FILTER_TYPE | string, value: string) => {
    if (filterType === FILTER_TYPE.AVAILABILITY) {
      const status = getAvailabilitiesValue(value);
      if (selectedAvailability.includes(value)) {
        setSelectedAvailability(selectedAvailability.filter((item) => item !== value));
        setSelectedProductStatus(selectedProductStatus.filter((item) => item !== status));
      } else {
        setSelectedAvailability((prev) => [...prev, value]);
        setSelectedProductStatus((prev) => [...prev, status]);
      }
    } else if (filterType === FILTER_TYPE.BRAND) {
      if (selectedBrands.includes(value)) {
        setSelectedBrands(selectedBrands.filter((item) => item !== value));
      } else {
        setSelectedBrands((prev) => [...prev, value]);
      }
    } else {
      if (selectedAttributeValues.includes(value)) {
        setSelectedAttributeValues(selectedAttributeValues.filter((item) => item !== value));
      } else {
        setSelectedAttributeValues((prev) => [...prev, value]);
      }
    }
  };

  useEffect(() => {
    setFetchStatus(STATUS.LOADING);

    getProducts(
      selectedProductStatus,
      selectedBrands,
      selectedAttributeValues,
      categoryName ? categoryName : '',
      subCategoryName ? subCategoryName : '',
      brandName ? brandName : '',
    )
      .then((response) => {
        const { data } = response;
        setProducts(data);
        setFetchStatus(STATUS.SUCCESS);
      })
      .catch(() => {
        setFetchStatus(STATUS.ERROR);
      });
  }, [
    selectedProductStatus,
    selectedBrands,
    selectedAttributeValues,
    categoryName,
    subCategoryName,
    brandName,
  ]);

  useEffect(() => {
    if (subCategoryName) {
      getSubCategoryDetailsByName(subCategoryName)
        .then((response) => {
          const { data } = response;
          setCategoryDetails(data);

          setSelectedAvailability([]);
          setSelectedBrands([]);
          setSelectedAttributeValues([]);
        })
        .catch(() => null);
    } else if (categoryName) {
      getCategoryDetailsByName(categoryName)
        .then((response) => {
          const { data } = response;
          setCategoryDetails(data);

          setSelectedAvailability([]);
          setSelectedBrands([]);
          setSelectedAttributeValues([]);
        })
        .catch(() => null);
    }
  }, [categoryName, subCategoryName]);

  return (
    <div className='container d-flex gap-2 mt-2'>
      {categoryName && (
        <div className='left-filter-card d-none d-xl-block'>
          <div className='d-flex flex-column gap-1'>
            <FilterCard
              title={'Availability'}
              groupType={GROUP_TYPE.CHECKBOX}
              values={getAvailabilitiesType()}
              selectedValues={selectedAvailability}
              filterType={FILTER_TYPE.AVAILABILITY}
              filterHandler={handleProductFilter}
            />
            {categoryDetails && categoryDetails.brands && categoryDetails.brands.length > 0 && (
              <FilterCard
                title={'Brand'}
                groupType={GROUP_TYPE.CHECKBOX}
                values={getbrandNames(categoryDetails.brands)}
                selectedValues={selectedBrands}
                filterType={FILTER_TYPE.BRAND}
                filterHandler={handleProductFilter}
              />
            )}

            {categoryDetails &&
              categoryDetails.attributes &&
              categoryDetails.attributes.map((attribute: ProductAttribute, i) => (
                <Fragment key={i}>
                  <FilterCard
                    title={attribute.name}
                    groupType={GROUP_TYPE.CHECKBOX}
                    values={getAttributeValues(attribute.attributeValues)}
                    selectedValues={selectedAttributeValues}
                    filterType={FILTER_TYPE.PROPERTY}
                    filterHandler={handleProductFilter}
                  />
                </Fragment>
              ))}
          </div>
        </div>
      )}

      <div className='product-container'>
        <ProductCardView products={products} status={fetchStatus} categoryName={categoryName} />
      </div>
    </div>
  );
};

export default Product;
