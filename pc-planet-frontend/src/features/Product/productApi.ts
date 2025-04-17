import HttpInstance from '../../configs/asiosClient';
import { apiRoutes } from '../../routes/apiRoutes/productRoutes';
import { ProductDetailsModel } from '../models/Product';
import {
  CreateProductAttribute,
  CreateProductBrand,
  CreateProductCategory,
  CreateProductSubCategory,
} from '../models/ProductMetadata';

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

export const getProductMetadata = () => {
  return HttpInstance.get(apiRoutes.getProductMetadata);
};

export const getAllCategory = () => {
  return HttpInstance.get(apiRoutes.getAllCategory);
};

export const getAllBrand = () => {
  return HttpInstance.get(apiRoutes.getAllBrand);
};

export const getSubCategoryByCategory = (caregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getSubCategoryByCategory(+caregoryId));
};

export const getBrandsByCategory = (caregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getBrandsByCategory(+caregoryId));
};

export const getBrandsBySubCategory = (subCaregoryId: string | number) => {
  return HttpInstance.get(apiRoutes.getBrandsBySubCategory(+subCaregoryId));
};

export const getProductAttributeByCategoryId = (categoryId: number) => {
  return HttpInstance.get(apiRoutes.getProductAttributeByCategoryId(categoryId));
};

export const getProductAttributeBySubCategoryId = (subCategoryId: number) => {
  return HttpInstance.get(apiRoutes.getProductAttributeBySubCategoryId(subCategoryId));
};

export const saveProduct = (data: ProductDetailsModel) => {
  return HttpInstance.post(apiRoutes.saveProduct, data);
};

export const saveProductCategory = (data: CreateProductCategory) => {
  return HttpInstance.post(apiRoutes.saveCategory, data);
};

export const saveProductSubCategory = (data: CreateProductSubCategory) => {
  return HttpInstance.post(apiRoutes.saveSubCategory, data);
};

export const saveOrUpdateProductBrand = (data: CreateProductBrand) => {
  return HttpInstance.post(apiRoutes.saveOrUpdateBrand, data);
};

export const saveOrUpdateProductAttribute = (data: CreateProductAttribute) => {
  return HttpInstance.post(apiRoutes.saveOrUpdateAttribute, data);
};

export const deleteProductAttribute = (id: number) => {
  return HttpInstance.delete(apiRoutes.deleteAttribute(id));
};

export const deleteProductBrand = (id: number) => {
  return HttpInstance.delete(apiRoutes.deleteBrand(id));
};

export const deleteSubCategory = (id: number) => {
  return HttpInstance.delete(apiRoutes.deleteSubCategory(id));
};

export const deleteCategory = (id: number) => {
  return HttpInstance.delete(apiRoutes.deleteCategory(id));
};
