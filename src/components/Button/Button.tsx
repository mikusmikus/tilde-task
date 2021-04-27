import React, { FC } from 'react';
import './Button.scss';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ children = 'button', onClick, disabled = false }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
};

export default Button;
