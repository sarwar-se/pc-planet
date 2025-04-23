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
  getProductMetadata: '/api/product-category/metadata',
  getAllCategory: '/api/product-category/all',
  getAllBrand: '/api/product-brand/all',
  getSubCategoryByCategory: (categoryId: number) => `/api/product-sub-category/${categoryId}`,
  getBrandsByCategory: (categoryId: number) =>
    `/api/product-brand/get-brands-by-category?categoryId=${categoryId}`,
  getBrandsBySubCategory: (subCategoryId: number) =>
    `/api/product-brand/get-brands-by-sub-category?subCategoryId=${subCategoryId}`,
  getProductAttributeByCategoryId: (categoryId: number) =>
    `/api/product-category/attributes?categoryId=${categoryId}`,
  getProductAttributeBySubCategoryId: (subCategoryId: number) =>
    `/api/product-sub-category/attributes?subCategoryId=${subCategoryId}`,
  saveProduct: '/api/product/save',
  updateProduct: '/api/product/update',
  saveCategory: '/api/product-category/save',
  saveSubCategory: '/api/product-sub-category/save',
  saveOrUpdateBrand: '/api/product-brand/save',
  saveOrUpdateAttribute: '/api/product-attribute/save',
  deleteAttribute: (id: number) => `/api/product-attribute/delete/${id}`,
  deleteBrand: (id: number) => `/api/product-brand/delete/${id}`,
  deleteSubCategory: (id: number) => `/api/product-sub-category/delete/${id}`,
  deleteCategory: (id: number) => `/api/product-category/delete/${id}`,
  deleteProduct: (id: number) => `/api/product/all/${id}/delete`,
};
