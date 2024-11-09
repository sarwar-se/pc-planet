import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

const TopBar: React.FC<{
  showSidebar: any;
  handleCloseSidebar: Function;
}> = ({ showSidebar, handleCloseSidebar }) => {
  const [activeFirstLayer, setActiveFirstLayer] = useState<string | null>(null);
  const [activeSecondLayer, setActiveSecondLayer] = useState<string | null>(
    null
  );

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
              href="#desktop"
            >
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

                <Dropdown
                  onMouseEnter={() =>
                    handleSecondLayerMouseEnter("Motherboard")
                  }
                  onMouseLeave={handleSecondLayerMouseLeave}
                  show={activeSecondLayer === "Motherboard"}
                  drop="end"
                >
                  <Dropdown.Toggle as="span" className="first-layer-menu-item">
                    Motherboard
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="second-layer-menu">
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#msi"
                    >
                      MSI
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#msi"
                    >
                      ASRock
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#msi"
                    >
                      Gigabute
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="second-layer-menu-item"
                      href="#msi"
                    >
                      Asus
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

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
    </>
  );
};

export default TopBar;
