export const apiRoutes = {
  getProducts: (
    statuses: string[],
    brandNames: string[],
    properties: string[],
    categoryName: string,
    subCategoryName: string,
    brandName: string,
  ) =>
    `/api/product/all?statuses=${statuses}&brandNames=${brandNames}&properties=${properties}&categoryName=${categoryName}&subCategoryName=${subCategoryName}&brandName=${brandName}`,
  getCategoryDetailsByName: (categoryName: string) =>
    `/api/product-category/details?categoryName=${categoryName}`,
  getSubCategoryDetailsByName: (subCategoryName: string) =>
    `/api/product-sub-category/details?subCategoryName=${subCategoryName}`,
  getSearchedProducts: (query: string) => `/api/product/search?query=${query}`,
  getProductDetailsById: (id: number) => `/api/product/all/${id}/details`,
  getProductCategories: '/api/product-category/all',
};
