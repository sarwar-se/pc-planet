export const apiRoutes = {
  allProducts: (statuses, brandNames, properties, categoryName) =>
    `/api/product/all?statuses=${statuses}&brandNames=${brandNames}&properties=${properties}&categoryName=${categoryName}`,
  getCategoryDetailsByName: (categoryName) =>
    `/api/product-category/details?categoryName=${categoryName}`,
};
