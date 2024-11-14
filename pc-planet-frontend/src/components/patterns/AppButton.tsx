import React from "react";

const AppButton: React.FC<{
  onClick: Function;
  className: String;
  children: any;
}> = ({ onClick, className = "bg-secondary", children, ...rest }) => {
  return (
    <button
      className={`app-btn ${className}`}
      onClick={() => onClick()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AppButton;
