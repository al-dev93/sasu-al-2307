import React, { useEffect, useRef } from 'react';
import style from './style.module.css';
import { Slide, slidesList } from '../../../../utils/worksList';
import { START, STOP, State } from '../../../../utils/stateData';

type PicturesScrollerProps = {
  slide: Slide;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
  duration?: number;
  state: State;
};

type SlideStyle =
  | {
      transform: string;
      transition: string;
    }
  | undefined;

/**
 * @description
 * @param param0
 * @returns
 */
function PicturesScroller({
  slide,
  setSlide,
  state,
  duration = 600,
}: PicturesScrollerProps): JSX.Element {
  const slideEffectStyle: React.MutableRefObject<SlideStyle> = useRef();

  /**
   * @description
   */
  useEffect(() => {
    if (state === STOP && slide.loopSlide) {
      setSlide((prev) => ({ ...prev, loopOffset: false }));
      return;
    }
    if (state === START && slide.loopSlide) {
      slideEffectStyle.current = {
        transform: `translateX(${-slide.new * 100}%)`,
        transition: `cubic-bezier(1,0,0,1) ${duration * 1.5}ms`,
      };
      return;
    }
    slideEffectStyle.current = {
      transform: `translateX(${-slide.new * 100}%)`,
      transition: `ease ${duration}ms`,
    };
  }, [state, slide.loopSlide, slide.new, duration, setSlide]);

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        {slidesList.map((value, index, array) => (
          <div
            key={`${index + 1}`}
            className={
              index > 0 && index < array.length - 1 && slide.loopSlide
                ? `${style.slide} ${style.loopSlide}`
                : style.slide
            }
          >
            <img className={style.picture} src={value.picture} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PicturesScroller;
