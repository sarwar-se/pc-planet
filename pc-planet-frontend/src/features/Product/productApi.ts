import HttpInstance from "../../configs/asiosClient";
import { apiRoutes } from "../../routes/apiRoutes";

export const getAllProduct = () => {
  return HttpInstance.get(apiRoutes.allProducts);
};
