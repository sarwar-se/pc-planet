import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import {
  BsFillLightningFill,
  BsFillPersonFill,
  BsFillGiftFill,
} from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";
import { GrCompare } from "react-icons/gr";

const BottomBar: React.FC<{}> = () => {
  return (
    <>
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
    </>
  );
};

export default BottomBar;
