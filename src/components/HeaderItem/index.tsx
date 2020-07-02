import React from 'react';

// Import styles
import './header-item.scss';

const HeaderItem:React.FC = ({ children }) => {
  return (
    <div className="header-item">
      {children}
    </div>
  );
};

export default HeaderItem;