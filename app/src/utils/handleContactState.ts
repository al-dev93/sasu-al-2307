import { Validity } from '../types/formTypes';

/**
 * @description
 * @param state
 * @param id
 * @param index
 * @returns
 */
function findStateIndex(state: Validity[], id: string, index = 0): number {
  if (index < state.length) {
    if (state[index].name === id) {
      return index;
    }
    return findStateIndex(state, id, index + 1) ?? -1;
  }
  return -1;
}

// export function getStateByIndex(state: Validity[], id: string): Validity | undefined {
//   const index = findStateIndex(state, id);
//   return index > -1 ? state[index] : undefined;
// }

/**
 * @description
 * @param state
 * @param element
 * @returns
 */
function addToState(state: Validity[], element?: Validity): Validity[] {
  return element ? [...state, element] : state;
}

/**
 * @description
 * @param state
 * @param index
 * @param value
 * @returns
 */
function editStateRecord(state: Validity[], index: number, value: Validity): Validity[] {
  const draft = [...state];
  draft[index] = value;
  return draft;
}

/**
 * @description
 * @param state
 * @param index
 * @returns
 */
function removeStateRecord(state: Validity[], index: number): Validity[] {
  return (function iterateState(draft: Validity[] = [], iterator = 0): Validity[] {
    if (iterator < state.length) {
      // eslint-disable-next-line no-param-reassign
      if (iterator !== index) draft = draft ? [...draft, state[iterator]] : [state[iterator]];
      return iterateState(draft, iterator + 1);
    }
    return draft;
  })();
}

/**
 * @description
 * @param setState
 * @param id
 * @param newValue
 */
function updateStateValidity(
  setState: React.Dispatch<React.SetStateAction<Validity[]>> | undefined,
  id: string,
  newValue?: Validity,
): void {
  setState?.((state) => {
    const index = findStateIndex(state, id);
    if (index > -1)
      return newValue ? editStateRecord(state, index, newValue) : removeStateRecord(state, index);
    return addToState(state, newValue);
  });
}

export default updateStateValidity;
