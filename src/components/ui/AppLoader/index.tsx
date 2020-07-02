import React from 'react';

// Import components
import Spinner from '../Spinner';

// Import styles
import './app-loader.scss';

const AppLoader:React.FC = () => {
  return (
    <div className="app-loader">
      <Spinner size={48} />
    </div>
  );
};

export default AppLoader;