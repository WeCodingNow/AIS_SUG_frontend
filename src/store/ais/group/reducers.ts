import { GroupState, GroupActionTypes, PUT_GROUP, CHANGE_GROUP, CHANGE_LOADING_GROUP } from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: GroupState = {
  byID: {},
};

export default function groupReducer(
  state: GroupState = initialState,
  action: GroupActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_GROUP:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_GROUP:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_GROUP:
      return {
        ...state,
        loading: action.state,
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
