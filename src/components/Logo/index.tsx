import React from 'react';

// Import images
import logo from '@images/logo.svg';

// Import styles
import './logo.scss';

const Logo:React.FC = () => {
  return (
    <div className="logo" >
      <img src={logo} alt="API Console" />
      <p>API.Query</p>
    </div>
  );
};

export default Logo;