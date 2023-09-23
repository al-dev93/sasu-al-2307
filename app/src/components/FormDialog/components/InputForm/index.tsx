import React, { useState } from 'react';
import style from './style.module.css';
import Popover from '../../../Popover';
import Tag from '../../../Tag';
import {
  ChangeInput,
  InputData,
  SetStateInputFormValue,
  SetStateValidity,
  Validity,
} from '../../../../types/formTypes';
import { getErrorMessage } from '../../../../utils/modalFormData';
import useContactForm from '../../../../hooks/useContactForm';
import { getStateByIndex } from '../../../../utils/handleContactState';

/**
 * @description
 */
type InputFormProps = InputData & {
  asteriskColor?: string;
  validity: Validity[];
  setValidity: SetStateValidity;
  setInputValue: SetStateInputFormValue;
};

/**
 * @description
 * @param param0
 * @returns
 */
function InputForm({
  label,
  id,
  type,
  placeholder,
  pattern,
  required,
  minLength,
  validity,
  setValidity,
  setInputValue,
  asteriskColor,
}: InputFormProps): JSX.Element {
  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<ChangeInput>();
  const varCssColor = getComputedStyle(document.body);

  /**
   * @description
   * @param event
   * @returns void
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInput({
      target: event.target,
      value: event.target.value,
    });
  /**
   * @description
   * @returns void
   */
  const handleOnFocus = (): void => setFocused(true);

  /**
   * @description
   * @returns void
   */
  const handleOnBlur = (): void => setFocused(false);

  /**
   * @description
   * @param
   * @returns JSX.Element
   */
  const isAsterisk = (): JSX.Element => {
    const asteriskStyle: React.CSSProperties = {
      color: varCssColor.getPropertyValue(asteriskColor || ``),
    };
    return (
      <strong>
        <span aria-label='required' style={asteriskStyle}>
          *
        </span>
      </strong>
    );
  };
  const { errorTag, inputBoxBorder, isValidate, popoverMessage } = useContactForm(
    getStateByIndex(validity, id),
    id,
    label,
    input as ChangeInput,
    setValidity,
    setInputValue,
    getErrorMessage,
    style,
  );

  return (
    <div className={style.inputFormWrapper}>
      <label htmlFor={id} className={inputBoxBorder}>
        <span>
          {label}
          {required && isAsterisk()}
        </span>
        {(type && (
          <input
            className={style.inputBox}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            type={type}
            name={id}
            id={id}
            minLength={minLength}
            pattern={pattern}
            placeholder={placeholder}
            required={required}
          />
        )) || (
          <textarea
            className={`${style.inputBox} ${style.textArea}`}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            name={id}
            id={id}
            placeholder={placeholder}
            required
          />
        )}
        {!isValidate && (
          <Tag
            tag={errorTag}
            type='error'
            position={type ? { bottom: 0, right: '10px' } : { bottom: 0, left: '10px' }}
          />
        )}
        {focused && <Popover message={popoverMessage} />}
      </label>
    </div>
  );
}

export default InputForm;
