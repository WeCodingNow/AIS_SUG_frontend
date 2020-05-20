import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureControlEvent {
  date: Date;

  disciplineID: number;
  semesterID: number;
  markIDs: Array<number>;
}

export interface ControlEvent extends Model, PureControlEvent {}

export const toControlEvent = (data: any): ControlEvent => ({
  id: data['id'],
  date: data['date'],

  disciplineID: data['discipline']['id'],
  semesterID: data['semester']['id'],
  markIDs: data['marks'].map((m: any) => m['id']),
});

export interface ControlEventState extends ModelState<ControlEvent>, Loadable {}

export const PUT_CONTROL_EVENT = 'PUT_CONTROL_EVENT';
interface PutControlEvent extends Action<typeof PUT_CONTROL_EVENT> {
  payload: ControlEvent;
}

export const CHANGE_CONTROL_EVENT = 'CHANGE_CONTROL_EVENT';
interface ChangeControlEvent extends Action<typeof CHANGE_CONTROL_EVENT> {
  payload: ChangeAction<PureControlEvent>;
}

export const CHANGE_LOADING_CONTROL_EVENT = 'CHANGE_LOADING_CONTROL_EVENT';
export type ChangeLoadingSemester = LoadingAction<typeof CHANGE_LOADING_CONTROL_EVENT>;

export type ControlEventActionTypes = PutControlEvent | ChangeControlEvent | ChangeLoadingSemester;
