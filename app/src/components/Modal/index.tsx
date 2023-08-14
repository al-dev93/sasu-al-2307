import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import Button from '../Button';

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

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const closeNode = closeRef.current;
    if (firstRender.current) {
      firstRender.current = false;
      closeNode?.focus();
      return;
    }
    if (open) {
      dialogNode?.showModal();
      return;
    }
    dialogNode?.close();
  }, [open]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (e: Event): void => {
      e.preventDefault();
      setOpen(false);
    };
    dialogNode?.addEventListener('cancel', handleCancel);
    return () => dialogNode?.removeEventListener('cancel', handleCancel);
  }, [setOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && e.target === dialogNode) setOpen(false);
  };

  const handleCloseClick = (): void => setOpen(false);
  const handleCloseKeyDown = (e: React.KeyboardEvent<SVGSVGElement>): void => {
    if (e.code === 'Enter') setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setOpen(false);
  };

  const handleTabIndex = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttonNode = buttonRef.current;
    const closeNode = closeRef.current;

    if (e.code === 'ShiftLeft' || e.code === 'ShiftLeft') {
      shiftPress.current = true;
    }
    if (document.activeElement === buttonNode && e.code === 'Tab' && !shiftPress.current) {
      e.preventDefault();
      closeNode?.focus();
    }
    if (document.activeElement === closeNode && e.code === 'Tab' && shiftPress.current) {
      e.preventDefault();
      buttonNode?.focus();
    }
    if (e.code === 'Enter' && document.activeElement !== buttonNode) e.preventDefault();
  };

  const handleShiftKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftLeft') && shiftPress.current)
      shiftPress.current = false;
  };

  return (
    <div
      className={style.modalWrapper}
      onKeyDown={handleTabIndex}
      onKeyUp={handleShiftKey}
      onClick={handleOutsideClick}
      role='presentation'
    >
      <dialog className={style.modal} ref={dialogRef}>
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
        <form
          action=''
          id='contact'
          className={style.contactForm}
          method='dialog'
          onSubmit={handleSubmit}
        >
          <label htmlFor='name' className={style.label}>
            <p>Nom</p>
            <input
              className={style.inputBox}
              type='text'
              id='name'
              name='name'
              placeholder='prénom - nom'
            />
          </label>
          <label htmlFor='company' className={style.label}>
            <p>Entreprise</p>
            <input
              className={style.inputBox}
              type='text'
              id='company'
              name='company'
              placeholder="nom de l'entreprise"
            />
          </label>
          <label htmlFor='email' className={style.label}>
            <p>Email</p>
            <input
              className={style.inputBox}
              type='email'
              id='email'
              name='email'
              placeholder='adresse mail'
            />
          </label>
          <label htmlFor='phone' className={style.label}>
            <p>Téléphone</p>
            <input
              className={style.inputBox}
              type='tel'
              name='phone'
              id='phone'
              pattern='0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}'
              placeholder='0X xx xx xx xx'
            />
          </label>
          <label htmlFor='message' className={`${style.label} ${style.textArea}`}>
            <p>Message</p>
            <textarea
              className={`${style.inputBox} ${style.textArea}`}
              name='message'
              id='message'
              rows={5}
            />
          </label>
        </form>
        <footer className={style.footer}>
          <Button name='Envoyer' form='contact' ref={buttonRef} />
        </footer>
      </dialog>
    </div>
  );
}

export default Modal;
