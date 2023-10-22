import React, { useEffect, useRef } from 'react';
import style from './style.module.css';

type PopoverProps = {
  errorMessage?: string;
  fillList?: string[];
  firstItemFocused?: boolean;
  prevFocusNode?: HTMLInputElement | HTMLTextAreaElement | null;
  putAutocompleteInInput: (newValue: string) => void;
};

/**
 * @description
 * @param param0
 * @returns JSX Element
 */
function Popover({
  errorMessage,
  fillList,
  firstItemFocused,
  prevFocusNode,
  putAutocompleteInInput,
}: PopoverProps): JSX.Element | null {
  const activeItem = useRef<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const ulNode = ulRef.current;

  /**
   * @description
   * @param count
   * @returns
   */
  const setActiveItem = (count: boolean) => {
    if (fillList && activeItem.current > 0 && activeItem.current < fillList.length - 1)
      activeItem.current += count ? 1 : -1;
    else if (fillList && activeItem.current === 0)
      activeItem.current = count ? activeItem.current + 1 : fillList.length - 1;
    else if (fillList && activeItem.current === fillList.length - 1)
      activeItem.current = count ? 0 : activeItem.current - 1;
    return fillList && fillList?.length > 1
      ? ulNode?.children.item(activeItem.current)
      : ulNode?.children.item(0);
  };

  /**
   * @description
   * @param event
   * @returns
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      (setActiveItem(event.code === 'ArrowDown') as HTMLLIElement).focus();
      return;
    }
    if (event.code === 'Escape') {
      prevFocusNode?.focus();
      return;
    }
    if (event.code === 'Enter') {
      putAutocompleteInInput(event.currentTarget.textContent ?? '');
    }
  };

  /**
   * @description
   * @param event
   */
  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    putAutocompleteInInput(event.currentTarget.textContent ?? '');
  };

  /**
   * @description
   */
  useEffect(() => {
    if (firstItemFocused === undefined) return;
    if (ulNode?.childElementCount) {
      const focusProperty = firstItemFocused ? 'first' : 'last';
      activeItem.current = firstItemFocused ? 0 : ulNode.childElementCount - 1;
      (ulNode[`${focusProperty}ElementChild`] as HTMLLIElement).focus();
    }
  }, [firstItemFocused, ulNode]);

  return (
    ((errorMessage || !!fillList?.length) && (
      <div className={style.popoverWrapper}>
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        <div className={`${style.autocompleteWrapper} ${!fillList ? style.disable : ''}`}>
          <span className={style.borderTopList} />
          <ul className={style.listAutocomplete} ref={ulRef}>
            {fillList?.map((value, index) => (
              <li
                key={`${value}${index + 1}`}
                className={style.popoverItem}
                role='presentation'
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                onMouseDown={handleClick}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )) ||
    null
  );
}

export default Popover;
