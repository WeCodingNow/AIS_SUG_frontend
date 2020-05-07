import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureSemester {
  number: number;
  beginning: Date;
  end?: Date;

  groupIDs: Array<number>;
  controlEventIDs: Array<number>;
}

export interface Semester extends Model, PureSemester {}

export const toSemester = (data: any): Semester => ({
  id: data['id'],
  number: data['number'],
  beginning: data['beginning'],
  end: data['end'],

  groupIDs: data['groups'].map((g: any) => g['id']),
  controlEventIDs: data['groups']
    .flatMap((g: any) => g['students'])
    .flatMap((st: any) => st['marks'])
    .map((m: any) => m['control_event']['id']),
});

export type SemesterState = HashTable<Semester>;

export const PUT_SEMESTER = 'PUT_SEMESTER';
export const CHANGE_SEMESTER = 'CHANGE_SEMESTER';

interface PutSemester extends Action<typeof PUT_SEMESTER> {
  payload: Semester;
}

interface ChangeSemester extends Action<typeof CHANGE_SEMESTER> {
  payload: ChangeAction<PureSemester>;
}

export type SemesterActionTypes = PutSemester | ChangeSemester;
