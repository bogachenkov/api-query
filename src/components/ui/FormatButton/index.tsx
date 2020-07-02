import React from 'react';
import { AlignLeft } from 'react-feather';

// Import styles
import './format-button.scss';

const FormatButton:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className="format-button" title="Shift+Alt+F" {...props}>
      <AlignLeft size={20} />
      Форматировать
    </button>
  );
};

export default FormatButton;