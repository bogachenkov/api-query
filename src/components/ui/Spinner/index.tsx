import React from 'react';
import { Loader } from 'react-feather';

// Import styles
import './spinner.scss';

interface ISpinnerProps {
  size: number;
}

const Spinner:React.FC<ISpinnerProps> = ({ size }) => {
  return (
    <span className="spinner">
      <Loader size={size} />      
    </span>
  );
};

export default Spinner;