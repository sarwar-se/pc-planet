import HttpInstance from '../../configs/asiosClient';
import { apiRoutes } from '../../routes/apiRoutes/productRoutes';

export const userRegistration = () => {
  return HttpInstance.get(apiRoutes.getAllCategory);
};
