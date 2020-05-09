import {
  ControlEventTypeActionTypes,
  ControlEventType,
  PureControlEventType,
  PUT_CONTROL_EVENT_TYPE,
  CHANGE_CONTROL_EVENT_TYPE,
  CHANGE_LOADING_CONTROL_EVENT_TYPE,
} from './types';
import { LoadingState } from '../../loading/types';

export const putControlEventType = (controlEventType: ControlEventType): ControlEventTypeActionTypes => ({
  type: PUT_CONTROL_EVENT_TYPE,
  payload: controlEventType,
});

export const changeControlEventType = (
  id: number,
  controlEventType: PureControlEventType,
): ControlEventTypeActionTypes => ({
  type: CHANGE_CONTROL_EVENT_TYPE,
  payload: {
    id,
    model: controlEventType,
  },
});

export const changeControlEventTypeLoadingState = (state: LoadingState): ControlEventTypeActionTypes => ({
  type: CHANGE_LOADING_CONTROL_EVENT_TYPE,
  state: state,
});
