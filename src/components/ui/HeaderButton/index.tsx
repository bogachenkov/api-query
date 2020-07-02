import React from 'react';

// Import styles
import './header-button.scss';

interface IHeaderButtonProps {
  active?: boolean;
}

const HeaderButton:React.FC<IHeaderButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({active, ...props}) => {
  return (
    <button className={`${active ? 'active' : ''} header-button`} {...props}>
      {props.children}
    </button>
  );
};

export default HeaderButton;