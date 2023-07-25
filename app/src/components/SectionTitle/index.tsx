import React from 'react';
import style from './style.module.css';
import titleLine from '../../assets/icons/title_line.svg';

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps): JSX.Element {
  return (
    <div className={style.titleWrapper}>
      <h2>{title}</h2>
      <img src={titleLine} alt='line' />
    </div>
  );
}

export default SectionTitle;
