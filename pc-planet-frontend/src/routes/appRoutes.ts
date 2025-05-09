export const appRoutes = {
  root: '/',
  productViewCategoryWise: (category: string) => `/${category}`,
  productViewCategorySubCategoryWise: (category: string, subCategory: string) =>
    `/${category}/${subCategory}`,
  productViewCategorySubCategoryBrandWise: (category: string, subCategory: string, brand: string) =>
    `/${category}/${subCategory}/${brand}`,
  searchProduct: (query: string) => `/product/search/${query}`,
  productDetails: (productName: string) => `/${productName}/details`,
  addProduct: '/product/add',
  editProduct: (id: number) => `/product/${id}`,
  productManagement: '/product/management',
  addProductMetadata: '/product/metadata-management',
  userRgistration: '/user/registration',
  userLogin: '/user/login',
};
