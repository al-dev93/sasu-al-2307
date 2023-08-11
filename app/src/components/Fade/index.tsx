import React from 'react';
import style from './style.module.css';
import { STOP, State } from '../../utils/stateData';
import { Slide } from '../../utils/worksList';

type FadeProps = {
  children: JSX.Element;
  state: State;
  slide: Slide;
  duration?: number;
};

function Fade({ children, state, slide, duration = 600 }: FadeProps): JSX.Element {
  const animationDuration = slide.loopSlide ? `${duration * 1.5}ms` : `${duration}ms`;
  const className = `${state === STOP ? '' : style.fade}`;
  return (
    <div className={className} style={{ animationDuration }}>
      {children}
    </div>
  );
}

export default Fade;
