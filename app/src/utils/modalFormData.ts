import { FormData, InputErrorMessage } from '../types/formTypes';

export function setFocus(
  event: React.KeyboardEvent<HTMLDivElement>,
  element: HTMLElement | SVGSVGElement | null,
) {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
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
  },
  {
    label: 'Téléphone',
    id: 'tel',
    type: 'tel',
    placeholder: '0X xx xx xx xx',
    pattern: '0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}',
  },
  {
    label: 'Message',
    id: 'message',
    placeholder: 'votre message',
    required: true,
  },
];

export const getErrorMessage: InputErrorMessage = {
  name: {
    patternMismatch: `accepte les caractères alphabétiques\nminuscules, majuscules, accentués\nl'espace ou le tiret`,
    valueMissing: `doit être renseigné`,
    tooShort: `comprend au moins`,
  },
  email: {
    patternMismatch: `L'adresse n'est pas correcte`,
    typeMismatch: `Entrez une adresse mail valide`,
    valueMissing: `doit être renseigné`,
  },
  tel: {
    patternMismatch: `commence par 0, il est composé de\n5 fois 2 chiffres séparés d'un espace`,
  },
  message: {
    valueMissing: `doit être rédigé`,
  },
};

export default formData;
