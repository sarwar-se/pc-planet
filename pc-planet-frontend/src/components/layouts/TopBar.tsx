import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { AppContext } from "./Layout";

const TopBar: React.FC<{
  showSidebar: any;
  handleCloseSidebar: Function;
}> = ({ showSidebar, handleCloseSidebar }) => {
  const [activeFirstLayer, setActiveFirstLayer] = useState<string | null>(null);
  const [activeSecondLayer, setActiveSecondLayer] = useState<string | null>(
    null
  );

  const { setCategory } = useContext(AppContext)!;

  const onClickHandler = (value: string) => {
    setCategory(value);
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
              href="#desktop"
              onClick={() => onClickHandler("Desktop")}
            >
              Desktop
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              href="#laptop"
              onClick={() => onClickHandler("Laptop")}
            >
              Laptop
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              href="#monitor"
              onClick={() => onClickHandler("Monitor")}
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
                    onClick={() => onClickHandler("Processor")}
                  >
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
                  <Dropdown.Toggle
                    as="span"
                    className="first-layer-menu-item"
                    onClick={() => onClickHandler("Motherboard")}
                  >
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
                  onClick={() => onClickHandler("Graphics Card")}
                >
                  Graphics Card
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              className="custom-nav-link"
              href="#ups"
              onClick={() => onClickHandler("Ups")}
            >
              UPS
            </Nav.Link>
            <Nav.Link
              className="custom-nav-link"
              href="#camera"
              onClick={() => onClickHandler("Camera")}
            >
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
