import React, { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { ProductBrand, ProductCategory, ProductSubCategory } from './NavigationBar';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';

const SideBar: React.FC<{
  categories: ProductCategory[];
  showSidebar: boolean;
  handleCloseSidebar: () => void;
}> = ({ categories, showSidebar, handleCloseSidebar }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (item: string) => {
    setExpanded((prev: Record<string, boolean>) => ({ ...prev, [item]: !prev[item] }));
  };

  const showProducts = (category: string, subCategory: string, brand: string) => {
    handleCloseSidebar();
    setExpanded({});
    if (brand) {
      navigate(appRoutes.productViewCategorySubCategoryBrandWise(category, subCategory, brand));
    } else if (subCategory) {
      navigate(appRoutes.productViewCategorySubCategoryWise(category, subCategory));
    } else {
      navigate(appRoutes.productViewCategoryWise(category));
    }
  };

  return (
    <>
      <Navbar expand='xl' className='d-xl-none py-0'>
        <Container>
          <Offcanvas
            show={showSidebar}
            onHide={handleCloseSidebar}
            placement='start'
            className='custom-offcanvas'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='flex-column sidebar-nav'>
                {categories.map((category: ProductCategory, i: number) => (
                  <div key={i} className=''>
                    <div className='d-flex justify-content-between align-items-center nav-parent nav-item-group'>
                      <Nav.Link
                        onClick={() => showProducts(category.name, '', '')}
                        className={expanded[category.name] ? 'active-main' : ''}
                      >
                        {category.name}
                      </Nav.Link>
                      <span onClick={() => toggleExpand(category.name)}>
                        {expanded[category.name] && category.subCategories ? (
                          <PiMinus size={16} />
                        ) : (
                          <PiPlus size={16} />
                        )}
                      </span>
                    </div>
                    {expanded[category.name] &&
                      category.subCategories &&
                      category.subCategories.length > 0 &&
                      category.subCategories.map((subCat: ProductSubCategory, i: number) => (
                        <div key={i} className='nav-item-group '>
                          <div className='d-flex justify-content-between align-items-center nav-parent ms-3'>
                            <Nav.Link
                              onClick={() => showProducts(category.name, subCat.name, '')}
                              className={expanded[subCat.name] ? 'active-sub' : ''}
                            >
                              {subCat.name}
                            </Nav.Link>
                            {subCat.brands && subCat.brands.length > 0 && (
                              <span onClick={() => toggleExpand(subCat.name)}>
                                {expanded[subCat.name] ? (
                                  <PiMinus size={16} />
                                ) : (
                                  <PiPlus size={16} />
                                )}
                              </span>
                            )}
                          </div>
                          {expanded[subCat.name] &&
                            subCat.brands &&
                            subCat.brands.length > 0 &&
                            subCat.brands.map((brand: ProductBrand, i: number) => (
                              <div key={i} className='nav-item-sub'>
                                <div className='d-flex justify-content-between align-items-center nav-parent ms-5'>
                                  <Nav.Link
                                    onClick={() =>
                                      showProducts(category.name, subCat.name, brand.name)
                                    }
                                  >
                                    {brand.name}
                                  </Nav.Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default SideBar;
