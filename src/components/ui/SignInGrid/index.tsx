import React from 'react';

// Import styles
import './sign-in-grid.scss';

const SignInGrid:React.FC = ({ children }) => {
  return (
    <section className="sign-in-grid--wrapper">
      <div className="sign-in-grid">
        {children}
      </div>
    </section>
  );
};

export default SignInGrid;