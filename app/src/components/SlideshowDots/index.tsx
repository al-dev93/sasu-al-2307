import React from 'react';
import style from './style.module.css';

type SlideshowDotsProps = {
  slidesIndex: number[];
  onScreen: number;
  setSlide: React.Dispatch<React.SetStateAction<number>>;
};

function SlideshowDots({ slidesIndex, onScreen, setSlide }: SlideshowDotsProps): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLDivElement> | undefined) => console.log(e);
  return (
    <div className={style.slideshowDots}>
      {slidesIndex.map((value, index) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={value}
          className={`${style.dot} ${onScreen === value ? style.onScreen : style.notOnScreen}`}
          onClick={() => setSlide(index)}
        />
      ))}
    </div>
  );
}

export default SlideshowDots;
