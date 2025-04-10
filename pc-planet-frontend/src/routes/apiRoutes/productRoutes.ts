export const apiRoutes = {
  getProducts: (
    statuses: string[],
    brandNames: string[],
    attributeValues: string[],
    categoryName: string,
    subCategoryName: string,
    brandName: string,
  ) =>
    `/api/product/all?statuses=${statuses}&brandNames=${brandNames}&attributeValues=${attributeValues}&categoryName=${categoryName}&subCategoryName=${subCategoryName}&brandName=${brandName}`,
  getCategoryDetailsByName: (categoryName: string) =>
    `/api/product-category/details?categoryName=${categoryName}`,
  getSubCategoryDetailsByName: (subCategoryName: string) =>
    `/api/product-sub-category/details?subCategoryName=${subCategoryName}`,
  getSearchedProducts: (query: string) => `/api/product/search?query=${query}`,
  getProductDetailsById: (id: number) => `/api/product/all/${id}/details`,
  getProductCategories: '/api/product-category/all',
  getAllCategory: '/api/product-category/get-all',
  getSubCategoryByCategory: (categoryId: string | number) =>
    `/api/product-sub-category/${categoryId}`,
  getBrandsByCategory: (categoryId: string | number) =>
    `/api/product-brand/get-brands-by-category?categoryId=${categoryId}`,
  getBrandsBySubCategory: (subCategoryId: string | number) =>
    `/api/product-brand/get-brands-by-sub-category?subCategoryId=${subCategoryId}`,
  saveProduct: '/api/product/save',
  getProductAttributeByCategoryId: (categoryId: number) =>
    `/api/product-category/attributes?categoryId=${categoryId}`,
  getProductAttributeBySubCategoryId: (subCategoryId: number) =>
    `/api/product-sub-category/attributes?subCategoryId=${subCategoryId}`,
};
