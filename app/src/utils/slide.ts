import worksData from './worksData';

export type Slide = {
  current: number;
  new: number;
  loopSlide: boolean;
};

export const slidesList = worksData.filter((value) => value.picture !== undefined);
