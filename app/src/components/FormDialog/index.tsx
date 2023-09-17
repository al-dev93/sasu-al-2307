import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import Modal from '../Modal';
import {
  FormData,
  InputFormValue,
  Validity,
  checkValidityOfFormData,
  getArrayOfElement,
} from '../../utils/modalFormData';
import InputForm from '../InputForm';
import Alert from '../Alert';

type FormDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  idForm: string;
  submitButtonName: string;
  title?: string;
  subTitle?: string;
  alertOnSubmit: string | string[];
};

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
  const [validity, setValidity] = useState<Validity[]>();
  const [inputValue, setInputValue] = useState<InputFormValue>();

  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    const formNode = formRef?.current;
    if (formNode) {
      setValidity(checkValidityOfFormData(getArrayOfElement(formNode)));
    }
  }, [open]);

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
        disable: !!(validity?.length || validity === undefined),
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
        ref={formRef}
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
            asteriskColor='--primary-color'
            setValidity={setValidity}
            setInputValue={setInputValue}
          />
        ))}
      </form>
    </Modal>
  );
}

export default FormDialog;
