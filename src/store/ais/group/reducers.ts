import { GroupState, GroupActionTypes, PUT_GROUP, CHANGE_GROUP } from './types';

const initialState: GroupState = {};

export function GroupReducer(state: GroupState = initialState, action: GroupActionTypes) {
  switch (action.type) {
    case PUT_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_GROUP:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
