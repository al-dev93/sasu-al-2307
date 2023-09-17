import React from 'react';
import style from './style.module.css';
import { InputFormValue, Validity, inputFormLabel } from '../../utils/modalFormData';

type PopoverProps = {
  validity?: Validity;
};

const setPopoverMessage = (validity: Validity): string | string[] => {
  const nameInput = validity.name as keyof InputFormValue;
  let message: string | string[] = '';
  switch (true) {
    case validity.valueMissing:
      message = `${inputFormLabel[nameInput]} doit être renseigné`;
      break;
    case validity.typeMismatch:
      message =
        inputFormLabel[nameInput] === 'Email'
          ? 'Veuillez entrer une adresse mail valide'
          : `Le format de ${inputFormLabel[nameInput]} est incorrect`;
      break;
    case validity.patternMismatch:
      if (inputFormLabel[nameInput] === 'Nom')
        message = [
          `${inputFormLabel[nameInput]} n'accepte que des caractères alphabétiques`,
          'minuscules, majuscules, accentués et espace ou tiret',
        ];
      else if (inputFormLabel[nameInput] === 'Email')
        message = `${inputFormLabel[nameInput]} contient des caractères invalides`;
      else if (inputFormLabel[nameInput] === 'Téléphone')
        message = [
          `Le numéro de téléphone n'est pas correct`,
          `il commence par 0`,
          `et comprend 5 fois 2 chiffres séparés d'un espace`,
        ];
      break;
    case validity.tooShort:
      message = `${inputFormLabel[nameInput]} doit comprendre au moins ${validity.minLength} caractères`;
      break;
    default:
      break;
  }
  return message;
};

function Popover({ validity }: PopoverProps) {
  const message = validity ? setPopoverMessage(validity as Validity) : null;
  return message ? (
    <p className={style.popoverWrapper}>
      {(Array.isArray(message) &&
        message.map((value, index) => (
          <span key={`${index + 1}`} className={style.popover}>
            {value}
          </span>
        ))) || <span className={style.popover}>{message}</span>}
    </p>
  ) : null;
}

export default Popover;
