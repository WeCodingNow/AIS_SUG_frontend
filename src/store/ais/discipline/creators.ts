import { DisciplineActionTypes, Discipline, PureDiscipline, PUT_DISCIPLINE, CHANGE_DISCIPLINE } from './types';

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
