import React, { LegacyRef, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
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
import Tooltip from '../../../Tooltip';

/**
 * @description
 */
type InputFormProps = InputData & {
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
  tooltip,
  setValidity,
  setInputValue,
}: InputFormProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const {
    error,
    isFocused,
    setBorderBox,
    setErrorTag,
    value,
    setErrorMessage,
    autoComplete,
    inputNode,
    overlayFirstItemFocus,
    putAutocompleteInInput,
  } = useContactForm(inputRef);

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

  return (
    <div className={style.inputFormWrapper}>
      <div className={setBorderBox(style)}>
        <div className={style.labelContainer}>
          <label className={style.label} htmlFor={id}>
            {label}
          </label>
          {required && (
            <Tooltip content={tooltip as JSX.Element | string} direction='right'>
              <FontAwesomeIcon className={style.markInfo} icon={icon({ name: 'info' })} />
            </Tooltip>
          )}
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
        {error && (
          <Tag
            type='error'
            tag={setErrorTag()}
            position={id === 'message' ? { bottom: 0, left: '10px' } : { bottom: 0, right: '10px' }}
          />
        )}
        {isFocused && (
          <Popover
            errorMessage={setErrorMessage(getErrorMessage)}
            fillList={autoComplete}
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
