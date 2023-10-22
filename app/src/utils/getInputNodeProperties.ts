import { Validity } from '../types/formTypes';

/**
 * @description
 * @param inputNode
 * @returns
 */
function checkValidityInput(
  inputNode: HTMLInputElement | HTMLTextAreaElement | undefined | null,
): Validity | undefined {
  if (!inputNode) return undefined;
  const { name, minLength, value, required } = inputNode;
  const { pattern } = inputNode as HTMLInputElement;

  const valueMissing = required ? !value.length : undefined;
  const patternMismatch = pattern ? !new RegExp(pattern).test(value) : undefined;
  const tooShort = minLength ? !(value.length >= minLength) : undefined;
  const valid = (!valueMissing ?? true) && (!patternMismatch ?? true) && (!tooShort ?? true);

  return valid
    ? undefined
    : {
        name,
        valid,
        ...{ minLength },
        ...(valueMissing ? { valueMissing } : undefined),
        ...(patternMismatch ? { patternMismatch } : undefined),
        ...(tooShort ? { tooShort } : undefined),
      };
}

export default checkValidityInput;
