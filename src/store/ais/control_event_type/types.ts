import { Model, HashTable, ChangeAction } from '../types';

export interface PureControlEventType {
  def: string;
}

export interface ControlEventType extends Model, PureControlEventType {}

export type ControlEventTypeState = HashTable<ControlEventType>;

export const PUT_CONTROL_EVENT_TYPE = 'PUT_CONTROL_EVENT_TYPE';
export const CHANGE_CONTROL_EVENT_TYPE = 'CHANGE_CONTROL_EVENT_TYPE';

interface PutControlEventType {
  type: typeof PUT_CONTROL_EVENT_TYPE;
  payload: ControlEventType;
}

interface ChangeControlEventType {
  type: typeof CHANGE_CONTROL_EVENT_TYPE;
  payload: ChangeAction<PureControlEventType>;
}

export type ControlEventTypeActionTypes = PutControlEventType | ChangeControlEventType;
