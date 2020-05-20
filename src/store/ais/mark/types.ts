import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

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

export interface MarkState extends ModelState<Mark>, Loadable {}

export const PUT_MARK = 'PUT_MARK';
interface PutMark extends Action<typeof PUT_MARK> {
  payload: Mark;
}

export const CHANGE_MARK = 'CHANGE_MARK';
interface ChangeMark extends Action<typeof CHANGE_MARK> {
  payload: ChangeAction<PureMark>;
}

export const CHANGE_LOADING_MARK = 'CHANGE_LOADING_MARK';
export type ChangeLoadingMark = LoadingAction<typeof CHANGE_LOADING_MARK>;

export type MarkActionTypes = PutMark | ChangeMark | ChangeLoadingMark;
