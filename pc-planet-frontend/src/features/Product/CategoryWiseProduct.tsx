import React, { useEffect, useState } from "react";
import "./product.css";
import { getCategoryDetailsByName, getProducts } from "./productApi";
import ProductCardView from "./ProductCardView";
import { productStatusMap, STATUS } from "../../utils/helperFunction";
import FilterCard from "../../components/patterns/FilterCard";
import { FILTER_TYPE, GROUP_TYPE } from "../../utils/appConstant";
import { useParams } from "react-router-dom";

const Product = () => {
  const { category: categoryName } = useParams<string>();

  const [fetchStatus, setFetchStatus] = useState<STATUS>(STATUS.IDLE);
  const [products, setProducts] = useState<any>([]);
  const [categoryDetails, setCategoryDetails] = useState<any>([]);

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [productStatus, setProductStatus] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const getAvailabilitiesType = (): string[] => {
    return productStatusMap()
      .filter((type) => type.value !== "OUT_OF_STOCK")
      .map((type) => type.label);
  };

  const getAvailabilitiesValue = (label: string): string => {
    const status = productStatusMap().find((item) => item.label === label);
    return status ? status.value : "UNKNOWN";
  };

  const getFilterValues = (obj: any): string[] => {
    return Array.from(new Set(obj.map((o: any) => o.name)));
  };

  const handleProductFilter = (filterType: FILTER_TYPE, value: string) => {
    if (filterType === FILTER_TYPE.AVAILABILITY) {
      const status = getAvailabilitiesValue(value);
      if (selectedAvailability.includes(value)) {
        setSelectedAvailability(
          selectedAvailability.filter((item) => item !== value)
        );
        setProductStatus(productStatus.filter((item) => item !== status));
      } else {
        setSelectedAvailability((prev) => [...prev, value]);
        setProductStatus((prev) => [...prev, status]);
      }
    } else if (filterType === FILTER_TYPE.BRAND) {
      if (selectedBrands.includes(value)) {
        setSelectedBrands(selectedBrands.filter((item) => item !== value));
      } else {
        setSelectedBrands((prev) => [...prev, value]);
      }
    } else {
      if (selectedProperties.includes(value)) {
        setSelectedProperties(
          selectedProperties.filter((item) => item !== value)
        );
      } else {
        setSelectedProperties((prev) => [...prev, value]);
      }
    }
  };

  useEffect(() => {
    setFetchStatus(STATUS.LOADING);

    getProducts(productStatus, selectedBrands, selectedProperties, categoryName)
      .then((response) => {
        const { data } = response;
        setProducts(data);
        setFetchStatus(STATUS.SUCCESS);
      })
      .catch(() => {
        setFetchStatus(STATUS.ERROR);
      });
  }, [productStatus, selectedBrands, selectedProperties, categoryName]);

  useEffect(() => {
    getCategoryDetailsByName(categoryName)
      .then((response) => {
        const { data } = response;
        setCategoryDetails(data);

        setSelectedAvailability([]);
        setSelectedBrands([]);
        setSelectedProperties([]);
      })
      .catch(() => {});
  }, [categoryName]);

  return (
    <div className="container d-flex gap-2 mt-2">
      {categoryName && (
        <div className="left-filter-card d-none d-xl-block">
          <div className="d-flex flex-column gap-1">
            <FilterCard
              title={"Availability"}
              groupType={GROUP_TYPE.CHECKBOX}
              values={getAvailabilitiesType()}
              selectedValues={selectedAvailability}
              filterType={FILTER_TYPE.AVAILABILITY}
              filterHandler={handleProductFilter}
            />
            {categoryDetails && categoryDetails.brands && (
              <FilterCard
                title={"Brand"}
                groupType={GROUP_TYPE.CHECKBOX}
                values={getFilterValues(categoryDetails.brands)}
                selectedValues={selectedBrands}
                filterType={FILTER_TYPE.BRAND}
                filterHandler={handleProductFilter}
              />
            )}

            {categoryDetails &&
              categoryDetails.categoryFilterKeys &&
              categoryDetails.categoryFilterKeys.map(
                (filterKey: any, i: number) => (
                  <FilterCard
                    title={filterKey.name}
                    groupType={GROUP_TYPE.CHECKBOX}
                    values={getFilterValues(filterKey.filterProperties)}
                    selectedValues={selectedProperties}
                    filterType={FILTER_TYPE.PROPERTY}
                    filterHandler={handleProductFilter}
                  />
                )
              )}
          </div>
        </div>
      )}

      <div className="product-container">
        <ProductCardView
          products={products}
          status={fetchStatus}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
};

export default Product;
