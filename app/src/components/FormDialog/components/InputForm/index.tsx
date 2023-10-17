import React, { LegacyRef, useEffect, useRef } from 'react';
import style from './style.module.css';
import {
  InputData,
  InputFormValue,
  SetStateInputFormValue,
  SetStateValidity,
} from '../../../../types/formTypes';
import useContactForm from '../../../../hooks/useContactForm';
import Popover from '../../../Popover';
import Tag from '../../../Tag';
import { getErrorMessage } from '../../../../utils/modalFormData';
import updateStateValidity from '../../../../utils/handleContactState';

/**
 * @description
 */
type InputFormProps = InputData & {
  asteriskColor?: string;
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
  setValidity,
  setInputValue,
  asteriskColor,
}: InputFormProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { isValidate, isFocused, inputBoxBorder, errorMessage, errorTagContent, error, value } =
    useContactForm(inputRef);
  const { message, list, inputNode, overlayFirstItemFocus, putAutocompleteInInput } = errorMessage;

  /**
   * @description
   */
  useEffect(() => {
    updateStateValidity(setValidity, id, error);
  }, [error, id, setValidity]);

  /**
   * @description
   */
  useEffect(() => {
    if (value)
      setInputValue((prev) =>
        prev ? { ...prev, [id]: value } : ({ [id]: value } as InputFormValue),
      );
  }, [id, setInputValue, value]);

  const varCss = getComputedStyle(document.body);

  /**
   * @description
   * @param event
   * @returns void
   */
  const isAsterisk = (): JSX.Element => {
    const asteriskStyle: React.CSSProperties = {
      color: varCss.getPropertyValue(asteriskColor || ``),
      fontSize: varCss.getPropertyValue('--fs-xs'),
    };
    return (
      <span aria-label='required' style={asteriskStyle}>
        *
      </span>
    );
  };

  return (
    <div className={style.inputFormWrapper}>
      <div className={inputBoxBorder(style)}>
        <div className={style.labelContainer}>
          <label className={style.label} htmlFor={id}>
            {label}
          </label>
          <span>{required && isAsterisk()}</span>
        </div>
        {(type && (
          <input
            className={style.inputBox}
            type={type}
            name={id}
            id={id}
            minLength={minLength}
            pattern={pattern}
            placeholder={placeholder}
            required={required}
            autoComplete='off'
            ref={inputRef as LegacyRef<HTMLInputElement>}
          />
        )) || (
          <textarea
            className={`${style.inputBox} ${style.textArea}`}
            name={id}
            id={id}
            placeholder={placeholder}
            required
            autoComplete='off'
            ref={inputRef as LegacyRef<HTMLTextAreaElement>}
          />
        )}
        {!isValidate && (
          <Tag
            type='error'
            tag={errorTagContent}
            position={id === 'message' ? { bottom: 0, left: '10px' } : { bottom: 0, right: '10px' }}
          />
        )}
        {isFocused && (
          <Popover
            message={message(getErrorMessage)}
            list={list}
            prevFocusNode={inputNode}
            firstItemFocused={overlayFirstItemFocus}
            putAutocompleteInInput={putAutocompleteInInput}
          />
        )}
      </div>
    </div>
  );
}

export default InputForm;
