import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Modal from '../Modal';
import InputForm from './components/InputForm';
import Alert from '../Alert';
import { FormData, InputFormValue, SetStateBoolean, Validity } from '../../types/formTypes';

type FormDialogProps = {
  open: boolean;
  setOpen: SetStateBoolean;
  formData: FormData;
  idForm: string;
  submitButtonName: string;
  title?: string;
  subTitle?: string;
  alertOnSubmit: string | string[];
};

/**
 * @description
 * @param param0
 * @returns
 */
function FormDialog({
  open,
  setOpen,
  formData,
  idForm,
  submitButtonName,
  title,
  subTitle,
  alertOnSubmit,
}: FormDialogProps): JSX.Element {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [validity, setValidity] = useState<Validity[]>([]);
  const [inputValue, setInputValue] = useState<InputFormValue>();

  /**
   * @description
   * @param e
   * @returns void
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    if (!validity?.length) {
      setOpenAlert(true);
      // COMMENT
      //  eslint-disable-next-line no-console
      console.log(inputValue);
    }
  };

  /**
   * @description
   */
  const cleanFormStates = () => {
    setValidity([]);
    setInputValue(undefined);
  };

  /**
   * @description
   */
  useEffect(() => cleanFormStates(), [open]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      closeIcon
      title={title}
      subTitle={subTitle}
      button={{
        name: submitButtonName,
        form: idForm,
        disable: !!validity?.length || undefined,
      }}
    >
      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={alertOnSubmit}
        closeParentModal={setOpen}
      />
      <form
        action=''
        id={idForm}
        className={style.contactForm}
        method='dialog'
        onSubmit={handleSubmit}
        noValidate
      >
        {formData.map((value) => (
          <InputForm
            key={value.id}
            label={value.label}
            id={value.id}
            type={value.type}
            placeholder={value.placeholder}
            pattern={value.pattern}
            minLength={value.minLength}
            required={value.required}
            tooltip={value.tooltip}
            setValidity={setValidity}
            setInputValue={setInputValue}
          />
        ))}
      </form>
    </Modal>
  );
}

export default FormDialog;
