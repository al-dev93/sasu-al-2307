import React, { useCallback, useEffect, useRef, useState } from 'react';
import checkValidityInput from '../utils/getInputNodeProperties';
import {
  AUTOCOMPLETE,
  HISTORY,
  InputErrorMessage,
  OverlayType,
  StringObject,
  Validity,
} from '../types/formTypes';

type InputProperties = {
  name: string;
  label: string;
  required?: boolean;
};

/**
 * @description
 * @param inputRef
 * @returns
 */
function useContactForm(inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>) {
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<Validity | undefined>();
  const [autoComplete, setAutoComplete] = useState<string[]>();
  const [overlayFirstItemFocus, setOverlayFirstItemFocus] = useState<boolean>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const firstUse = useRef<boolean>(true);
  const storageRef = useRef<boolean>(false);
  const overlayRef = useRef<OverlayType>();
  const inputProperties = useRef<InputProperties>({
    name: '',
    label: '',
    required: undefined,
  });

  const inputNode = inputRef.current;
  const isStored = storageRef.current;
  const { name, label } = inputProperties.current;

  /**
   * @description
   * @returns
   */
  const setErrorTag = (): string => {
    if (error) {
      return error.valueMissing ? 'remplir' : 'modifier';
    }
    return '';
  };

  /**
   * @description
   * @param style
   * @returns
   */
  const setBorderBox = (style: StringObject): string => {
    let inputFormStyle = `${style.inputContainer}`;
    if (value && !error) inputFormStyle += ` ${style.isEdited}`;
    if (error) inputFormStyle += ` ${style.error}`;
    return inputFormStyle;
  };

  /**
   * @description
   * @param errorMessage
   * @returns
   */
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

  /**
   * @description
   * @param newValue
   * @returns void
   */
  const putAutocompleteInInput = (newValue: string): void => {
    if (inputNode) {
      inputNode.focus();
      inputNode.value = newValue;
      setValue(newValue);
      setError(checkValidityInput(inputNode));
    }
  };

  /**
   * @description
   */
  const getAutocompleteInput = useCallback(
    (filter?: boolean): string[] | undefined => {
      const storeArray: string[] = JSON.parse(localStorage.getItem(name) ?? '[]');

      if (filter) {
        return storeArray.length && inputNode
          ? storeArray.filter((storage) =>
              storage.toUpperCase().startsWith(inputNode?.value.toUpperCase()),
            )
          : undefined;
      }
      return isStored ? JSON.parse(localStorage.getItem(name) ?? '[]') : undefined;
    },
    [inputNode, isStored, name],
  );

  /**
   * @description
   */
  const updateErrorState = useCallback((): void => {
    setError(checkValidityInput(inputNode));
  }, [inputNode]);

  /**
   * @description
   */
  const onInputEvent = useCallback((): void => {
    updateErrorState();
    overlayRef.current = AUTOCOMPLETE;
    setAutoComplete(getAutocompleteInput(true));
  }, [getAutocompleteInput, updateErrorState]);

  const onKeyboardEvent = useCallback(
    (event: KeyboardEvent): void => {
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        if (overlayRef.current !== AUTOCOMPLETE) {
          overlayRef.current = HISTORY;
          setAutoComplete(getAutocompleteInput());
        }
        setOverlayFirstItemFocus(event.code === 'ArrowDown');
      }
    },
    [getAutocompleteInput],
  );

  /**
   * @description
   */
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

      /**
       * @description
       * @param event
       * @returns
       */
      const handleInputEvent = (event: Event) => {
        if (event.type === 'input') {
          onInputEvent();
          return;
        }
        if (event.type === 'change') {
          setValue(inputNode.value);
          return;
        }
        if (event.type === 'keydown') {
          onKeyboardEvent(event as KeyboardEvent);
          return;
        }
        if (event.type === 'focus') {
          setAutoComplete(undefined);
          setOverlayFirstItemFocus(undefined);
          overlayRef.current = undefined;
        }
      };

      /**
       * @description
       * @param event
       * @returns
       */
      const handleParentInputEvent = (event: Event) => {
        if (event.type === 'click') {
          inputNode.focus();
          return;
        }
        if (event.type === 'focusin') {
          setIsFocused(true);
          return;
        }
        if (event.type === 'focusout') setIsFocused(false);
      };

      ['change', 'focus', 'keydown', 'input'].forEach((eventType) =>
        inputNode.addEventListener(eventType, handleInputEvent),
      );
      ['click', 'focusin', 'focusout'].forEach(
        (eventType) => inputNode.parentElement?.addEventListener(eventType, handleParentInputEvent),
      );
      // eslint-disable-next-line consistent-return
      return () => {
        ['change', 'focus', 'keydown', 'input'].forEach((eventType) =>
          inputNode.removeEventListener(eventType, handleInputEvent),
        );
        ['click', 'focusin', 'focusout'].forEach(
          (eventType) =>
            inputNode.parentElement?.removeEventListener(eventType, handleParentInputEvent),
        );
      };
    }
  }, [inputNode, onInputEvent, onKeyboardEvent, updateErrorState]);

  /**
   * @description
   */
  useEffect(() => {
    storageRef.current = !!localStorage.getItem(name);
  }, [name]);

  /**
   * @description
   */
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

  return {
    isValidate: !error,
    isFocused,
    inputBoxBorder: setBorderBox,
    error,
    value,
    errorMessage: {
      message: setErrorMessage,
      list: autoComplete,
      inputNode,
      overlayFirstItemFocus,
      putAutocompleteInInput,
    },
    errorTagContent: setErrorTag(),
  };
}

export default useContactForm;
