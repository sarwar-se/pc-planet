import React from "react";
import Pattern from "./Pattern.module.css";

const AppButton: React.FC<{
  onClick: Function;
  className: String;
  children: any;
}> = ({ onClick, className = "bg-secondary", children, ...rest }) => {
  return (
    <button
      className={`${Pattern.app_btn} ${className}`}
      onClick={() => onClick()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AppButton;
