import React from 'react';

// Import styles
import './app-grid.scss';

const AppGrid:React.FC = ({ children, ...props }) => {
  return (
    <main {...props} className="app-grid">
      {children}
    </main>
  );
};

export default AppGrid;