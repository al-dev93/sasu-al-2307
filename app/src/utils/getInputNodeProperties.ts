import { Validity } from '../types/formTypes';

function checkValidityInput(
  inputNode: HTMLInputElement | HTMLTextAreaElement | undefined | null,
): Validity | undefined {
  if (!inputNode) return undefined;
  const { name, minLength } = inputNode;
  const { valid, valueMissing, typeMismatch, patternMismatch, tooShort } = inputNode.validity;
  return valid
    ? undefined
    : {
        name,
        valid,
        ...(minLength ? { minLength } : undefined),
        ...(valueMissing ? { valueMissing } : undefined),
        ...(typeMismatch ? { typeMismatch } : undefined),
        ...(patternMismatch ? { patternMismatch } : undefined),
        ...(tooShort ? { tooShort } : undefined),
      };
}

export default checkValidityInput;
