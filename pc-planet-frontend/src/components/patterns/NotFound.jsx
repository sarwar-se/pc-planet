import React from "react";
import { not_found_icon } from "../../assets";

const NotFound = ({ primaryText = "Not Found!", secondaryText }) => {
  return (
    <div className="d-flex flex-column align-items-center p-5">
      <div className="text-">
        <img src={not_found_icon} width={60} alt="Not found" />
      </div>
      <div className="text-center">
        <h6 className=" opacity-50">{primaryText}</h6>
        <h6 className=" opacity-75">{secondaryText}</h6>
      </div>
    </div>
  );
};

export default NotFound;
