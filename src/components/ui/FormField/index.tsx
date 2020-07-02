import React from 'react';
import { Icon } from 'react-feather';

// Import styles
import './form-field.scss';

interface IFormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: Icon;
}

const FormField:React.FC<IFormFieldProps> = ({ label, name, type, value, onChange, Icon }) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <div className="form-field--input">
        <Icon size={18} />
        <input name={name} id={name} type={type} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default FormField;