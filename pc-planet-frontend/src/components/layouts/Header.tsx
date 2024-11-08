import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { BsFillGiftFill } from "react-icons/bs";
import { FaBolt, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import AppButton from "../patterns/AppButton";
import { computer_planet } from "../../assets";

const Header: React.FC<{ handleShowSidebar: Function }> = ({
  handleShowSidebar,
}) => {
  const [showInput, setShowInput] = useState(false);

  const toggleSearch = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  return (
    <>
      <Navbar expand="xl" className="custom-header">
        <Container>
          {/* Left Side Category Button for Small, Medium, Large Screens & Mobile View */}
          <AppButton
            onClick={handleShowSidebar}
            className={"btn-category d-xl-none fw-bol"}
          >
            ☰ Categories
          </AppButton>

          <Navbar.Brand href="#home">
            <img alt="" src={computer_planet} width="90" />
          </Navbar.Brand>

          {/* Right Side Icons for Small, Medium, Large Screens & Mobile View */}
          <div className="d-flex d-xl-none gap-3">
            <Nav.Link
              href="#search"
              className="text-light"
              onClick={toggleSearch}
            >
              <FaSearch size={20} color="orange" />
            </Nav.Link>

            <Nav.Link href="#cart" className="text-light position-relative">
              <span>
                <FaShoppingCart size={20} color="orange" />
                <span className="cart-count">9</span>
              </span>
            </Nav.Link>
          </div>

          <Navbar.Collapse>
            <Form className="d-flex mx-auto search-form">
              <FormControl
                className="custom-search-form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="outline-warning bg-warning custom-search-btn">
                <FaSearch size={20} color="blueviolet" />
              </Button>
            </Form>

            {/* Navigation Links */}
            <Nav className="d-flex align-items-center gap-2">
              <Nav.Link
                className="d-flex align-items-center gap-2"
                href="#offers"
              >
                <BsFillGiftFill size={20} color="orange" />
                <div className="d-flex flex-column">
                  <div className="text-white">Offers</div>
                  <div className="text-danger" style={{ fontSize: "12px" }}>
                    28 Dec Ends
                  </div>
                </div>
              </Nav.Link>

              <Nav.Link
                className="d-flex align-items-center gap-2"
                href="#happyhour"
              >
                <FaBolt size={20} color="orange" className="fill-lightning" />
                <div className="d-flex flex-column">
                  <div className="text-white">Happy Hour</div>
                  <span className="small-text">Special Deals</span>
                </div>
              </Nav.Link>

              <Nav className="d-flex align-items-center gap-2">
                <FaUser size={20} color="orange" cursor={"pointer"} />
                <div className="d-flex flex-column">
                  <div className="text-white pointer">Account</div>
                  <div className="d-flex flex-row gap-1">
                    <span className="login-register">Register</span>
                    <span className="small-text">/</span>
                    <span className="login-register">Login</span>
                  </div>
                </div>
              </Nav>

              <Nav.Link
                href="#cart"
                className="text-light position-relative d-flex flex-column"
              >
                <span>
                  <FaShoppingCart size={20} color="orange" />
                  <span className="cart-count">9</span>
                </span>
                {/* <span className="">৳ {convertToBanglaDigits(999999.99)}</span> */}
              </Nav.Link>
            </Nav>

            <AppButton
              onClick={handleShowSidebar}
              className={"pc-builder-button"}
            >
              PC Builder
            </AppButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showInput && (
        <Form className="d-flex d-xl-none mx-auto shadow">
          <FormControl
            className="custom-search-form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Button variant="outline-warning bg-warning custom-search-btn">
            <FaSearch size={20} color="blueviolet" />
          </Button>
        </Form>
      )}
    </>
  );
};

export default Header;
