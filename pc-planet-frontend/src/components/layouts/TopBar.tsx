import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';
import { ProductBrand, ProductCategory, ProductSubCategory } from './NavigationBar';

const TopBar: React.FC<{ categories: ProductCategory[] }> = ({ categories }) => {
  const [activeFirstLayer, setActiveFirstLayer] = useState<string>('');
  const [activeSecondLayer, setActiveSecondLayer] = useState<string>('');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('');

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
    setActiveCategory(item);
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
                  className={`main-menu-item ${
                    activeCategory === category.name && activeSecondLayer && 'active-color'
                  }`}
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
                        className={`${
                          activeSecondLayer === subCat.name && 'active-background-color'
                        }`}
                        drop='end'
                      >
                        {subCat.brands && subCat.brands.length > 0 ? (
                          <Dropdown.Toggle
                            as='span'
                            className={`first-layer-menu-item`}
                            onClick={() => showProducts(category.name, subCat.name, '')}
                          >
                            {subCat.name}
                          </Dropdown.Toggle>
                        ) : (
                          <Dropdown.Item
                            as='span'
                            className='first-layer-menu-item'
                            onClick={() => showProducts(category.name, subCat.name, '')}
                          >
                            {subCat.name}
                          </Dropdown.Item>
                        )}

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
