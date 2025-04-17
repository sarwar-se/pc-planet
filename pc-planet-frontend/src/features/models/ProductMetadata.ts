export type CreateProductCategory = {
  id: number | null;
  name: string;
};

export interface CreateProductSubCategory extends CreateProductCategory {
  categoryId: number | null;
}

export type CreateProductBrand = {
  id: number | null;
  name: string;
  categoryId: number | null;
  subCategoryId?: number | null;
};

export type CreateProductAttributeValue = {
  id: number | null;
  value: string;
};

export type CreateProductAttribute = {
  id: number | null;
  name: string;
  attributeValues: CreateProductAttributeValue[];
  categoryId: number | null;
  subCategoryId?: number | null;
};
