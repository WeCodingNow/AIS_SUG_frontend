import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureControlEventType {
  def: string;
}

export interface ControlEventType extends Model, PureControlEventType {}

export const toControlEventType = (data: any): ControlEventType => ({
  id: data['id'],
  def: data['def'],
});

export type ControlEventTypeState = HashTable<ControlEventType>;

export const PUT_CONTROL_EVENT_TYPE = 'PUT_CONTROL_EVENT_TYPE';
export const CHANGE_CONTROL_EVENT_TYPE = 'CHANGE_CONTROL_EVENT_TYPE';

interface PutControlEventType extends Action<typeof PUT_CONTROL_EVENT_TYPE> {
  payload: ControlEventType;
}

interface ChangeControlEventType extends Action<typeof CHANGE_CONTROL_EVENT_TYPE> {
  payload: ChangeAction<PureControlEventType>;
}

export type ControlEventTypeActionTypes = PutControlEventType | ChangeControlEventType;
