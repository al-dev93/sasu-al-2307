import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import { START, State } from '../../../../utils/stateData';
import { Slide, slidesList } from '../../../../utils/worksList';

type ScrollButtonsProps = {
  slide: Slide;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

function ScrollButtons({ slide, setSlide, setState }: ScrollButtonsProps): JSX.Element {
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setState(START);
    const target = e.currentTarget.dataset.icon;
    const maxLength = slidesList.length - 1;
    const onLoop =
      (slide.new === maxLength && target === 'chevron-right') ||
      (slide.new === 0 && target === 'chevron-left');

    if (slide.new >= 0 && slide.new <= maxLength && !onLoop) {
      setSlide((prev) => ({
        loopSlide: false,
        current: prev.new,
        new: prev.new + (target === 'chevron-right' ? 1 : -1),
      }));
      return;
    }
    setSlide((prev) => ({
      loopSlide: onLoop,
      current: prev.new,
      new: slide.new === 0 ? maxLength : 0,
    }));
  };

  return (
    <div className={style.scrollButtons}>
      <FontAwesomeIcon
        className={style.scrollButton}
        icon={icon({ name: 'chevron-left' })}
        onClick={handleClick}
      />
      <FontAwesomeIcon
        className={style.scrollButton}
        icon={icon({ name: 'chevron-right' })}
        onClick={handleClick}
      />
    </div>
  );
}

export default ScrollButtons;
