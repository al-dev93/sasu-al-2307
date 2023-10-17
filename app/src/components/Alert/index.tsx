import React from 'react';
import style from './style.module.css';
import Modal from '../Modal';

type AlertProps = {
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  message: string | string[];
  closeParentModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * @description
 * @param param0
 * @returns
 */
function Alert({ openAlert, setOpenAlert, message, closeParentModal }: AlertProps): JSX.Element {
  return (
    <Modal
      open={openAlert}
      setOpen={setOpenAlert}
      closeIcon
      closeParentModal={closeParentModal}
      customStyle='alert'
    >
      <div className={style.alertWrapper}>
        {(Array.isArray(message) &&
          message.map((value, index) => (
            <span key={`${index + 1}`} className={style.alert}>
              {value}
            </span>
          ))) || <span className={style.alert}>{message}</span>}
      </div>
    </Modal>
  );
}

export default Alert;
