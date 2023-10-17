import React from 'react';
import style from './style.module.css';
import Tag from '../Tag';

type SkillsListProps = {
  list: string[];
  type?: 'row' | 'wrapp' | 'table';
};

/**
 * @description
 * @param param0
 * @returns
 */
function SkillsList({ list, type = 'row' }: SkillsListProps): JSX.Element {
  const listStyle: string =
    type === 'wrapp' ? `${style['skills-row']} ${style['wrapp-row']}` : style[`skills-${type}`];

  return (
    <ul className={listStyle}>
      {list.map((value, index) => (
        <li key={`${index + 1}`}>
          <Tag tag={value} type={type} />
        </li>
      ))}
    </ul>
  );
}

export default SkillsList;
