import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import Button from '../Button';
import formData from '../../utils/modalFormData';
import InputForm from '../InputForm';

export type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnOutsideClick?: boolean;
};

function Modal({ open, setOpen, closeOnOutsideClick }: ModalProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstRender = useRef<boolean>();
  const shiftPress = useRef<boolean>(false);

  // ** event handlers ******************************************************************

  /**
   * @description
   * @returns void
   */
  const handleCloseClick = (): void => setOpen(false);

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleCloseKeyDown = (e: React.KeyboardEvent<SVGSVGElement>): void => {
    if (e.code === 'Enter') setOpen(false);
  };

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleShiftKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftLeft') && shiftPress.current)
      shiftPress.current = false;
  };

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleTabIndex = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const buttonNode = buttonRef.current;
    const closeNode = closeRef.current;

    if (e.code === 'ShiftLeft' || e.code === 'ShiftLeft') {
      shiftPress.current = true;
    }
    if (document.activeElement === buttonNode && e.code === 'Tab' && !shiftPress.current) {
      e.preventDefault();
      e.stopPropagation();
      closeNode?.focus();
    }
    if (document.activeElement === closeNode && e.code === 'Tab' && shiftPress.current) {
      e.preventDefault();
      e.stopPropagation();
      buttonNode?.focus();
    }
    if (e.code === 'Enter' && document.activeElement !== buttonNode) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setOpen(false);
  };

  // ** useEffect ***********************************************************************

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      const dialogNode = dialogRef.current;
      if (closeOnOutsideClick && e.target === dialogNode) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [closeOnOutsideClick, setOpen]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const closeNode = closeRef.current;

    if (firstRender.current) {
      firstRender.current = false;
      closeNode?.focus();
      return;
    }
    if (open) dialogNode?.showModal();
    else dialogNode?.close();
  }, [closeOnOutsideClick, open, setOpen]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    };
    dialogNode?.addEventListener('cancel', handleCancel);
    return () => dialogNode?.removeEventListener('cancel', handleCancel);
  }, [setOpen]);

  return (
    <dialog className={style.modal} ref={dialogRef}>
      <div
        className={style.modalWrapper}
        role='presentation'
        onKeyDown={handleTabIndex}
        onKeyUp={handleShiftKey}
      >
        <header className={style.modalHeader}>
          <FontAwesomeIcon
            className={style.modalCloseIcon}
            icon={icon({ name: 'close' })}
            onClick={handleCloseClick}
            onKeyDown={handleCloseKeyDown}
            ref={closeRef}
            focusable
            tabIndex={0}
          />
          <div className={style.modalTitleWrapper}>
            <h3 className={style.modalTitle}>Prenez contact</h3>
            <p className={style.modalSlogan}>une demande... ou bien un projet ?</p>
          </div>
        </header>
        <div className={style.modalInnerWrapper}>
          <form
            action=''
            id='contact'
            className={style.contactForm}
            method='dialog'
            onSubmit={handleSubmit}
          >
            {formData.map((value) => (
              <InputForm
                key={value.id}
                className={style.inputWrapper}
                label={value.label}
                id={value.id}
                type={value.type}
                placeholder={value.placeholder}
                pattern={value.pattern}
                required={value.required}
                asteriskColor='--primary-color'
              />
            ))}
            <Button className={style.buttonForm} name='Envoyer' form='contact' ref={buttonRef} />
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
