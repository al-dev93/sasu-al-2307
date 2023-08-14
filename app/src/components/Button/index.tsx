import React, { LegacyRef, forwardRef } from 'react';
import style from './style.module.css';

type ButtonProps = {
  name: string;
  form?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Button = forwardRef((props: ButtonProps, ref?: LegacyRef<HTMLButtonElement>): JSX.Element => {
  const handleClick = () => props.setOpenModal && props.setOpenModal(true);
  return (
    <button
      type={props.form ? 'submit' : 'button'}
      form={props.form}
      onClick={handleClick}
      ref={ref}
    >
      {props.name}
    </button>
  );
});

Button.defaultProps = {
  form: undefined,
  setOpenModal: undefined,
};

export default Button;
