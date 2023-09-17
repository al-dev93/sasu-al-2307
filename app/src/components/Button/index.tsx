import React, { LegacyRef, MouseEventHandler, forwardRef } from 'react';

type ButtonProps = {
  className?: string;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name: string;
  disabled?: boolean;
};

function ButtonRef(props: ButtonProps, ref?: LegacyRef<HTMLButtonElement>): JSX.Element {
  const { className, form, onClick, name, disabled } = props;
  return (
    <button
      className={className}
      form={form}
      type={form ? 'submit' : 'button'}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

const Button = forwardRef(
  ButtonRef as unknown as React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps>,
);
export default Button;
