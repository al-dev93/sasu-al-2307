import React from 'react';
import style from './style.module.css';
import { START, State } from '../../../../utils/stateData';
import { Slide } from '../../../../utils/worksList';

type SlideshowDotsProps = {
  slidesIndex: number[];
  active: number;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

/**
 * @description
 * @param param0
 * @returns
 */
function SlideshowDots({
  slidesIndex,
  active,
  setSlide,
  setState,
}: SlideshowDotsProps): JSX.Element {
  /**
   * @description
   * @param value
   */
  const handleClick = (value: number): void => {
    setState(START);
    setSlide((prev) => ({
      current: prev.new,
      new: value,
      loopSlide: Math.abs(value - active) === slidesIndex.length - 1,
    }));
  };

  return (
    <div className={style.slideshowDots}>
      {slidesIndex.map((value) => (
        <div
          key={value}
          className={`${style.dot} ${active === value ? style.active : style.notActive}`}
          onClick={() => handleClick(value)}
          role='presentation'
        />
      ))}
    </div>
  );
}

export default SlideshowDots;
