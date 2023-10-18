import React, { useState } from 'react';
import style from './style.module.css';

type TooltipProps = {
  children: React.ReactNode;
  content: JSX.Element | string;
  delay?: number;
  direction?: 'bottom' | 'left' | 'right' | 'top';
};

/**
 * @description
 * @param props
 * @returns
 */
function Tooltip({ children, content, delay = 400, direction = 'top' }: TooltipProps) {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  /**
   * @description
   * @returns void
   */
  const showTip = (): void => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  /**
   * @description
   * @returns void
   */
  const hideTip = (): void => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={style.tooltipWrapper}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <div className={`${style.tooltipTip} ${style[direction]}`}>{content}</div>}
    </div>
  );
}

export default Tooltip;
