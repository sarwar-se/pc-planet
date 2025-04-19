import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../../components';
import {
  deleteProductBrand,
  getAllBrand,
  getAllCategory,
  getBrandsByCategory,
  getBrandsBySubCategory,
  getSubCategoryByCategory,
  saveOrUpdateProductBrand,
} from '../../productApi';
import EmptyBox from '../../../../components/patterns/EmptyBox';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { CreateProductBrand } from '../../../models/ProductMetadata';
import { STATUS } from '../../../../constants/appConstants';
import axios from 'axios';
import AppDropdown from '../../../../components/patterns/AppDropdown';
import { toDropdownItems } from '../../../../utils/helperFunction';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AppModal from '../../../../components/patterns/AppModal';
import AppToastContainer from '../../../../components/patterns/AppToastContainer';

const initialValue = {
  id: null,
  name: '',
  categoryId: null,
  subCategoryId: null,
};

const BrandManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | string>('');
  const [brands, setBrands] = useState([]);
  const [catSubCatWisebrands, setCatSubCatWiseBrands] = useState<CreateProductBrand[]>([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [brandData, setBrandData] = useState<CreateProductBrand>(initialValue);
  const [deleteBrand, setDeleteBrand] = useState<CreateProductBrand>(initialValue);
  const [selectedBrand, setSelectedBrand] = useState<number | string>('');
  const [modalShow, setModalShow] = useState(false);

  const handleInputChange = (value: string) => {
    setBrandData((prev) => ({ ...prev, name: value }));
  };

  const handleCategoryChange = (value: number | string) => {
    if (!selectedCategory) setBrandData(initialValue);

    setBrandData((prev) => ({ ...prev, categoryId: +value }));
    setSelectedCategory(+value);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (value: number | string) => {
    setBrandData((prev) => ({ ...prev, subCategoryId: +value }));
    setSelectedSubCategory(+value);
  };

  const handleBrandChange = (value: number | string) => {
    setBrandData((prev) => ({ ...prev, id: +value }));
    setSelectedBrand(+value);
  };

  const handleModalShow = (value: CreateProductBrand) => {
    setDeleteBrand(value);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handleUpdateBrand = (brand: CreateProductBrand) => {
    setBrandData({
      ...brandData,
      id: brand.id,
      name: brand.name,
    });
  };

  const handleModalAccept = () => {
    handleModalClose();
    if (deleteBrand.id) {
      deleteProductBrand(+deleteBrand.id)
        .then(() => {
          setStatus(STATUS.SUCCESS);
          setBrandData({
            ...brandData,
            id: null,
            name: '',
          });
          fetchBrands();
        })
        .catch(() => {
          setStatus(STATUS.ERROR);
        });
    }
  };

  const submitBrand = () => {
    setStatus(STATUS.LOADING);
    saveOrUpdateProductBrand(brandData)
      .then(() => {
        setStatus(STATUS.SUCCESS);
        setBrandData((prev) => ({ ...prev, id: null, name: '' }));
        fetchBrands();
      })
      .catch((error) => {
        setStatus(STATUS.ERROR);
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          setErrorMessage(message);
        } else {
          setErrorMessage('Unexpected error');
        }
      });
  };

  const fetchBrands = () => {
    if (selectedSubCategory) {
      getBrandsBySubCategory(selectedSubCategory).then((response) => {
        const { data } = response;
        setCatSubCatWiseBrands(data);
      });
    } else if (selectedCategory) {
      getBrandsByCategory(selectedCategory).then((response) => {
        const { data } = response;
        setCatSubCatWiseBrands(data);
      });
    }
  };

  useEffect(() => {
    if (selectedSubCategory) {
      getBrandsBySubCategory(selectedSubCategory).then((response) => {
        const { data } = response;
        setCatSubCatWiseBrands(data);
      });
    } else if (selectedCategory) {
      getBrandsByCategory(selectedCategory).then((response) => {
        const { data } = response;
        setCatSubCatWiseBrands(data);
      });
    }
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    getAllBrand().then((response) => {
      const { data } = response;
      setBrands(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategoryByCategory(selectedCategory).then((response) => {
        const { data } = response;
        setSubCategories(data);
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    getAllCategory().then((response) => {
      const { data } = response;
      setCategories(data);
    });
  }, []);

  return (
    <div className='border border-blueviolet rounded-top'>
      <div className='bg-blueviolet text-white px-2 py-1 border-bottom'>
        <h5>Brand</h5>
      </div>
      <div className='d-flex flex-column gap-3 p-3'>
        <div className='d-flex flex-lg-row flex-column gap-3'>
          <div className='w-100'>
            <FormGroup>
              <FormLabel className='required-input'>Select Category</FormLabel>
              <AppDropdown
                title={'Select Category'}
                disabledTitle
                value={selectedCategory}
                selectItems={toDropdownItems(categories, 'id', 'name')}
                handleChange={handleCategoryChange}
              />
            </FormGroup>
          </div>

          <div className='w-100'>
            <FormGroup>
              <FormLabel>Select Sub Category</FormLabel>
              <AppDropdown
                title={'Select Sub-Category'}
                value={selectedSubCategory}
                selectItems={toDropdownItems(subCategories, 'id', 'name')}
                handleChange={handleSubCategoryChange}
              />
            </FormGroup>
          </div>

          <div className='w-100'>
            <FormGroup>
              <FormLabel>Select Brand</FormLabel>
              <AppDropdown
                title={'Select Brand'}
                value={selectedBrand}
                selectItems={toDropdownItems(brands, 'id', 'name')}
                handleChange={handleBrandChange}
              />
            </FormGroup>
          </div>
        </div>

        {selectedCategory ? (
          <div className='d-flex flex-column gap-3'>
            <div className='d-flex flex-column gap-3'>
              <div>
                <FormControl
                  type='text'
                  value={brandData.name}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder='Enter Brand'
                />
              </div>
              <div className='d-flex justify-content-end'>
                <AppButton className='custom-outline-btn text-truncate' onClick={submitBrand}>
                  <div className='d-flex align-items-center '>
                    <div>Submit Brand</div>
                  </div>
                </AppButton>
              </div>
            </div>
            <div className='border bg-light'>
              {catSubCatWisebrands.length > 0 ? (
                <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-3 g-3'>
                  {catSubCatWisebrands.map((brand: CreateProductBrand) => (
                    <div key={brand.id}>
                      <div className='d-flex justify-content-between border bg-white p-2'>
                        <div> {brand.name}</div>
                        <div className='d-flex gap-2'>
                          <AppButton
                            onClick={() => {
                              handleUpdateBrand(brand);
                            }}
                            className='icon-btn'
                          >
                            <FaRegEdit size={20} color={'green'} />
                          </AppButton>
                          <AppButton onClick={() => handleModalShow(brand)} className='icon-btn'>
                            <RiDeleteBin6Line size={20} color={'red'} />
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyBox message='No Brand' />
              )}
            </div>
          </div>
        ) : (
          <EmptyBox message='No Brand' />
        )}
      </div>

      <AppModal
        show={modalShow}
        hideHeader={true}
        handleCancelButton={handleModalClose}
        handleAcceptButton={handleModalAccept}
        cancelBtnVariant='secondary'
        acceptBtnVariant='danger'
        cancelButtonText='Close'
        acceptButtonText='Delete'
      >
        <div>
          <h5>Are you sure?</h5>
          <div>
            You want to delete product brand: <span className='fw-bold'>{deleteBrand.name}</span>
          </div>
        </div>
      </AppModal>

      <AppToastContainer
        status={status}
        updateStatus={setStatus}
        errorMessage={errorMessage}
        successMessage={'Product brand updated successfully'}
      />
    </div>
  );
};

export default BrandManagement;
