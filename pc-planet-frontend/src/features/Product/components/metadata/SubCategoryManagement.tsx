import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../../components';
import {
  deleteSubCategory,
  getAllCategory,
  getSubCategoryByCategory,
  saveProductSubCategory,
} from '../../productApi';
import EmptyBox from '../../../../components/patterns/EmptyBox';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { CreateProductSubCategory } from '../../../models/ProductMetadata';
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
};

const SubCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [subCategoryData, setSubCategoryData] = useState<CreateProductSubCategory>(initialValue);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<CreateProductSubCategory>(initialValue);

  const handleInputChange = (value: string) => {
    setSubCategoryData((prev) => ({ ...prev, name: value }));
  };

  const handleCategoryChange = (value: number | string) => {
    if (!selectedCategory) setSubCategoryData(initialValue);

    setSubCategoryData((prev) => ({ ...prev, categoryId: +value }));
    setSelectedCategory(+value);
  };

  const handleModalShow = (value: CreateProductSubCategory) => {
    setSelectedSubCategory(value);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handleModalAccept = () => {
    handleModalClose();
    if (selectedSubCategory.id) {
      deleteSubCategory(+selectedSubCategory.id)
        .then(() => {
          setStatus(STATUS.SUCCESS);
          setSubCategoryData({
            ...subCategoryData,
            id: null,
            name: '',
          });
          fetchSubCategories();
        })
        .catch(() => {
          setStatus(STATUS.ERROR);
        });
    }
  };

  const handleUpdateSubCategory = (subCategory: CreateProductSubCategory) => {
    setSubCategoryData({
      ...subCategoryData,
      id: subCategory.id,
      name: subCategory.name,
    });
  };

  const submitSubCategory = () => {
    setStatus(STATUS.LOADING);
    saveProductSubCategory(subCategoryData)
      .then(() => {
        setStatus(STATUS.SUCCESS);
        setSubCategoryData((prev) => ({ ...prev, id: null, name: '' }));
        fetchSubCategories();
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

  const fetchSubCategories = () => {
    getSubCategoryByCategory(selectedCategory).then((response) => {
      const { data } = response;
      setSubCategories(data);
    });
  };

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
        <h5>Sub Category</h5>
      </div>
      <div className='d-flex flex-column gap-3 p-3'>
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
        {selectedCategory ? (
          <div className='d-flex flex-column gap-3'>
            <div className='d-flex flex-column gap-3'>
              <div>
                <FormControl
                  type='text'
                  value={subCategoryData.name}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder='Enter Sub-Category'
                />
              </div>
              <div className='d-flex justify-content-end'>
                <AppButton className='custom-outline-btn text-truncate' onClick={submitSubCategory}>
                  <div className='d-flex align-items-center '>
                    <div>Submit Sub Category</div>
                  </div>
                </AppButton>
              </div>
            </div>
            <div className='border bg-light'>
              {subCategories.length > 0 ? (
                <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-3 g-3'>
                  {subCategories.map((subCategory: CreateProductSubCategory) => (
                    <div key={subCategory.id}>
                      <div className='d-flex justify-content-between border bg-white p-2'>
                        <div> {subCategory.name}</div>
                        <div className='d-flex gap-2'>
                          <AppButton
                            onClick={() => {
                              handleUpdateSubCategory(subCategory);
                            }}
                            className='icon-btn'
                          >
                            <FaRegEdit size={20} color={'green'} />
                          </AppButton>
                          <AppButton
                            onClick={() => handleModalShow(subCategory)}
                            className='icon-btn'
                          >
                            <RiDeleteBin6Line size={20} color={'red'} />
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyBox message='No Sub Category' />
              )}
            </div>
          </div>
        ) : (
          <EmptyBox message='No Sub Category' />
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
            You want to delete sub category:{' '}
            <span className='fw-bold'>{selectedSubCategory.name}</span>
          </div>
        </div>
      </AppModal>

      <AppToastContainer
        status={status}
        updateStatus={setStatus}
        errorMessage={errorMessage}
        successMessage={'Product sub sucategory updated successfully'}
      />
    </div>
  );
};

export default SubCategoryManagement;
