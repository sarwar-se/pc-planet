import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsFillGiftFill } from 'react-icons/bs';
import { FaBolt, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import AppButton from '../patterns/AppButton';
import { computer_planet } from '../../assets';
import AppSearchField from '../patterns/AppSearchField';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';

const Header: React.FC<{ handleShowSidebar: () => void }> = ({ handleShowSidebar }) => {
  const [showInputField, setShowInputField] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowInputField((prevShowInput) => !prevShowInput);
  };

  return (
    <>
      <Navbar expand='xl' className='app-main-color'>
        <Container>
          {/* Left Side Category Button for Small, Medium, Large Screens & Mobile View */}
          <AppButton onClick={handleShowSidebar} className={'btn-category d-xl-none fw-bol'}>
            ☰ Categories
          </AppButton>

          <Navbar.Brand onClick={() => navigate(appRoutes.root)}>
            <img alt='' src={computer_planet} width='90' />
          </Navbar.Brand>

          {/* Right Side Icons for Small, Medium, Large Screens & Mobile View */}
          <div className='d-flex d-xl-none gap-3'>
            <Nav.Link href='#search' className='text-light' onClick={toggleSearch}>
              <FaSearch size={20} color='orange' />
            </Nav.Link>

            <Nav.Link href='#cart' className='text-light position-relative'>
              <span>
                <FaShoppingCart size={20} color='orange' />
                <span className='cart-count'>9</span>
              </span>
            </Nav.Link>
          </div>

          <Navbar.Collapse>
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <div className='m-auto'>
                <AppSearchField formClassName={''} resultClassName={''} />
              </div>

              {/* Navigation Links */}
              <div>
                <Nav className='d-flex align-items-center gap-2'>
                  <Nav.Link className='d-flex align-items-center gap-2' href='#offers'>
                    <BsFillGiftFill size={20} color='orange' />
                    <div className='d-flex flex-column'>
                      <div className='text-white'>Offers</div>
                      <div className='text-warning' style={{ fontSize: '12px' }}>
                        28 Dec Ends
                      </div>
                    </div>
                  </Nav.Link>

                  <Nav.Link className='d-flex align-items-center gap-2' href='#happyhour'>
                    <FaBolt size={20} color='orange' className='fill-lightning' />
                    <div className='d-flex flex-column'>
                      <div className='text-white'>Happy Hour</div>
                      <span className='small-text'>Special Deals</span>
                    </div>
                  </Nav.Link>

                  <Nav className='d-flex align-items-center gap-2'>
                    <FaUser size={20} color='orange' cursor={'pointer'} />
                    <div className='d-flex flex-column'>
                      <div className='text-white pointer'>Account</div>
                      <div className='d-flex flex-row gap-1'>
                        <span className='login-register'>Register</span>
                        <span className='small-text'>/</span>
                        <span className='login-register'>Login</span>
                      </div>
                    </div>
                  </Nav>

                  <Nav.Link
                    href='#cart'
                    className='text-light position-relative d-flex flex-column'
                  >
                    <span>
                      <FaShoppingCart size={20} color='orange' />
                      <span className='cart-count'>9</span>
                    </span>
                  </Nav.Link>
                  <AppButton onClick={handleShowSidebar} className={'pc-builder-button'}>
                    PC Builder
                  </AppButton>
                </Nav>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showInputField && (
        <AppSearchField
          formClassName={'d-xl-none shadow'}
          resultClassName={'w-100 position-relative'}
        />
      )}
    </>
  );
};

export default Header;
