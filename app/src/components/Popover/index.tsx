import React from 'react';
import style from './style.module.css';

type PopoverProps = {
  message?: string;
};

function Popover({ message }: PopoverProps) {
  return message?.length ? <p className={style.popoverWrapper}>{message}</p> : null;
}

export default Popover;
