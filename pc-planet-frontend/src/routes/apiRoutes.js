export const apiRoutes = {
  allProducts: (statuses, brandNames, properties, categoryName) =>
    `/api/product/all?statuses=${statuses}&brandNames=${brandNames}&properties=${properties}&categoryName=${categoryName}`,
  getCategoryDetailsByName: (categoryName) =>
    `/api/product-category/details?categoryName=${categoryName}`,
  getSearchedProducts: (query) => `/api/product/search?query=${query}`,
  getProductDetailsById: (id) => `/api/product/all/${id}/details`,
};
