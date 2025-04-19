import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../../components';
import { deleteCategory, getAllCategory, saveProductCategory } from '../../productApi';
import EmptyBox from '../../../../components/patterns/EmptyBox';
import { FormControl } from 'react-bootstrap';
import { CreateProductCategory } from '../../../models/ProductMetadata';
import { STATUS } from '../../../../constants/appConstants';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AppModal from '../../../../components/patterns/AppModal';
import { FaRegEdit } from 'react-icons/fa';
import AppToastContainer from '../../../../components/patterns/AppToastContainer';

const initialValue = {
  id: null,
  name: '',
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CreateProductCategory>(initialValue);
  const [categoryData, setCategoryData] = useState<CreateProductCategory>(initialValue);

  const handleInputChange = (value: string) => {
    setCategoryData((prev) => ({ ...prev, name: value }));
  };

  const handleModalShow = (value: CreateProductCategory) => {
    setSelectedCategory(value);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handleModalAccept = () => {
    handleModalClose();
    if (selectedCategory.id) {
      deleteCategory(+selectedCategory.id)
        .then(() => {
          setStatus(STATUS.SUCCESS);
          fetchCategories();
        })
        .catch(() => {
          setStatus(STATUS.ERROR);
        });
    }
  };

  const handleUpdateCategory = (category: CreateProductCategory) => {
    setCategoryData({
      ...categoryData,
      id: category.id,
      name: category.name,
    });
  };

  const submitCategory = () => {
    setStatus(STATUS.LOADING);
    console.log(categoryData);
    saveProductCategory(categoryData)
      .then(() => {
        setStatus(STATUS.SUCCESS);
        setCategoryData(initialValue);
        fetchCategories();
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

  const fetchCategories = () => {
    getAllCategory().then((response) => {
      const { data } = response;
      setCategories(data);
    });
  };

  useEffect(() => {
    getAllCategory().then((response) => {
      const { data } = response;
      setCategories(data);
    });
  }, []);
  return (
    <div className='border border-blueviolet rounded-top'>
      <div className='bg-blueviolet text-white px-2 py-1 border-bottom'>
        <h5>Category</h5>
      </div>
      <div className='d-flex flex-column gap-4 p-3'>
        <div className='d-flex flex-column gap-3'>
          <div>
            <FormControl
              type='text'
              value={categoryData.name}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder='Enter Category Name'
            />
          </div>

          <div className='d-flex justify-content-end'>
            <AppButton className='custom-outline-btn' onClick={submitCategory}>
              <div className='d-flex align-items-center '>
                <div>Submit Category</div>
              </div>
            </AppButton>
          </div>
        </div>

        <div className='border bg-light'>
          {categories.length > 0 ? (
            <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-3 g-3'>
              {categories.map((category: CreateProductCategory) => (
                <div key={category.id}>
                  <div className='d-flex justify-content-between border bg-white p-2'>
                    <div> {category.name}</div>
                    <div className='d-flex gap-2'>
                      <AppButton
                        onClick={() => {
                          handleUpdateCategory(category);
                        }}
                        className='icon-btn'
                      >
                        <FaRegEdit size={20} color={'green'} />
                      </AppButton>
                      <AppButton onClick={() => handleModalShow(category)} className='icon-btn'>
                        <RiDeleteBin6Line size={20} color={'red'} />
                      </AppButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyBox message='No Category' />
          )}
        </div>
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
            <span className='fw-bold'>{selectedCategory.name}</span>
          </div>
        </div>
      </AppModal>

      <AppToastContainer
        status={status}
        updateStatus={setStatus}
        errorMessage={errorMessage}
        successMessage={'Product category updated successfully'}
      />
    </div>
  );
};

export default CategoryManagement;
