import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

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
  markIDs: data['semester']['marks'].map((m: any) => m['id']),
});

export type ControlEventState = HashTable<ControlEvent>;

export const PUT_CONTROL_EVENT = 'PUT_CONTROL_EVENT';
export const CHANGE_CONTROL_EVENT = 'CHANGE_CONTROL_EVENT';

interface PutControlEvent extends Action<typeof PUT_CONTROL_EVENT> {
  payload: ControlEvent;
}

interface ChangeControlEvent extends Action<typeof CHANGE_CONTROL_EVENT> {
  payload: ChangeAction<PureControlEvent>;
}

export type ControlEventActionTypes = PutControlEvent | ChangeControlEvent;
