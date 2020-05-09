import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureControlEventType {
  def: string;
}

export interface ControlEventType extends Model, PureControlEventType {}

export const toControlEventType = (data: any): ControlEventType => ({
  id: data['id'],
  def: data['def'],
});

export interface ControlEventTypeState extends ModelState<ControlEventType>, Loadable {}

export const PUT_CONTROL_EVENT_TYPE = 'PUT_CONTROL_EVENT_TYPE';
interface PutControlEventType extends Action<typeof PUT_CONTROL_EVENT_TYPE> {
  payload: ControlEventType;
}

export const CHANGE_CONTROL_EVENT_TYPE = 'CHANGE_CONTROL_EVENT_TYPE';
interface ChangeControlEventType extends Action<typeof CHANGE_CONTROL_EVENT_TYPE> {
  payload: ChangeAction<PureControlEventType>;
}

export const CHANGE_LOADING_CONTROL_EVENT_TYPE = 'CHANGE_LOADING_CONTROL_EVENT_TYPE';
export type ChangeLoadingControlEventType = LoadingAction<typeof CHANGE_LOADING_CONTROL_EVENT_TYPE>;

export type ControlEventTypeActionTypes = PutControlEventType | ChangeControlEventType | ChangeLoadingControlEventType;
