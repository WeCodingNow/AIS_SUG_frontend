import {
  ResidenceState,
  ResidenceActionTypes,
  PUT_RESIDENCE,
  CHANGE_RESIDENCE,
  CHANGE_LOADING_RESIDENCE,
} from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: ResidenceState = {
  byID: {},
};

export default function residenceReducer(
  state: ResidenceState = initialState,
  action: ResidenceActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_RESIDENCE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_RESIDENCE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_RESIDENCE:
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
