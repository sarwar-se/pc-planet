type ProductStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'UP_COMING' | 'PRE_ORDER';

type ProductBrand = {
  id: number;
  name: string;
};

type ProductCategory = {
  id: number;
  name: string;
  brands: ProductBrand[];
};

export type ProductKeyFeature = {
  id: number;
  name: string;
  value: string;
};

export interface ProductInfo {
  id: number;
  name: string;
  code: string;
  model: string;
  price: number;
  status: ProductStatus;
  brand: ProductBrand | null;
  category: ProductCategory | null;
  keyFeatures: ProductKeyFeature[];
  image: string;
}

type PropertyDetails = {
  id: number;
  description: string;
};

type SpecificationProperties = {
  id: number;
  name: string;
  details: PropertyDetails[];
};

type ProductSpecification = {
  id: number;
  type: string;
  properties: SpecificationProperties[];
};

type ProductDescription = {
  id: number;
  name: string;
  value: string;
};

type ProductImage = {
  id: number;
  fileName: string;
};

export interface ProductDetailsModel extends ProductInfo {
  warranty: number;
  specifications: ProductSpecification[];
  descriptions: ProductDescription[];
  images: ProductImage[];
}
