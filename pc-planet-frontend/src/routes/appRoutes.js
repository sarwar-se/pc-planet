export const appRoutes = {
  root: "/",
  productView: (category) => `/all/${category}`,
  searchProduct: (query) => `/product/search/${query}`,
  productDetails: (productName) => `/${productName}`,
};
