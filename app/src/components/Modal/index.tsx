import React, { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import Button from '../Button';
import { setFocus } from '../../utils/modalFormData';

type ModalButton = {
  name: string;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
};

export type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button?: ModalButton;
  closeIcon?: boolean;
  title?: string;
  subTitle?: string;
  closeParentModal?: React.Dispatch<React.SetStateAction<boolean>>;
  customStyle?: 'alert';
};

function Modal({
  children,
  open,
  setOpen,
  button,
  closeIcon,
  title,
  subTitle,
  closeParentModal,
  customStyle,
}: ModalProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const lastFormChildRef = useRef<HTMLTextAreaElement>();
  const shiftKeyRef = useRef<boolean>(false);

  const setOpenFalse = useCallback(
    (
      event:
        | React.KeyboardEvent<SVGSVGElement>
        | React.MouseEvent<SVGSVGElement>
        | MouseEvent
        | Event,
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    },
    [setOpen],
  );
  // ** event handlers ******************************************************************

  /**
   * @description
   * @returns void
   */
  const handleCloseClick = (e: React.MouseEvent<SVGSVGElement>): void => setOpenFalse(e);

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleCloseKeyDown = (e: React.KeyboardEvent<SVGSVGElement>): void => {
    if (e.code === 'Enter') setOpenFalse(e);
  };

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleShiftKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const shiftKeyPress = shiftKeyRef.current;

    shiftKeyRef.current =
      (e.code === 'ShiftLeft' || e.code === 'ShiftLeft') && shiftKeyPress ? false : shiftKeyPress;
  };

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleTabIndex = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const focusElement = {
      first: closeRef.current,
      last: buttonRef.current?.disabled ? lastFormChildRef.current ?? null : buttonRef.current,
    };
    const shiftKeyPress = shiftKeyRef.current;

    if (focusElement.last) {
      shiftKeyRef.current = e.code === 'ShiftLeft' || e.code === 'ShiftLeft' ? true : shiftKeyPress;
      if (
        document.activeElement === focusElement[shiftKeyPress ? 'first' : 'last'] &&
        e.code === 'Tab'
      )
        setFocus(e, focusElement[shiftKeyPress ? 'last' : 'first']);
      return;
    }
    if (e.code === 'Tab') setFocus(e, focusElement.first);
  };

  // ** useEffect ***********************************************************************

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (e.target === dialogRef.current) setOpenFalse(e);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setOpenFalse]);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      lastFormChildRef.current =
        childrenRef.current?.getElementsByTagName('textarea').item(0) || undefined;
      dialogNode?.showModal();
      return;
    }
    dialogNode?.close();
    if (closeParentModal) closeParentModal((state) => !state);
  }, [closeParentModal, open]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (e: Event): void => setOpenFalse(e);
    dialogNode?.addEventListener('cancel', handleCancel);
    return () => dialogNode?.removeEventListener('cancel', handleCancel);
  }, [setOpenFalse]);

  return (
    <dialog className={style.modal} ref={dialogRef}>
      <div
        className={`${style.modalWrapper} ${customStyle && style[customStyle]}`}
        role='presentation'
        onKeyDown={closeIcon || button ? handleTabIndex : undefined}
        onKeyUp={closeIcon && button ? handleShiftKey : undefined}
      >
        {(closeIcon || title || subTitle) && (
          <header className={style.modalHeader}>
            {closeIcon && (
              <FontAwesomeIcon
                className={`${style.modalCloseIcon} ${customStyle && style[customStyle]}`}
                icon={icon({ name: 'close' })}
                onClick={handleCloseClick}
                onKeyDown={handleCloseKeyDown}
                ref={closeRef}
                focusable
                tabIndex={0}
              />
            )}
            {(title || subTitle) && (
              <div className={style.modalTitleWrapper}>
                {title && <h3 className={style.modalTitle}>{title}</h3>}
                {subTitle && <p className={style.modalSlogan}>{subTitle}</p>}
              </div>
            )}
          </header>
        )}
        {open && (
          <div className={style.modalInnerWrapper} ref={childrenRef}>
            {children}
          </div>
        )}
        {button && (
          <footer className={style.modalFooter}>
            <Button
              className={style.buttonForm}
              name={button.name}
              form={button.form}
              ref={buttonRef}
              disabled={button.disable}
            />
          </footer>
        )}
      </div>
    </dialog>
  );
}

export default Modal;
