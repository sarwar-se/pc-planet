import React from 'react';

const AppButton: React.FC<{
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className, children, ...rest }) => {
  return (
    <button className={`app-btn ${className}`} onClick={() => onClick()} {...rest}>
      {children}
    </button>
  );
};

export default AppButton;
