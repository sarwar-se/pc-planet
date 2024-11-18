import HttpInstance from "../../configs/asiosClient";
import { apiRoutes } from "../../routes/apiRoutes";

export const getProducts = (
  statuses: string[],
  brandNames: string[],
  properties: string[],
  categoryName: string | undefined
) => {
  return HttpInstance.get(
    apiRoutes.getProducts(statuses, brandNames, properties, categoryName)
  );
};

export const getCategoryDetailsByName = (categoryName: string | undefined) => {
  return HttpInstance.get(apiRoutes.getCategoryDetailsByName(categoryName));
};

export const getSearchedProduct = (query: string | undefined) => {
  return HttpInstance.get(apiRoutes.getSearchedProducts(query));
};

export const getProductDetailsById = (id: number) => {
  return HttpInstance.get(apiRoutes.getProductDetailsById(id));
};
