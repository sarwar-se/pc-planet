import React, { useEffect, useState } from 'react';
import { AppButton } from '../../../../components';
import {
  deleteProductAttribute,
  getAllCategory,
  getProductAttributeByCategoryId,
  getProductAttributeBySubCategoryId,
  getSubCategoryByCategory,
} from '../../productApi';
import EmptyBox from '../../../../components/patterns/EmptyBox';
import {
  FormGroup,
  FormLabel,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap';
import { CreateProductAttribute } from '../../../models/ProductMetadata';
import AppDropdown from '../../../../components/patterns/AppDropdown';
import { toDropdownItems } from '../../../../utils/helperFunction';
import AddAttribute from './AddAttribute';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AppModal from '../../../../components/patterns/AppModal';
import { STATUS } from '../../../../constants/appConstants';

const initialValue = {
  id: null,
  name: '',
  attributeValues: [],
  categoryId: null,
  subCategoryId: null,
};

const ProductAttributeManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | string>('');
  const [attirbutes, setAttirbutes] = useState<CreateProductAttribute[]>([]);
  const [newAttirbute, setNewAttirbute] = useState<CreateProductAttribute>(initialValue);
  const [selectedAttribute, setSelectedAttribute] = useState<CreateProductAttribute>(initialValue);
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);

  const handleCategoryChange = (value: number | string) => {
    if (!selectedCategory) setNewAttirbute(initialValue);

    setNewAttirbute((prev) => ({ ...prev, categoryId: +value }));
    setSelectedCategory(value);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (value: number | string) => {
    setNewAttirbute((prev) => ({ ...prev, subCategoryId: +value }));
    setSelectedSubCategory(value);
  };

  const handleModalShow = (attribute: CreateProductAttribute) => {
    setSelectedAttribute(attribute);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handleModalAccept = () => {
    handleModalClose();
    if (selectedAttribute.id) {
      deleteProductAttribute(+selectedAttribute.id)
        .then(() => {
          setStatus(STATUS.SUCCESS);
          fetchAttributes();
        })
        .catch(() => {
          setStatus(STATUS.ERROR);
        });
    }
  };

  const handleUpdateAttribute = (attribute: CreateProductAttribute) => {
    setNewAttirbute({
      ...newAttirbute,
      id: attribute.id,
      name: attribute.name,
      attributeValues: attribute.attributeValues,
    });
  };

  const fetchAttributes = () => {
    if (selectedSubCategory) {
      getProductAttributeBySubCategoryId(+selectedSubCategory).then((response) => {
        const { data } = response;
        setAttirbutes(data);
      });
    } else if (selectedCategory) {
      getProductAttributeByCategoryId(+selectedCategory).then((response) => {
        const { data } = response;
        setAttirbutes(data);
      });
    }
  };

  useEffect(() => {
    if (selectedSubCategory) {
      getProductAttributeBySubCategoryId(+selectedSubCategory).then((response) => {
        const { data } = response;
        setAttirbutes(data);
      });
    } else if (selectedCategory) {
      getProductAttributeByCategoryId(+selectedCategory).then((response) => {
        const { data } = response;
        setAttirbutes(data);
      });
    }
  }, [selectedCategory, selectedSubCategory]);

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
        <h5>Attribute</h5>
      </div>
      <div className='d-flex flex-column gap-3 p-3'>
        <div className='d-flex flex-md-row flex-column gap-3'>
          <div className='w-md-50 w-100'>
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
          <div className='w-md-50 w-100'>
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
        </div>
        {selectedCategory && (
          <AddAttribute
            selectedCategory={+selectedCategory}
            selectedSubCategory={+selectedSubCategory}
            fetchAttributes={fetchAttributes}
            productAttribute={newAttirbute}
            setProductAttribute={setNewAttirbute}
          />
        )}

        <div className='border p-3'>
          {attirbutes.length > 0 ? (
            <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3'>
              {attirbutes.map((attirbute: CreateProductAttribute) => (
                <div key={attirbute.id}>
                  <div className='border rounded h-100'>
                    <div className='d-flex justify-content-between align-items-center rounded-top px-2 py-1 bg-info text-white'>
                      <div>
                        <span className='fw-bold'>{attirbute.name}</span>
                      </div>
                      <div className='d-flex gap-2'>
                        <AppButton
                          onClick={() => {
                            handleUpdateAttribute(attirbute);
                          }}
                          className='icon-btn'
                        >
                          <FaRegEdit size={20} />
                        </AppButton>
                        <AppButton
                          onClick={() => {
                            handleModalShow(attirbute);
                          }}
                          className='icon-btn'
                        >
                          <RiDeleteBin6Line size={20} />
                        </AppButton>
                      </div>
                    </div>
                    {attirbute.attributeValues.length > 0 && (
                      <div className='d-flex flex-column gap-1 p-2'>
                        {attirbute.attributeValues.map((attributeValue) => (
                          <div key={attributeValue.id} className='bg-light px-2'>
                            <span>{attributeValue.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyBox message='No Attribute' />
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
            You want to delete product attribute:{' '}
            <span className='fw-bold'>{selectedAttribute.name}</span>
          </div>
        </div>
      </AppModal>

      <ToastContainer position='bottom-end' className='position-fixed m-1'>
        <Toast
          onClose={() => setStatus(STATUS.IDLE)}
          show={status === STATUS.ERROR}
          delay={4000}
          autohide
          bg='danger'
        >
          <ToastHeader>
            <strong className='me-auto'>Fail!</strong>
          </ToastHeader>
          <ToastBody className='text-white'>Failed to delete product attribute</ToastBody>
        </Toast>

        <Toast
          onClose={() => {
            setStatus(STATUS.IDLE);
          }}
          show={status === STATUS.SUCCESS}
          delay={4000}
          autohide
          bg='success'
        >
          <ToastHeader>
            <strong className='me-auto'>Success!</strong>
          </ToastHeader>
          <ToastBody className='text-white'>Product attribute deleted successfully</ToastBody>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ProductAttributeManagement;
