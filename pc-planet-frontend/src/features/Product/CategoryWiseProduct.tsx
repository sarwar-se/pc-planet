import React, { useEffect, useState } from 'react';
import './product.css';
import { getCategoryDetailsByName, getProducts, getSubCategoryDetailsByName } from './productApi';
import ProductCardView from './ProductCardView';
import { STATUS } from '../../constants/appConstants';
import FilterCard from '../../components/patterns/FilterCard';
import { FILTER_TYPE, GROUP_TYPE } from '../../constants/appConstants';
import { useParams } from 'react-router-dom';
import { productStatusMap } from '../../utils/helperFunction';
import { ProductInfo } from '../models/Product';

type FilterProperty = {
  id: number;
  name: string;
};

type FilterKey = {
  id: number;
  name: string;
  filterProperties: FilterProperty[];
};

type ProductBrand = {
  id: number;
  name: string;
};

interface CategoryDetails {
  id: number;
  name: string;
  brands: ProductBrand[];
  filterKeys: FilterKey[];
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
    filterKeys: [],
  });

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedProductStatus, setSelectedProductStatus] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const getAvailabilitiesType = (): string[] => {
    return productStatusMap()
      .filter((type) => type.value !== 'OUT_OF_STOCK')
      .map((type) => type.label);
  };

  const getAvailabilitiesValue = (label: string): string => {
    const status = productStatusMap().find((item) => item.label === label);
    return status ? status.value : 'UNKNOWN';
  };

  const getFilterValues = (obj: ProductBrand[] | FilterProperty[]): string[] => {
    return Array.from(new Set(obj.map((o: ProductBrand | FilterProperty) => o.name)));
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
      if (selectedProperties.includes(value)) {
        setSelectedProperties(selectedProperties.filter((item) => item !== value));
      } else {
        setSelectedProperties((prev) => [...prev, value]);
      }
    }
  };

  useEffect(() => {
    setFetchStatus(STATUS.LOADING);

    getProducts(
      selectedProductStatus,
      selectedBrands,
      selectedProperties,
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
    selectedProperties,
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
          setSelectedProperties([]);
        })
        .catch(() => null);
    } else if (categoryName) {
      getCategoryDetailsByName(categoryName)
        .then((response) => {
          const { data } = response;
          setCategoryDetails(data);

          setSelectedAvailability([]);
          setSelectedBrands([]);
          setSelectedProperties([]);
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
                values={getFilterValues(categoryDetails.brands)}
                selectedValues={selectedBrands}
                filterType={FILTER_TYPE.BRAND}
                filterHandler={handleProductFilter}
              />
            )}

            {categoryDetails &&
              categoryDetails.filterKeys &&
              categoryDetails.filterKeys.map((filterKey: FilterKey) => (
                <FilterCard
                  title={filterKey.name}
                  groupType={GROUP_TYPE.CHECKBOX}
                  values={getFilterValues(filterKey.filterProperties)}
                  selectedValues={selectedProperties}
                  filterType={FILTER_TYPE.PROPERTY}
                  filterHandler={handleProductFilter}
                />
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
