import { Action } from 'redux';
import { Model, ChangeAction, ModelState } from '../types';
import { LoadingAction, Loadable } from '../../loading/types';

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

export interface SemesterState extends ModelState<Semester>, Loadable {}

export const PUT_SEMESTER = 'PUT_SEMESTER';
interface PutSemester extends Action<typeof PUT_SEMESTER> {
  payload: Semester;
}

export const CHANGE_SEMESTER = 'CHANGE_SEMESTER';
interface ChangeSemester extends Action<typeof CHANGE_SEMESTER> {
  payload: ChangeAction<PureSemester>;
}

export const CHANGE_LOADING_SEMESTER = 'CHANGE_LOADING_SEMESTER';
export type ChangeLoadingSemester = LoadingAction<typeof CHANGE_LOADING_SEMESTER>;

export type SemesterActionTypes = PutSemester | ChangeSemester | ChangeLoadingSemester;
