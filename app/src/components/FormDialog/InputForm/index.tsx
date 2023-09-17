import React, { useRef, useState } from 'react';
import style from './style.module.css';
import {
  InputData,
  InputFormValue,
  Validity,
  checkValidityInput,
  updateStateValidity,
} from '../../../utils/modalFormData';
import Popover from '../../Popover';
import Tag from '../../Tag';

/**
 * @description
 */
type InputFormProps = InputData & {
  asteriskColor?: string;
  setValidity?: React.Dispatch<React.SetStateAction<Validity[] | undefined>>;
  setInputValue?: React.Dispatch<React.SetStateAction<InputFormValue | undefined>>;
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
  const [focused, setFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inputValidity = useRef<Validity>();
  const varCssColor = getComputedStyle(document.body);

  inputValidity.current = inputRef.current ? checkValidityInput(inputRef.current) : undefined;

  const isValid = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)): boolean => {
    inputValidity.current = checkValidityInput(target);
    updateStateValidity(setValidity, id, inputValidity.current);
    return !inputValidity.current;
  };
  /**
   * @description
   * @param event
   * @returns void
   */
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = event.target;

    if (isValid(event.target))
      setInputValue?.((state) =>
        state ? { ...state, [id]: value } : ({ [id]: value } as InputFormValue),
      );
  };

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

  return (
    <div className={style.inputFormWrapper}>
      <label
        htmlFor={id}
        className={`${style.label} ${inputValidity.current ? style.error : ''} ${
          focused && style.focused
        } ${!!inputRef.current?.value && !inputValidity.current && style.onInput}`}
      >
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
            ref={inputRef as React.LegacyRef<HTMLInputElement>}
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
            ref={inputRef as React.LegacyRef<HTMLTextAreaElement>}
          />
        )}
        {inputValidity.current?.valueMissing && (
          <Tag
            tag='remplir'
            type='error'
            position={type ? { bottom: 0, right: '10px' } : { bottom: 0, left: '10px' }}
          />
        )}
        {focused && <Popover validity={inputValidity.current} />}
      </label>
    </div>
  );
}

export default InputForm;
