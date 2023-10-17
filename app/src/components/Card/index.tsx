import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import style from './style.module.css';
import SkillsList from '../SkillsList';

type CardProps = {
  title: string;
  description: string;
  list: string[];
};

/**
 * @description
 * @param param0
 * @returns
 */
function Card({ title, description, list }: CardProps): JSX.Element {
  return (
    <article className={style.card}>
      <header className={style.cardHeader}>
        <FontAwesomeIcon className={style.folderIcon} icon={icon({ name: 'folder-open' })} />
      </header>
      <div className={style.cardMain}>
        <h3>{title}</h3>
        <p className={style.cardDescription}>{description}</p>
      </div>
      <footer className={style.cardFooter}>
        <SkillsList type='wrapp' list={list} />
      </footer>
    </article>
  );
}

export default Card;
