import worksData from './worksData';

type List<T> = T[];

type WorkData = {
  title: string;
  description: string;
  picture?: string;
  skills: {
    markup?: string[];
    script?: string[];
    style?: string[];
    test?: string[];
    support: string[];
  };
  links: never[];
};

type WorkList<T> = {
  [K in keyof T]: K extends 'skills' ? string[] : T[K];
};

export type WorksData = List<WorkData>;
type WorksList = List<WorkList<WorkData>>;

export type Slide = {
  current: number;
  new: number;
  loopSlide: boolean;
};

function extractList(slide?: 'card'): WorksList {
  return worksData
    .filter((value) => (!slide ? value.picture !== undefined : !value.picture))
    .map((value) => {
      const arr = [
        ...(value.skills.markup ? value.skills.markup : []),
        ...(value.skills.script ? value.skills.script : []),
        ...(value.skills.style ? value.skills.style : []),
        ...(value.skills.test ? value.skills.test : []),
        ...value.skills.support,
      ];
      return { ...value, skills: arr };
    });
}

export const slidesList: WorksList = extractList();
export const cardsList: WorksList = extractList('card');
