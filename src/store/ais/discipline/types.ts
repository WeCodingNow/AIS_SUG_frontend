import { Action } from 'redux';
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

interface PutDiscipline extends Action<typeof PUT_DISCIPLINE> {
  payload: Discipline;
}

interface ChangeDiscipline extends Action<typeof CHANGE_DISCIPLINE> {
  payload: ChangeAction<PureDiscipline>;
}

export type DisciplineActionTypes = PutDiscipline | ChangeDiscipline;
