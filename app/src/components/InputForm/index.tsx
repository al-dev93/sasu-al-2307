import React from 'react';
import style from './style.module.css';
import { InputData } from '../../utils/modalFormData';

/**
 * @description
 */
type InputFormProps = InputData & {
  className?: string;
  asteriskColor?: string;
};

/**
 * @description
 * @param param0
 * @returns
 */
function InputForm({
  className,
  label,
  id,
  type,
  placeholder,
  pattern,
  required,
  asteriskColor,
}: InputFormProps): JSX.Element {
  /**
   * @description
   * @param
   * @returns JSX.Element
   */
  const isAsterisk = (): JSX.Element => {
    const varCssColor = getComputedStyle(document.body);
    const asteriskStyle: React.CSSProperties = {
      color: varCssColor.getPropertyValue(asteriskColor || ``),
    };
    return (
      <strong>
        <span aria-label='required' style={asteriskStyle}>
          &nbsp; *
        </span>
      </strong>
    );
  };

  return (
    <div className={`${className} ${style.inputFormWrapper} ${type ? `` : style.textArea}`}>
      <label htmlFor={id} className={style.label}>
        <span>{label}</span>
        {required && isAsterisk()}
      </label>
      {(type && (
        <input
          className={style.inputBox}
          type={type}
          name={id}
          id={id}
          pattern={pattern}
          placeholder={placeholder}
          required={required}
        />
      )) || (
        <textarea
          className={`${style.inputBox} ${style.textArea}`}
          name={id}
          id={id}
          placeholder={placeholder}
          rows={5}
          required
        />
      )}
    </div>
  );
}

export default InputForm;
