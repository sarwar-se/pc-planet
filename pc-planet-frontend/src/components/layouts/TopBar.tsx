import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';
import { getProductCategories } from '../../features/Product/productApi';

type ProductBrand = {
  id: number;
  name: string;
};

type ProductSubCategory = {
  id: number;
  name: string;
  brands: ProductBrand[];
};

interface ProductCategory {
  id: number;
  name: string;
  subCategories: ProductSubCategory[];
}

const TopBar: React.FC = () => {
  const [activeFirstLayer, setActiveFirstLayer] = useState<string>('');
  const [activeSecondLayer, setActiveSecondLayer] = useState<string>('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([
    {
      id: 0,
      name: '',
      subCategories: [],
    },
  ]);

  const hideCategoryLayer = () => {
    setActiveFirstLayer('');
    setActiveSecondLayer('');
  };

  const showProducts = (category: string, subCategory: string, brand: string) => {
    if (brand) {
      hideCategoryLayer();
      navigate(appRoutes.productViewCategorySubCategoryBrandWise(category, subCategory, brand));
    } else if (subCategory) {
      hideCategoryLayer();
      navigate(appRoutes.productViewCategorySubCategoryWise(category, subCategory));
    } else {
      hideCategoryLayer();
      navigate(appRoutes.productViewCategoryWise(category));
    }
  };

  // Timeout references for delayed closing
  let firstLayerTimeout: NodeJS.Timeout;
  let secondLayerTimeout: NodeJS.Timeout;

  // Handlers to open/close first layer with delay
  const handleFirstLayerMouseEnter = (item: string) => {
    setActiveFirstLayer(item);
    clearTimeout(firstLayerTimeout);
  };

  const handleFirstLayerMouseLeave = () => {
    firstLayerTimeout = setTimeout(() => {
      setActiveFirstLayer('');
    }, 200);
  };

  // Handlers to open/close second layer with delay
  const handleSecondLayerMouseEnter = (item: string) => {
    setActiveSecondLayer(item);
    clearTimeout(secondLayerTimeout);
  };

  const handleSecondLayerMouseLeave = () => {
    secondLayerTimeout = setTimeout(() => {
      setActiveSecondLayer('');
    }, 200);
  };

  useEffect(() => {
    getProductCategories()
      .then((response) => {
        const { data } = response;
        setCategories(data);
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar
        bg='light'
        expand='xl'
        className='d-none d-xl-flex border-bottom shadow-sm navigation-bar'
      >
        <Container className='navigation-bar'>
          <Nav className='mx-0 navigation-bar'>
            {categories.map((category: ProductCategory, i: number) => (
              <Dropdown
                key={i}
                onMouseEnter={() => handleFirstLayerMouseEnter(category.name)}
                onMouseLeave={handleFirstLayerMouseLeave}
                show={activeFirstLayer === category.name}
              >
                <Dropdown.Toggle
                  as={Nav.Link}
                  className='main-menu-item custom-nav-link'
                  onClick={() => showProducts(category.name, '', '')}
                >
                  {category.name}
                </Dropdown.Toggle>
                {category.subCategories && category.subCategories.length > 0 && (
                  <Dropdown.Menu className='first-layer-menu'>
                    {category.subCategories.map((subCat: ProductSubCategory, i: number) => (
                      <Dropdown
                        key={i}
                        onMouseEnter={() => handleSecondLayerMouseEnter(subCat.name)}
                        onMouseLeave={handleSecondLayerMouseLeave}
                        show={activeSecondLayer === subCat.name}
                        drop='end'
                      >
                        <Dropdown.Toggle
                          as='span'
                          className='first-layer-menu-item'
                          onClick={() => showProducts(category.name, subCat.name, '')}
                        >
                          {subCat.name}
                        </Dropdown.Toggle>
                        {subCat.brands && subCat.brands.length > 0 && (
                          <Dropdown.Menu className='second-layer-menu'>
                            {subCat.brands.map((brand: ProductBrand, i: number) => (
                              <Dropdown.Item
                                key={i}
                                className='second-layer-menu-item'
                                onClick={() => showProducts(category.name, subCat.name, brand.name)}
                              >
                                {brand.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        )}
                      </Dropdown>
                    ))}
                  </Dropdown.Menu>
                )}
              </Dropdown>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
