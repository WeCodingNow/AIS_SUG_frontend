import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureMark {
  date: Date;
  value: number;

  controlEventID: number;
  studentID: number;
}

export interface Mark extends Model, PureMark {}

export const toMark = (data: any): Mark => ({
  id: data['id'],
  date: data['date'],
  value: data['value'],

  controlEventID: data['control_event']['id'],
  studentID: data['student']['id'],
});

export type MarkState = HashTable<Mark>;

export const PUT_MARK = 'PUT_MARK';
export const CHANGE_MARK = 'CHANGE_MARK';

interface PutMark extends Action<typeof PUT_MARK> {
  payload: Mark;
}

interface ChangeMark extends Action<typeof CHANGE_MARK> {
  payload: ChangeAction<PureMark>;
}

export type MarkActionTypes = PutMark | ChangeMark;
