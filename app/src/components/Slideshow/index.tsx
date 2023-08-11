import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import SlideshowDots from '../SlideshowDots';
import SkillsList from '../SkillsList';
import Fade from '../Fade';
import { State, START, STOP, PENDING } from '../../utils/stateData';
import { Slide, slidesList } from '../../utils/worksList';
import PicturesScroller from '../PicturesScroller';
import ScrollButtons from '../ScrollButtons';

const slidesIndex = [...slidesList.keys()];

function Slideshow(): JSX.Element {
  const [slide, setSlide] = useState<Slide>({ current: 0, new: 0, loopSlide: false });
  const [state, setState] = useState<State>(STOP);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (state === START) {
      timer = setTimeout(() => setState(PENDING), 300);
    }
    if (state === PENDING) {
      timer = setTimeout(() => setState(STOP), 300);
    }
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <article className={style.slideshow}>
      <div className={style.picturesScrollerWrapper}>
        <ScrollButtons slide={slide} setSlide={setSlide} setState={setState} />
        <PicturesScroller slide={slide} setSlide={setSlide} state={state} />
        <SlideshowDots
          slidesIndex={slidesIndex}
          active={slide.new}
          setSlide={setSlide}
          setState={setState}
        />
      </div>
      <Fade state={state} slide={slide}>
        <div className={style.slideshowWrapper}>
          <header className={style.header}>
            <h3>{slidesList[state === START ? slide.current : slide.new].title}</h3>
          </header>
          <p className={style.description}>
            {slidesList[state === START ? slide.current : slide.new].description}
          </p>
          <footer className={style.footer}>
            <SkillsList list={slidesList[state === START ? slide.current : slide.new].skills} />
          </footer>
        </div>
      </Fade>
    </article>
  );
}

export default Slideshow;
