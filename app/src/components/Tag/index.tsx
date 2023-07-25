import React from 'react';
import style from './style.module.css';
import bullet from '../../assets/icons/arrow_right_outline_secondary_color.svg';

type TagProps = {
  tag: string;
  bulleted?: boolean;
  filled?: boolean;
};

function Tag({ tag, bulleted = false, filled = false }: TagProps): JSX.Element {
  return (
    <div className={filled ? style.tagWrapper : undefined}>
      <div className={`${style.tagBody} ${bulleted ? style.bulletedTag : style.unbulletedTag}`}>
        {bulleted && <img src={bullet} alt='arrow bullet' />}
        <span className={style.tagName}>{tag}</span>
      </div>
    </div>
  );
}

export default Tag;
