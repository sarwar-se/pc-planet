import HttpInstance from '../../configs/asiosClient';
import { apiRoutes } from '../../routes/apiRoutes/productRoutes';
import { ProductDetailsModel } from '../models/Product';

export const getProducts = (
  statuses: string[],
  brandNames: string[],
  attributeValues: string[],
  categoryName: string,
  subCategoryName: string,
  brandName: string,
) => {
  return HttpInstance.get(
    apiRoutes.getProducts(
      statuses,
      brandNames,
      attributeValues,
      categoryName,
      subCategoryName,
      brandName,
    ),
  );
};

export const getCategoryDetailsByName = (categoryName: string) => {
  return HttpInstance.get(apiRoutes.getCategoryDetailsByName(categoryName));
};

export const getSubCategoryDetailsByName = (subCategoryName: string) => {
  return HttpInstance.get(apiRoutes.getSubCategoryDetailsByName(subCategoryName));
};

export const getSearchedProduct = (query: string) => {
  return HttpInstance.get(apiRoutes.getSearchedProducts(query));
};

export const getProductDetailsById = (id: number) => {
  return HttpInstance.get(apiRoutes.getProductDetailsById(id));
};

export const getProductCategories = () => {
  return HttpInstance.get(apiRoutes.getProductCategories);
};

export const getAllCategory = () => {
  return HttpInstance.get(apiRoutes.getAllCategory);
};

export const getSubCategoryByCategory = (caregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getSubCategoryByCategory(caregoryId));
};

export const getBrandsByCategory = (caregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getBrandsByCategory(caregoryId));
};

export const getBrandsBySubCategory = (subCaregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getBrandsBySubCategory(subCaregoryId));
};

export const saveProduct = (data: ProductDetailsModel) => {
  return HttpInstance.post(apiRoutes.saveProduct, data);
};

export const getProductAttributeByCategoryId = (categoryId: number) => {
  return HttpInstance.get(apiRoutes.getProductAttributeByCategoryId(categoryId));
};

export const getProductAttributeBySubCategoryId = (subCategoryId: number) => {
  return HttpInstance.get(apiRoutes.getProductAttributeBySubCategoryId(subCategoryId));
};
