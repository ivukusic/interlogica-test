import React from 'react';
import { IoMdSave } from 'react-icons/io';
import './Button.css';

interface ButtonInterface {
  label: string;
  loading: boolean;
  onClick: () => void;
  type: string;
}

export const Button = ({ label, loading, onClick, type }: ButtonInterface) => (
  <div className={`button button--${type}`} data-testid="button" onClick={onClick}>
    <IoMdSave size={24} />
    {loading ? <span data-testid="button-loading">...</span> : <span data-testid="button-loading">{label}</span>}
  </div>
);

export default Button;
