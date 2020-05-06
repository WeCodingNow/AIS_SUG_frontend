import { Model, HashTable, ChangeAction } from '../types';

export interface PureDiscipline {
  name: string;
  hours: number;

  controlEventIDs: Array<number>;
}

export interface Discipline extends Model, PureDiscipline {}

export type DisciplineState = HashTable<Discipline>;

export const PUT_DISCIPLINE = 'PUT_DISCIPLINE';
export const CHANGE_DISCIPLINE = 'CHANGE_DISCIPLINE';

interface PutDiscipline {
  type: typeof PUT_DISCIPLINE;
  payload: Discipline;
}

interface ChangeDiscipline {
  type: typeof CHANGE_DISCIPLINE;
  payload: ChangeAction<PureDiscipline>;
}

export type DisciplineActionTypes = PutDiscipline | ChangeDiscipline;
