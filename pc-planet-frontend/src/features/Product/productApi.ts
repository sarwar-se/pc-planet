import HttpInstance from '../../configs/asiosClient';
import { apiRoutes } from '../../routes/apiRoutes';

export const getProducts = (
  statuses: string[],
  brandNames: string[],
  properties: string[],
  categoryName: string,
  subCategoryName: string,
  brandName: string,
) => {
  return HttpInstance.get(
    apiRoutes.getProducts(
      statuses,
      brandNames,
      properties,
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

export const getSearchedProduct = (query: string | undefined) => {
  return HttpInstance.get(apiRoutes.getSearchedProducts(query));
};

export const getProductDetailsById = (id: number) => {
  return HttpInstance.get(apiRoutes.getProductDetailsById(id));
};

export const getProductCategories = () => {
  return HttpInstance.get(apiRoutes.getProductCategories);
};
