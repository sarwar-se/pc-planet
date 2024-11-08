import React, { useState } from "react";
import "./topbar.css";
import { Navbar, Nav, Container, Offcanvas, Dropdown } from "react-bootstrap";
import {
  BsFillLightningFill,
  BsFillPersonFill,
  BsFillGiftFill,
} from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";
import { GrCompare } from "react-icons/gr";

import Header from "./Header";

const NavigationBar: React.FC = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showFirstLayer, setShowFirstLayer] = useState(false);
  const [showSecondLayer, setShowSecondLayer] = useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    <div>
      {/* Top Navigation Bar */}
      <Header handleShowSidebar={handleShowSidebar} />

      {/* Secondary Navbar for Categories (Desktop View) */}
      <Navbar
        bg="light"
        expand="xl"
        className="d-none d-xl-flex border-bottom shadow-sm"
      >
        <Container>
          <Nav className="mx-0">
            <Nav.Link className="custom-nav-link" href="#desktop">
              Desktop
            </Nav.Link>
            <Nav.Link className="custom-nav-link" href="#laptop">
              Laptop
            </Nav.Link>
            <Nav.Link className="custom-nav-link" href="#monitor">
              Monitor
            </Nav.Link>

            {/* First Layer Dropdown */}
            <Dropdown
              onMouseEnter={() => setShowFirstLayer(true)}
              onMouseLeave={() => setShowFirstLayer(false)}
              show={showFirstLayer}
            >
              <Dropdown.Toggle
                as={Nav.Link}
                className="main-menu-item custom-nav-link"
              >
                Component
              </Dropdown.Toggle>

              <Dropdown.Menu className="first-layer-menu">
                <Dropdown
                  onMouseEnter={() => setShowSecondLayer(true)}
                  onMouseLeave={() => setShowSecondLayer(false)}
                  show={showSecondLayer}
                  drop="end"
                >
                  <Dropdown.Toggle as="span" className="first-layer-menu-item">
                    Processor
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="second-layer-menu">
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#amd"
                    >
                      AMD
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#intel"
                    >
                      Intel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Second Layer Dropdown - Inside the First Layer */}
                <Dropdown.Item className="first-layer-menu-item" href="#cooler">
                  CPU Cooler
                </Dropdown.Item>

                <Dropdown.Item
                  className="first-layer-menu-item"
                  href="#motherboard"
                >
                  Motherboard
                </Dropdown.Item>
                <Dropdown.Item
                  className="first-layer-menu-item"
                  href="#graphics-card"
                >
                  Graphics Card
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link className="custom-nav-link" href="#ups">
              UPS
            </Nav.Link>
            <Nav.Link className="custom-nav-link" href="#camera">
              Camera
            </Nav.Link>
            <Nav.Link className="custom-nav-link" href="#accessories">
              Accessories
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar for Mobile View */}
      <Navbar expand="xl" className="d-xl-none py-0">
        <Container>
          <Offcanvas
            show={showSidebar}
            onHide={handleCloseSidebar}
            placement="start"
            className="custom-offcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column custom-offcanvas-nav">
                <Nav.Link href="#desktop">Desktop</Nav.Link>
                <Nav.Link href="#laptop">Laptop</Nav.Link>
                <Nav.Link href="#component">Component</Nav.Link>
                <Nav.Link href="#monitor">Monitor</Nav.Link>
                <Nav.Link href="#ups">UPS</Nav.Link>
                <Nav.Link href="#camera">Camera</Nav.Link>
                <Nav.Link href="#accessories">Accessories</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      {/* Bottom Navigation Bar for Small, Medium, Large Screens & Mobile View */}
      <Navbar
        fixed="bottom"
        bg="light"
        className="d-xl-none py-0 border-top fw-bold "
      >
        <Nav className="d-flex justify-content-around w-100">
          <Nav.Link href="#offers" className="text-center">
            <BsFillGiftFill size={20} color="blueviolet" />
            <div style={{ fontSize: "0.75rem" }}>Offers</div>
          </Nav.Link>
          <Nav.Link href="#happy-hour" className="text-center">
            <div className="fill-lightning">
              {<BsFillLightningFill size={20} color="blueviolet" />}
            </div>
            <div style={{ fontSize: "0.75rem" }}>Happy Hour</div>
          </Nav.Link>
          <Nav.Link href="#pc-builder" className="text-center">
            <FaComputer size={20} color="blueviolet" />
            <div style={{ fontSize: "0.75rem" }}>PC Builder</div>
          </Nav.Link>
          <Nav.Link href="#compare" className="text-center">
            <GrCompare size={20} color="blueviolet" />
            <div style={{ fontSize: "0.75rem" }}>Compare</div>
          </Nav.Link>
          <Nav.Link href="#account" className="text-center">
            <BsFillPersonFill size={20} color="blueviolet" />
            <div style={{ fontSize: "0.75rem" }}>Account</div>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
