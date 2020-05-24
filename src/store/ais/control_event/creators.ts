import {
  ControlEventActionTypes,
  ControlEvent,
  PureControlEvent,
  PUT_CONTROL_EVENT,
  CHANGE_CONTROL_EVENT,
  CHANGE_LOADING_CONTROL_EVENT,
} from './types';

import { LoadingState } from '../../loading/types';

export const putControlEvent = (controlEvent: ControlEvent): ControlEventActionTypes => ({
  type: PUT_CONTROL_EVENT,
  payload: controlEvent,
});

export const changeControlEvent = (id: number, controlEvent: PureControlEvent): ControlEventActionTypes => ({
  type: CHANGE_CONTROL_EVENT,
  payload: {
    id,
    model: controlEvent,
  },
});

export const changeControlEventLoadingState = (state: LoadingState): ControlEventActionTypes => ({
  type: CHANGE_LOADING_CONTROL_EVENT,
  state: state,
});
