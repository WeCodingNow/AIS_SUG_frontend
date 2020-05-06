import { Model, HashTable, ChangeAction } from '../types';

export interface PureMark {
  date: Date;
  value: number;

  controlEventID: number;
  studentID: number;
}

export interface Mark extends Model, PureMark {}

export type MarkState = HashTable<Mark>;

export const PUT_MARK = 'PUT_MARK';
export const CHANGE_MARK = 'CHANGE_MARK';

interface PutMark {
  type: typeof PUT_MARK;
  payload: Mark;
}

interface ChangeMark {
  type: typeof CHANGE_MARK;
  payload: ChangeAction<PureMark>;
}

export type MarkActionTypes = PutMark | ChangeMark;
