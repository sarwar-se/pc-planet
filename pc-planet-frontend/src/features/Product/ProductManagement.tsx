import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from './productApi';
import { Table } from 'react-bootstrap';
import { ProductInfo } from '../models/Product';
import { getAvailabilityType, getImageUrl } from '../../utils/helperFunction';
import { AppButton } from '../../components';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuView } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';
import AppModal from '../../components/patterns/AppModal';
import { STATUS } from '../../constants/appConstants';
import axios from 'axios';
import AppToastContainer from '../../components/patterns/AppToastContainer';
import no_image from '../../assets/images/empty.jpg';

const initialValue = {
  id: null,
  name: '',
  code: '',
  model: '',
  price: null,
  status: undefined,
  brand: null,
  category: null,
  keyFeatures: [],
  image: '',
};

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSetectedProduct] = useState<ProductInfo>(initialValue);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const handleViewProductDetails = (id: number | null, name: string) => {
    navigate(appRoutes.productDetails(name), { state: { productId: id } });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = (product: ProductInfo) => {
    setSetectedProduct(product);
    setShowModal(true);
  };

  const deleteProductById = (id: number | null) => {
    handleModalClose();
    if (id !== null) {
      deleteProduct(id)
        .then(() => {
          setStatus(STATUS.SUCCESS);
          fetchProducts();
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
    }
  };

  const updateProduct = (productId: number | null) => {
    if (productId !== null) {
      navigate(appRoutes.editProduct(productId));
    }
  };

  const fetchProducts = () => {
    getProducts().then((response) => {
      const { data } = response;
      setProducts(data);
    });
  };

  useEffect(() => {
    getProducts().then((response) => {
      const { data } = response;
      setProducts(data);
    });
  }, []);

  return (
    <div className='container'>
      <div>
        <div>
          <h5>Products</h5>
        </div>
        <Table responsive hover className='custom-table'>
          <thead className='fw-bold'>
            <tr>
              <td>
                <div className='ps-3'>SN</div>
              </td>
              <td>Code</td>
              <td>Image</td>
              <td>Name</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductInfo, i) => (
              <tr key={i}>
                <td>
                  <div className='ps-3'>{i + 1}</div>
                </td>
                <td>{product.code}</td>
                <td>
                  <div>
                    <img
                      src={product.image ? getImageUrl(product.image) : no_image}
                      style={{ width: '50px' }}
                    />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{getAvailabilityType(product.status)}</td>
                <td>
                  <div className='d-flex gap-3 justify-content-end pe-3'>
                    <div title='Details'>
                      <AppButton
                        className='icon-btn'
                        onClick={() => {
                          handleViewProductDetails(product.id, product.name);
                        }}
                      >
                        <LuView size={26} color={'gray'} />
                      </AppButton>
                    </div>
                    <div title='Edit'>
                      <AppButton
                        className='icon-btn'
                        onClick={() => {
                          updateProduct(product.id);
                        }}
                      >
                        <FaRegEdit size={26} color={'green'} />
                      </AppButton>
                    </div>
                    <div title='Delete'>
                      <AppButton className='icon-btn' onClick={() => handleModalShow(product)}>
                        <RiDeleteBin6Line size={26} color={'red'} />
                      </AppButton>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <AppModal
        show={showModal}
        title='Are you sure?'
        acceptButtonText='Delete'
        acceptBtnVariant='danger'
        handleCancelButton={handleModalClose}
        handleAcceptButton={() => deleteProductById(selectedProduct.id)}
        centered
      >
        <div>
          You Are deleting the following product:
          <div className='fw-bold'>{selectedProduct.name}</div>
        </div>
      </AppModal>

      <AppToastContainer
        status={status}
        updateStatus={setStatus}
        errorMessage={errorMessage}
        successMessage={'Product deleted successfully'}
      />
    </div>
  );
};

export default ProductManagement;
