import React from 'react';
import { FormData, InputErrorMessage } from '../types/formTypes';

/**
 * @description
 * @param event
 * @param element
 */
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
    tooltip: (
      <p>
        information requise
        <br />
        <br />
        lettres, espace, tiret admis
      </p>
    ),
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
    tooltip: (
      <p>
        information requise
        <br />
        <br />
        adresse mail valide
      </p>
    ),
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
    tooltip: (
      <p>
        message requis
        <br />
        <br />
        caractères alphanumériques
      </p>
    ),
  },
];

export const getErrorMessage: InputErrorMessage = {
  name: {
    patternMismatch: `accepte les caractères alphabétiques\nminuscules, majuscules, accentués\nl'espace ou le tiret`,
    valueMissing: `doit être renseigné`,
    tooShort: `comprend au moins`,
  },
  email: {
    patternMismatch: `L'adresse n'est pas correct`,
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
