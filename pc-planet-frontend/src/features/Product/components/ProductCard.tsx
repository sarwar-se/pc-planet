import React from 'react';
import { Card } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa6';
import { getImageUrl, numberFormat, productStatusMap } from '../../../utils/helperFunction';
import { AppButton } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../routes/appRoutes';
import { PRODUCT_STATUS } from '../../../utils/appConstant';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { keyFeatures } = product;
  const no_image = 'no_image.png';
  const navigate = useNavigate();

  const getProductStatus = (value: string) => {
    const status = productStatusMap().find((item) => item.value === value);
    return status ? status.label : undefined;
  };

  const handleProductClick = (productId: number, productName: string) => {
    navigate(appRoutes.productDetails(productName), { state: { productId } });
  };

  const isButtonDisabled = (status: string) => {
    if (status === PRODUCT_STATUS.UP_COMING || status === PRODUCT_STATUS.OUT_OF_STOCK) {
      return true;
    }

    return false;
  };

  return (
    <Card className='product-card'>
      <Card.Header className='product-card-header'>
        <Card.Img
          className='p-2'
          variant='top'
          src={getImageUrl(`${product.image ? product.image : no_image}`)}
          onClick={() => {
            handleProductClick(product.id, product.name);
          }}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: 14, marginTop: 0 }}>{product.name}</Card.Title>
        <Card.Text style={{ fontSize: 13 }}>
          <div className='opacity-75'>
            <ul>
              {keyFeatures.map((keyFeature: any, i: number) => (
                <li key={i}>
                  {keyFeature.name ? keyFeature.name + ': ' + keyFeature.value : keyFeature.value}
                </li>
              ))}
            </ul>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className='product-footer'>
        <div className='text-center text-danger fw-bold mb-2'>
          {product.status === 'IN_STOCK'
            ? numberFormat(product.price) + '৳'
            : getProductStatus(product.status)}
        </div>
        {!isButtonDisabled(product.status) ? (
          <AppButton className='add-cart-button' onClick={() => null}>
            <FaCartPlus size={20} /> Add To Cart
          </AppButton>
        ) : (
          <AppButton className='add-cart-button-disabled' onClick={() => null}>
            {getProductStatus(product.status)}
          </AppButton>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
