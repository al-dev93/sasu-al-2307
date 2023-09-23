import { useCallback, useEffect, useState } from 'react';
import checkValidityInput from '../utils/getInputNodeProperties';
import { updateStateValidity } from '../utils/handleContactState';
import {
  ChangeInput,
  InputErrorMessage,
  InputFormValue,
  SetStateInputFormValue,
  SetStateValidity,
  StringObject,
  Validity,
} from '../types/formTypes';

function useContactForm(
  initialValidity: Validity | undefined,
  name: string,
  label: string,
  input: ChangeInput,
  setValidity: SetStateValidity | never,
  setInputValue: SetStateInputFormValue | never,
  errorMessage: InputErrorMessage,
  style: StringObject,
) {
  const { target, value } = input || {
    target: undefined,
    value: undefined,
  };
  const [error, setError] = useState<Validity | undefined>(initialValidity);

  const setErrorTag = (): string | undefined => {
    if (error) return error.valueMissing ? 'remplir' : 'modifier';
    return undefined;
  };

  const setBorderBox = (): string => {
    let inputFormStyle = `${style.label}`;
    if (value && !error) inputFormStyle += ` ${style.isEdited}`;
    if (error) inputFormStyle += ` ${style.error}`;
    return inputFormStyle;
  };

  const setPopoverMessage = (): string | undefined => {
    if (!error) return undefined;
    return Object.entries(errorMessage[name]).reduce((acc: string, [key, message]) => {
      if (error[key as keyof Validity]) {
        if (name !== 'email') {
          if (name === 'name' && key === 'tooShort')
            return !acc
              ? `${label} ${message} ${error.minLength} caractères`
              : `${acc}\nIl ${message} ${error.minLength} caractères`;
          return !acc ? `${label} ${message}` : `${acc}\nIl ${message}`;
        }
        if (key === 'valueMissing') return `${label} ${message}`;
        return !acc ? `${message}` : `${acc}\n${message}`;
      }
      return acc;
    }, ``);
  };

  const isValidInput = useCallback((): boolean | undefined => {
    if (target) {
      const onError = checkValidityInput(target);
      setError(onError);
      updateStateValidity(setValidity, name, onError);
      return !onError;
    }
    return undefined;
  }, [target, name, setValidity]);

  useEffect(() => {
    if (isValidInput() && value) {
      setInputValue?.((state) =>
        state ? { ...state, [name]: value } : ({ [name]: value } as InputFormValue),
      );
    }
  }, [name, value, isValidInput, setInputValue]);

  return {
    isValidate: !error,
    isEdited: !error && value,
    inputBoxBorder: setBorderBox(),
    popoverMessage: setPopoverMessage(),
    errorTag: setErrorTag(),
  };
}

export default useContactForm;
