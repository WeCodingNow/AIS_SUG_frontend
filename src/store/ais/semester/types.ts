import { Model, HashTable, ChangeAction } from '../types';

export interface PureSemester {
  number: number;
  beginning: Date;
  end?: Date;

  groupIDs: Array<number>;
  controlEventIDs: Array<number>;
}

export interface Semester extends Model, PureSemester {}

export type SemesterState = HashTable<Semester>;

export const PUT_SEMESTER = 'PUT_SEMESTER';
export const CHANGE_SEMESTER = 'CHANGE_SEMESTER';

interface PutSemester {
  type: typeof PUT_SEMESTER;
  payload: Semester;
}

interface ChangeSemester {
  type: typeof CHANGE_SEMESTER;
  payload: ChangeAction<PureSemester>;
}

export type SemesterActionTypes = PutSemester | ChangeSemester;
