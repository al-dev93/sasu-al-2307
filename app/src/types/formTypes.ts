export type Validity = {
  name: string;
  valid: boolean;
  minLength?: number;
  patternMismatch?: boolean;
  valueMissing?: boolean;
  tooShort?: boolean;
};

export type SetStateValidity = React.Dispatch<React.SetStateAction<Validity[]>>;

type ErrorMessage = {
  patternMismatch?: string;
  tooShort?: string;
  valueMissing?: string;
};

export type InputErrorMessage = {
  [key: string]: ErrorMessage;
};

export type InputData = {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  pattern?: string;
  required?: boolean;
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

export type SetStateInputFormValue = React.Dispatch<
  React.SetStateAction<InputFormValue | undefined>
>;

// export type ChangeInput = {
//   target: HTMLInputElement | HTMLTextAreaElement;
//   value: string;
// };

export type StringObject = {
  readonly [key: string]: string;
};

export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export const HISTORY = 100;
export const AUTOCOMPLETE = 101;

export type OverlayType = typeof HISTORY | typeof AUTOCOMPLETE;
