import HttpInstance from "../../configs/asiosClient";
import { apiRoutes } from "../../routes/apiRoutes";

export const getAllProduct = (
  statuses: string[],
  brandNames: string[],
  properties: string[],
  categoryName: string,
) => {
  return HttpInstance.get(
    apiRoutes.allProducts(statuses, brandNames, properties, categoryName)
  );
};

export const getCategoryDetailsByName = (categoryName: string) => {
  return HttpInstance.get(apiRoutes.getCategoryDetailsByName(categoryName));
};
