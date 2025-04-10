export type ProductStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'UP_COMING' | 'PRE_ORDER';

export type ProductBrand = {
  id: number | null;
  name?: string;
};

export type ProductCategory = {
  id: number | null;
  name?: string;
  brands?: ProductBrand[];
};

export type ProductSubCategory = {
  id: number | null;
  name?: string;
};

export type ProductKeyFeature = {
  id: number | null;
  name: string;
  value: string;
};

export interface ProductInfo {
  id: number | null;
  name: string;
  code: string;
  model: string;
  price: number | null;
  status: ProductStatus | undefined;
  brand: ProductBrand | null;
  category: ProductCategory | null;
  keyFeatures?: ProductKeyFeature[];
  image: string;
}

export type PropertyValue = {
  id: number | null;
  value: string;
};

export type SpecificationProperty = {
  id: number | null;
  name: string;
  propertyValues: PropertyValue[];
};

export type ProductSpecification = {
  id: number | null;
  type: string;
  properties: SpecificationProperty[];
};

export type ProductDescription = {
  id: number | null;
  name: string;
  value: string;
};

export type ProductAttributeValue = {
  id: number | null;
  value?: string;
};

export type ProductAttribute = {
  id: number | null;
  name: string;
  attributeValues?: ProductAttributeValue[];
};

export type ProductImage = {
  id: number | null;
  fileName: string;
};

export interface ProductDetailsModel extends ProductInfo {
  warranty?: number;
  specifications?: ProductSpecification[];
  descriptions?: ProductDescription[];
  attributeValues?: ProductAttributeValue[];
  images?: ProductImage[];
}
