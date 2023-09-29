import React from 'react';
import style from './style.module.css';

type PopoverProps = {
  message?: string;
  list?: string[];
};

function Popover({ message, list }: PopoverProps): JSX.Element | null {
  return (
    ((message?.length || list?.length) && (
      <div className={style.popoverWrapper}>
        {message?.length && <p className={style.errorMessage}>{message}</p>}
        {!!list?.length && (
          <div className={style.autocompleteWrapper}>
            <span className={style.borderTopList} />
            <ul className={style.listAutocomplete}>
              {list?.map((value, index) => <li key={`${value}${index + 1}`}>{value}</li>)}
            </ul>
          </div>
        )}
      </div>
    )) ||
    null
  );
}

export default Popover;
