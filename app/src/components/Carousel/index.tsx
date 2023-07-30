import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import worksData from '../../utils/worksData';
import SkillsList from '../SkillsList';
import SlideshowDots from '../SlideshowDots';

const slidesList = worksData.filter((value) => value.picture !== undefined);
const slidesIndex = [...slidesList.keys()];

function Carousel(): JSX.Element {
  const [slide, setSlide] = useState<number>(0);
  const slideshowSliderStyle = {
    transform: `translate3d(${-slide * 100}%, 0, 0)`,
  };
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    const target = e.currentTarget.dataset.icon;
    if (target === 'chevron-right') {
      if (slide < slidesList.length - 1) setSlide(slide + 1);
      else setSlide(0);
      return;
    }
    if (target === 'chevron-left') {
      if (slide > 0) setSlide(slide - 1);
      else setSlide(slidesList.length - 1);
    }
  };

  return (
    <article className={style.carousel}>
      <header className={style.header}>
        <h3>{slidesList[slide].title}</h3>
      </header>
      <div className={style.slideshowWrapper}>
        <FontAwesomeIcon
          className={`${style.scrollButton} ${style.backward}`}
          icon={icon({ name: 'chevron-left' })}
          onClick={handleClick}
        />
        <FontAwesomeIcon
          className={`${style.scrollButton} ${style.ahead}`}
          icon={icon({ name: 'chevron-right' })}
          onClick={handleClick}
        />
        <div className={style.slideshow}>
          <div className={style.slideshowSlider} style={slideshowSliderStyle}>
            {slidesList.map((value, index) => (
              <div key={`${index + 1}`} className={style.slide}>
                <img className={style.image} src={value.picture} alt='' />
              </div>
            ))}
          </div>
        </div>
        <SlideshowDots slidesIndex={slidesIndex} onScreen={slide} setSlide={setSlide} />
      </div>
      <p className={style.description}>{slidesList[slide].description}</p>
      <footer className={style.footer}>
        <SkillsList list={slidesList[slide].skills} />
      </footer>
    </article>
  );
}

export default Carousel;
