import React, { useEffect, useRef } from 'react';
import style from './style.module.css';
import { Slide, slidesList } from '../../../../utils/worksList';
import { STOP, State } from '../../../../utils/stateData';

type PicturesScrollerProps = {
  slide: Slide;
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
function PicturesScroller({ slide, state, duration = 600 }: PicturesScrollerProps): JSX.Element {
  const intitialSlideStyle = {
    transform: `translateX(-100%)`,
    transition: `none`,
  };
  const slideEffectStyle = useRef<SlideStyle>(intitialSlideStyle);

  /**
   * @description
   */
  useEffect(() => {
    if (slide.loopSlide && state === STOP)
      slideEffectStyle.current = {
        transform: `translateX(${-(slide.new + 1) * 100}%)`,
        transition: 'none',
      };
  }, [slide, state]);
  /**
   * @description
   */
  useEffect(() => {
    const offsetSlide = () => {
      if (slide.new === 0 && slide.loopSlide) return -(slidesList.length + 1);
      if (slide.new === slidesList.length - 1 && slide.loopSlide) return slidesList.length - 1;
      return -1;
    };
    slideEffectStyle.current = {
      transform: `translateX(${(-slide.new + offsetSlide()) * 100}%)`,
      transition: `ease ${duration}ms`,
    };
  }, [duration, slide]);

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        <div className={style.slide}>
          <img className={style.picture} src={slidesList[slidesList.length - 1].picture} alt='' />
        </div>
        {slidesList.map((value, index) => (
          <div key={`${index + 1}`} className={style.slide}>
            <img className={style.picture} src={value.picture} alt='' />
          </div>
        ))}
        <div className={style.slide}>
          <img className={style.picture} src={slidesList[0].picture} alt='' />
        </div>
      </div>
    </div>
  );
}

export default PicturesScroller;
