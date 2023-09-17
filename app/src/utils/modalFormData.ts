export type Validity = {
  name: string;
  valid: boolean;
  minLength?: number;
  patternMismatch?: boolean;
  typeMismatch?: boolean;
  valueMissing?: boolean;
  tooShort?: boolean;
};

export type InputData = {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  pattern?: string;
  required?: boolean;
  checkValidity?: boolean;
  minLength?: number;
};

export type FormData = InputData[];

export type InputFormValue = {
  name: string;
  company?: string;
  email: string;
  tel?: string;
  message: string;
};

export const inputFormLabel: InputFormValue = {
  name: 'Nom',
  email: 'Email',
  tel: 'Téléphone',
  message: 'Message',
};

export function setFocus(
  event: React.KeyboardEvent<HTMLDivElement>,
  element: HTMLElement | SVGSVGElement | null,
) {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
}

export function getArrayOfElement(
  elements: HTMLCollection | HTMLFormElement,
): Array<HTMLInputElement | HTMLTextAreaElement> {
  return (Array.from(elements) as Array<HTMLInputElement | HTMLTextAreaElement>).filter(
    (element) => element.tagName !== 'BUTTON',
  );
}
/**
 * @description
 * @param state
 * @param id
 * @returns number
 */
export function getStateIndex(state: Validity[] | undefined, id: string): number {
  return state?.findIndex((element) => element.name === id) ?? -1;
}
/**
 * @description
 * @param setState
 * @param id
 * @param newValue
 * @returns void
 */
export function updateStateValidity(
  setState: React.Dispatch<React.SetStateAction<Validity[] | undefined>> | undefined,
  id: string,
  newValue?: Validity,
): void {
  setState?.((state) => {
    const index = getStateIndex(state, id);

    if (index > -1)
      return newValue
        ? [...(state ?? []).map((value, el) => (el === index ? newValue : value))]
        : [...(state ?? []).filter((value, el) => el !== index)];
    return index === -1 && newValue ? [...(state ?? []), newValue] : [...(state ?? [])];
  });
}

/**
 * @description
 * @param inputNode
 * @returns Validity or undefined
 */
export function checkValidityInput(
  inputNode: HTMLInputElement | HTMLTextAreaElement,
): Validity | undefined {
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

/**
 * @description
 * @param formNode
 * @returns Validity[] or undefined
 */
export function checkValidityOfFormData(
  formNode: Array<HTMLInputElement | HTMLTextAreaElement>,
): Array<Validity> | undefined {
  const invalidInput = Array.from(formNode).filter(
    (value) => (value as HTMLInputElement | HTMLTextAreaElement).validity.valid === false,
  );
  return invalidInput.length
    ? invalidInput.reduce((acc: Array<Validity>, curr) => {
        return [
          ...acc,
          { ...(checkValidityInput(curr as HTMLInputElement | HTMLTextAreaElement) as Validity) },
        ];
      }, [])
    : undefined;
}

const formData: FormData = [
  {
    label: 'Nom',
    id: 'name',
    type: 'text',
    placeholder: 'prénom - nom',
    pattern: '^[a-zA-ZÀ-ú\\-\\s]*',
    required: true,
    minLength: 4,
  },
  {
    label: 'Entreprise',
    id: 'company',
    type: 'text',
    placeholder: "nom de l'entreprise",
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'adresse mail valide',
    pattern: '^[a-z0-9._\\-]+@[a-z0-9._\\-]{2,}[.][a-z]{2,4}$',
    required: true,
    checkValidity: true,
  },
  {
    label: 'Téléphone',
    id: 'tel',
    type: 'tel',
    placeholder: '0X xx xx xx xx',
    pattern: '0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}',
    checkValidity: true,
  },
  {
    label: 'Message',
    id: 'message',
    placeholder: 'votre message',
    required: true,
  },
];

export default formData;
