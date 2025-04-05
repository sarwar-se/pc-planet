import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl, Image } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getSearchedProduct } from '../../features/Product/productApi';
import { no_image } from '../../assets';
import { getImageUrl, numberFormat } from '../../utils/helperFunction';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';
import { AppContext } from '../layouts/Layout';
import { ProductInfo } from '../../features/models/Product';

const AppSearchField: React.FC<{
  formClassName?: string;
  resultClassName?: string;
}> = ({ formClassName, resultClassName }) => {
  const [query, setQuery] = useState('');
  const [foundProducts, setFoundProducts] = useState<ProductInfo[]>([
    {
      id: 0,
      name: '',
      code: '',
      model: '',
      price: 0,
      status: 'OUT_OF_STOCK',
      brand: null,
      category: null,
      keyFeatures: [],
      image: '',
    },
  ]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext must be used within a AppContext.Provider');
  }
  const { setProducts } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value !== '');
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 500);
  };

  const handleFocus = () => {
    setTimeout(() => setShowResults(query !== ''), 500);
  };

  const clearSearchField = () => {
    setShowResults(false);
    setQuery('');
  };

  const showProducts = (query: string) => {
    setProducts(foundProducts);
    clearSearchField();
    navigate(appRoutes.searchProduct(query));
  };

  const handleProductClick = (productId: number, productName: string) => {
    clearSearchField();
    navigate(appRoutes.productDetails(productName), { state: { productId } });
  };

  useEffect(() => {
    getSearchedProduct(query).then((response) => {
      setFoundProducts(response.data);
    });
  }, [query]);

  return (
    <>
      <Form className={`d-flex search-form ${formClassName}`}>
        <FormControl
          className='custom-search-form-control'
          type='search'
          placeholder='Search'
          aria-label='Search'
          value={query}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <Button variant='outline-warning custom-search-btn' onClick={() => showProducts(query)}>
          <FaSearch size={20} color='blueviolet' />
        </Button>
      </Form>

      {showResults && (
        <div className={`search-result ${resultClassName}`}>
          <ul className='product-list mt-1'>
            {foundProducts.length ? (
              <>
                {foundProducts.slice(0, 5).map((product: ProductInfo, i: number) => (
                  <li
                    key={i}
                    className='product-item d-flex align-items-center gap-3'
                    onClick={() => {
                      handleProductClick(product.id, product.name);
                    }}
                  >
                    <Image
                      style={{ width: '60px', height: '60px' }}
                      src={`${product.image ? getImageUrl(product.image) : no_image}`}
                    />
                    <div className='d-flex flex-column gap-1'>
                      <span>{product.name}</span>
                      <span className='text-danger fw-bold'>
                        {numberFormat(product.price)}
                        {'৳'}
                      </span>
                    </div>
                  </li>
                ))}

                {foundProducts.length > 5 && (
                  <div className='see-all'>
                    <span onClick={() => showProducts(query)}>See all results</span>
                  </div>
                )}
              </>
            ) : (
              <div className='text-center'>
                <span className='opacity-75 p-3'>No Search Result Found</span>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default AppSearchField;
