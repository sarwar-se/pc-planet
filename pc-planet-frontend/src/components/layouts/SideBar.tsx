import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const SideBar: React.FC<{ showSidebar: any; handleCloseSidebar: Function }> = ({
  showSidebar,
  handleCloseSidebar,
}) => {
  return (
    <>
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
    </>
  );
};

export default SideBar;
