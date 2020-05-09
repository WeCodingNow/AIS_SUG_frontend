import {
  DisciplineActionTypes,
  Discipline,
  PureDiscipline,
  PUT_DISCIPLINE,
  CHANGE_DISCIPLINE,
  CHANGE_LOADING_DISCIPLINE,
} from './types';
import { LoadingState } from '../../loading/types';

export const putDiscipline = (discipline: Discipline): DisciplineActionTypes => ({
  type: PUT_DISCIPLINE,
  payload: discipline,
});

export const changeDiscipline = (id: number, discipline: PureDiscipline): DisciplineActionTypes => ({
  type: CHANGE_DISCIPLINE,
  payload: {
    id,
    model: discipline,
  },
});

export const changeDisciplineLoadingState = (state: LoadingState): DisciplineActionTypes => ({
  type: CHANGE_LOADING_DISCIPLINE,
  state: state,
});
