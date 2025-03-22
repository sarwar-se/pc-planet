export const appRoutes = {
  root: '/',
  productViewCategoryWise: (category) => `/category/${category}`,
  productViewCategorySubCategoryWise: (category, subCategory) =>
    `/category/${category}/${subCategory}`,
  productViewCategorySubCategoryBrandWise: (category, subCategory, brand) =>
    `/category/${category}/${subCategory}/${brand}`,
  searchProduct: (query) => `/product/search/${query}`,
  productDetails: (productName) => `/${productName}`,
};
