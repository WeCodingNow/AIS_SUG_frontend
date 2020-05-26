import { ResidenceState, BacklogActionTypes, PUT_BACKLOG, CHANGE_BACKLOG, CHANGE_LOADING_BACKLOG } from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: ResidenceState = {
  byID: {},
};

export default function residenceReducer(
  state: ResidenceState = initialState,
  action: BacklogActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_BACKLOG:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_BACKLOG:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_BACKLOG:
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
