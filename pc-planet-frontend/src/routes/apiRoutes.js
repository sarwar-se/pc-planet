export const apiRoutes = {
  getProducts: (statuses, brandNames, properties, categoryName, subCategoryName, brandName) =>
    `/api/product/all?statuses=${statuses}&brandNames=${brandNames}&properties=${properties}&categoryName=${categoryName}&subCategoryName=${subCategoryName}&brandName=${brandName}`,
  getCategoryDetailsByName: (categoryName) =>
    `/api/product-category/details?categoryName=${categoryName}`,
  getSubCategoryDetailsByName: (subCategoryName) =>
    `/api/product-sub-category/details?subCategoryName=${subCategoryName}`,
  getSearchedProducts: (query) => `/api/product/search?query=${query}`,
  getProductDetailsById: (id) => `/api/product/all/${id}/details`,
  getProductCategories: '/api/product-category/all',
};
