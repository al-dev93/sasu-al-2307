import React, { useCallback, useEffect, useRef, useState } from 'react';
import checkValidityInput from '../utils/getInputNodeProperties';
import { InputErrorMessage, StringObject, Validity } from '../types/formTypes';

type InputProperties = {
  name: string;
  label: string;
  required?: boolean;
};

function useContactForm(inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>) {
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<Validity | undefined>();
  const [autoComplete, setAutoComplete] = useState<string[]>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const firstUse = useRef<boolean>(true);
  const storageRef = useRef<boolean>(false);
  const inputProperties = useRef<InputProperties>({
    name: '',
    label: '',
    required: undefined,
  });

  const inputNode = inputRef.current;
  const isStored = storageRef.current;
  const { name, label } = inputProperties.current;

  const setErrorTag = (): string => {
    if (error) {
      return error.valueMissing ? 'remplir' : 'modifier';
    }
    return '';
  };

  const setBorderBox = (style: StringObject): string => {
    let inputFormStyle = `${style.inputContainer}`;
    if (value && !error) inputFormStyle += ` ${style.isEdited}`;
    if (error) inputFormStyle += ` ${style.error}`;
    return inputFormStyle;
  };

  const setErrorMessage = (errorMessage: InputErrorMessage): string | undefined => {
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

  const getInputStorage = useCallback((): string[] | undefined => {
    return isStored ? JSON.parse(localStorage.getItem(name) ?? '[]') : undefined;
  }, [isStored, name]);

  const onInputEvent = useCallback((): void => {
    if (isStored && inputNode) {
      const storageArr: string[] = JSON.parse(localStorage.getItem(name) ?? '[]');
      const filterStorage = storageArr.filter((storage) =>
        storage.toUpperCase().startsWith(inputNode?.value.toUpperCase()),
      );
      setAutoComplete(filterStorage.length ? filterStorage : []);
    }
  }, [inputNode, isStored, name]);

  const onFocusEvent = useCallback((): void => {
    if (isFocused) {
      setAutoComplete(getInputStorage());
      return;
    }
    setAutoComplete(undefined);
  }, [getInputStorage, isFocused]);

  const updateErrorState = useCallback((): void => {
    setError(checkValidityInput(inputNode));
  }, [inputNode]);

  useEffect((): (() => void) | void => {
    if (firstUse.current) {
      firstUse.current = false;
      return;
    }
    if (inputNode) {
      inputProperties.current = {
        name: inputNode.name,
        label: inputNode.parentElement?.firstChild?.firstChild?.textContent ?? '',
        required: inputNode.required,
      };
      if (inputNode.required) updateErrorState();

      const handleInputEvent = (event: Event) => {
        setAutoComplete(undefined);
        if (event.type === 'input') {
          updateErrorState();
          onInputEvent();
          return;
        }
        if (event.type === 'change') {
          setValue(inputNode.value);
          return;
        }
        setIsFocused(event.type === 'focus');
        onFocusEvent();
      };

      const handleClick = () => inputNode.focus();

      ['blur', 'change', 'focus', 'input'].forEach((eventType) =>
        inputNode.addEventListener(eventType, handleInputEvent),
      );
      inputNode.parentElement?.addEventListener('click', handleClick);
      // eslint-disable-next-line consistent-return
      return () => {
        ['blur', 'change', 'focus', 'input'].forEach((eventType) =>
          inputNode.removeEventListener(eventType, handleInputEvent),
        );
        inputNode.parentElement?.removeEventListener('click', handleClick);
      };
    }
  }, [inputNode, onFocusEvent, onInputEvent, updateErrorState]);

  useEffect(() => {
    storageRef.current = !!localStorage.getItem(name);
  }, [name]);

  useEffect(() => {
    if (value && !error && name !== 'message') {
      if (isStored) {
        const storageSet = new Set(JSON.parse(localStorage.getItem(name) ?? '[]')).add(value);
        localStorage.setItem(name, JSON.stringify([...storageSet].sort()));
        return;
      }
      localStorage.setItem(name, JSON.stringify([value]));
      storageRef.current = true;
    }
  }, [error, isStored, name, value]);

  console.log(isStored);

  return {
    isValidate: !error,
    isFocused,
    inputBoxBorder: setBorderBox,
    error,
    value,
    errorMessage: {
      message: setErrorMessage,
      list: autoComplete || getInputStorage(),
    },
    errorTagContent: setErrorTag(),
  };
}

export default useContactForm;
