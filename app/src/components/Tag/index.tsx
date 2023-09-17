import React from 'react';
import style from './style.module.css';

type TagProps = {
  tag: string;
  type: 'row' | 'wrapp' | 'table' | 'error';
  position?: React.CSSProperties;
};

function Tag({ tag, type, position }: TagProps): JSX.Element {
  return (
    <span
      className={`${style.tag} ${type === 'row' && style.filled}
        ${type === 'table' && `${style.thinned} ${style.bulleted}`}
        ${type === 'error' && `${style.thinned} ${style.error}`}`}
      style={position}
    >
      {tag}
    </span>
  );
}

export default Tag;
