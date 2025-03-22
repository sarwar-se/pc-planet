import React from 'react';

const AppButton: React.FC<{
  onClick: any;
  className: string;
  children: any;
}> = ({ onClick, className, children, ...rest }) => {
  return (
    <button className={`app-btn ${className}`} onClick={() => onClick()} {...rest}>
      {children}
    </button>
  );
};

export default AppButton;
