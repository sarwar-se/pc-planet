import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";

const TopBar: React.FC = () => {
  const [activeFirstLayer, setActiveFirstLayer] = useState<string | null>(null);
  const [activeSecondLayer, setActiveSecondLayer] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const showProducts = (category: string) => {
    navigate(appRoutes.productView(category));
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
      setActiveFirstLayer(null);
    }, 200);
  };

  // Handlers to open/close second layer with delay
  const handleSecondLayerMouseEnter = (item: string) => {
    setActiveSecondLayer(item);
    clearTimeout(secondLayerTimeout);
  };

  const handleSecondLayerMouseLeave = () => {
    secondLayerTimeout = setTimeout(() => {
      setActiveSecondLayer(null);
    }, 200);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="xl"
        className="d-none d-xl-flex border-bottom shadow-sm navigation-bar"
      >
        <Container className="navigation-bar">
          <Nav className="mx-0 navigation-bar">
            <Nav.Link
              className="custom-nav-link navigation-bar"
              onClick={() => showProducts("Desktop")}
            >
              Desktop
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              onClick={() => showProducts("Laptop")}
            >
              Laptop
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              onClick={() => showProducts("Monitor")}
            >
              Monitor
            </Nav.Link>

            {/* First Layer Dropdown */}
            <Dropdown
              onMouseEnter={() => handleFirstLayerMouseEnter("Component")}
              onMouseLeave={handleFirstLayerMouseLeave}
              show={activeFirstLayer === "Component"}
            >
              <Dropdown.Toggle
                as={Nav.Link}
                className="main-menu-item custom-nav-link"
              >
                Component
              </Dropdown.Toggle>

              <Dropdown.Menu className="first-layer-menu">
                <Dropdown
                  onMouseEnter={() => handleSecondLayerMouseEnter("Processor")}
                  onMouseLeave={handleSecondLayerMouseLeave}
                  show={activeSecondLayer === "Processor"}
                  drop="end"
                >
                  <Dropdown.Toggle
                    as="span"
                    className="first-layer-menu-item"
                    onClick={() => showProducts("Processor")}
                  >
                    Processor
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="second-layer-menu">
                    <Dropdown.Item className="second-layer-menu-item">
                      AMD
                    </Dropdown.Item>
                    <Dropdown.Item className="second-layer-menu-item">
                      Intel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  onMouseEnter={() =>
                    handleSecondLayerMouseEnter("Motherboard")
                  }
                  onMouseLeave={handleSecondLayerMouseLeave}
                  show={activeSecondLayer === "Motherboard"}
                  drop="end"
                >
                  <Dropdown.Toggle
                    as="span"
                    className="first-layer-menu-item"
                    onClick={() => showProducts("Motherboard")}
                  >
                    Motherboard
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="second-layer-menu">
                    <Dropdown.Item className="second-layer-menu-item">
                      MSI
                    </Dropdown.Item>
                    <Dropdown.Item className="second-layer-menu-item">
                      ASRock
                    </Dropdown.Item>
                    <Dropdown.Item className="second-layer-menu-item">
                      Gigabute
                    </Dropdown.Item>
                    <Dropdown.Item className="second-layer-menu-item">
                      Asus
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown.Item
                  className="first-layer-menu-item"
                  onClick={() => showProducts("Graphics Card")}
                >
                  Graphics Card
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              className="custom-nav-link"
              onClick={() => showProducts("Ups")}
            >
              UPS
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              onClick={() => showProducts("Camera")}
            >
              Camera
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              onClick={() => showProducts("Accessories")}
            >
              Accessories
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
