import React, { useEffect, useState } from 'react';
import { Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { productStatusMap, toDropdownItems } from '../../utils/helperFunction';
import {
  getAllCategory,
  getBrandsByCategory,
  getBrandsBySubCategory,
  getSubCategoryByCategory,
  saveProduct,
  updateProduct,
} from './productApi';
import AppDropdown from '../../components/patterns/AppDropdown';

import AddNewKeyFeature from './components/AddKeyFeature';
import AddSpecification from './components/AddSpecification';
import AddProductDescription from './components/AddProductDescription';
import AddImage from './components/AddImage';
import {
  ProductBrand,
  ProductCategory,
  ProductDetailsModel,
  ProductStatus,
  ProductSubCategory,
} from '../models/Product';
import { AppButton } from '../../components';
import axios from 'axios';
import { STATUS } from '../../constants/appConstants';
import AddProductAttribute from './components/AddProductAttribute';
import AppToastContainer from '../../components/patterns/AppToastContainer';

type DropdownItem = {
  value: string | number;
  label: string;
};

const initialValue = {
  id: null,
  name: '',
  code: '',
  model: '',
  price: null,
  status: undefined,
  brand: null,
  category: null,
  subCategory: null,
  keyFeatures: [],
  image: '',
  warranty: 0,
  specifications: [],
  descriptions: [],
  attributeValues: [],
  images: [],
};

const CreateOrUpdateProduct: React.FC<{ editProduct: ProductDetailsModel }> = ({
  editProduct = initialValue,
}) => {
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [subCategories, setSubCategories] = useState<DropdownItem[]>([]);
  const [brands, setBrands] = useState<DropdownItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    editProduct.category?.id ? editProduct.category.id : '',
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | number>('');
  const [selectedStatus, setSelectedStatus] = useState<string | number>('');
  const [selectedbrand, setSelectedBrand] = useState<string | number>('');

  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const [productInfo, setProductInfo] = useState(editProduct);

  const categoryHandleChange = (value: string | number) => {
    setSelectedSubCategory('');
    setSelectedBrand('');
    setSelectedCategory(value);

    const category: ProductCategory = {
      id: +value,
    };
    setProductInfo((prev) => ({ ...prev, category: category }));
  };

  const subCategoryHandleChange = (value: string | number) => {
    setSelectedBrand('');
    setSelectedSubCategory(value);

    const category: ProductSubCategory = {
      id: +value,
    };
    setProductInfo((prev) => ({ ...prev, subCategory: category }));
  };

  const handleStatusChange = (value: string | number) => {
    setSelectedStatus(value);
    setProductInfo((prev) => ({ ...prev, status: value as ProductStatus }));
  };

  const brandHandleChange = (value: string | number) => {
    setSelectedBrand(value);

    const brand: ProductBrand = {
      id: +value,
    };
    setProductInfo((prev) => ({ ...prev, brand: brand }));
  };

  const handleChange = (field: string, value: string | number) => {
    setProductInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setProductInfo(initialValue);
  };

  const handleSubmit = async () => {
    try {
      if (productInfo.id === null) {
        await saveProduct(productInfo);
      } else {
        await updateProduct(productInfo);
      }

      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Unexpected error');
      }
    }
  };

  useEffect(() => {
    getAllCategory().then((response) => {
      const { data } = response;

      const selectItems = toDropdownItems(data, 'id', 'name');
      setCategories(selectItems);
    });
  }, []);

  useEffect(() => {
    const fetchSubCategory = () => {
      if (selectedCategory) {
        getSubCategoryByCategory(selectedCategory).then((response) => {
          const { data } = response;

          const selectItems = toDropdownItems(data, 'id', 'name');
          setSubCategories(selectItems);
        });
      }
    };
    fetchSubCategory();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      getBrandsBySubCategory(selectedSubCategory).then((response) => {
        const { data } = response;

        const selectItems = toDropdownItems(data, 'id', 'name');
        setBrands(selectItems);
      });
    } else if (selectedCategory) {
      getBrandsByCategory(selectedCategory).then((response) => {
        const { data } = response;

        const selectItems = toDropdownItems(data, 'id', 'name');
        setBrands(selectItems);
      });
    }
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    setProductInfo(editProduct);
    setSelectedCategory(editProduct.category?.id ? editProduct?.category?.id : '');
    setSelectedSubCategory(editProduct.subCategory?.id ? editProduct?.subCategory?.id : '');
    setSelectedBrand(editProduct.brand?.id ? editProduct.brand?.id : '');
    setSelectedStatus(editProduct.status ? editProduct.status : '');
  }, [editProduct]);

  return (
    <div className='container'>
      <h3 className='text-center p-3'>Add New Product</h3>
      <div className='bg-white p-3 rounded border shadow-sm'>
        <Row className=''>
          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Name</FormLabel>
            <FormControl
              type='text'
              value={productInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              isInvalid={!productInfo.name}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Code</FormLabel>
            <FormControl
              type='text'
              value={productInfo.code}
              onChange={(e) => handleChange('code', e.target.value)}
              isInvalid={!productInfo.code}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Model</FormLabel>
            <FormControl
              type='text'
              value={productInfo.model}
              onChange={(e) => handleChange('model', e.target.value)}
              isInvalid={!productInfo.model}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Price</FormLabel>
            <FormControl
              type='number'
              value={productInfo.price ? productInfo.price : ''}
              onChange={(e) => handleChange('price', e.target.value)}
              isInvalid={!productInfo.price}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Warranty</FormLabel>
            <FormControl
              type='number'
              value={productInfo.warranty ? productInfo.warranty : ''}
              onChange={(e) => handleChange('warranty', e.target.value)}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Status</FormLabel>
            <AppDropdown
              title={'Select Status'}
              disabledTitle
              selectItems={productStatusMap()}
              value={selectedStatus}
              handleChange={handleStatusChange}
              required
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Category</FormLabel>
            <AppDropdown
              title={'Select Category'}
              disabledTitle
              selectItems={categories}
              value={selectedCategory}
              handleChange={categoryHandleChange}
              required
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>SubCategory</FormLabel>
            <AppDropdown
              title={'Select SubCategory'}
              disabledTitle
              selectItems={subCategories}
              value={selectedSubCategory}
              handleChange={subCategoryHandleChange}
              disabled={subCategories.length <= 0}
              // required={subCategories.length > 0}
            />
          </FormGroup>

          <FormGroup as={Col} lg='4' md='6' className='pb-3'>
            <FormLabel>Brand</FormLabel>
            <AppDropdown
              title={'Select Brand'}
              disabledTitle
              selectItems={brands}
              value={selectedbrand}
              handleChange={brandHandleChange}
              disabled={brands.length <= 0}
              required
            />
          </FormGroup>
        </Row>
        <hr className='border-3' />
        <AddProductAttribute
          editAttributeValues={productInfo.attributeValues}
          categoryId={+selectedCategory}
          subCategoryId={+selectedSubCategory}
          setProductInfo={setProductInfo}
        />
        <hr className='border-3' />
        <AddImage editImages={productInfo.images} setProductInfo={setProductInfo} />
        <hr className='border-3' />
        <AddNewKeyFeature
          editKeyFeatures={productInfo.keyFeatures}
          setProductInfo={setProductInfo}
        />
        <hr className='border-3' />
        <AddSpecification
          editSpecifications={productInfo.specifications}
          setProductInfo={setProductInfo}
        />
        <hr className='border-3' />
        <AddProductDescription
          editDescriptions={productInfo.descriptions}
          setProductInfo={setProductInfo}
        />

        <div className='d-flex justify-content-end gap-3 mt-3'>
          <AppButton className='bg-secondary' onClick={handleClear}>
            Clear
          </AppButton>
          <AppButton className='' onClick={handleSubmit}>
            Save
          </AppButton>
        </div>
      </div>

      <AppToastContainer
        status={status}
        updateStatus={setStatus}
        errorMessage={errorMessage}
        successMessage={'Product saved successfully'}
      />
    </div>
  );
};

export default CreateOrUpdateProduct;
