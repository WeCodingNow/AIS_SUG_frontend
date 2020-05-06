import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import aisReducer from './ais/reducer';

const reducer = combineReducers({
  auth: authReducer,
  ais: aisReducer,
});

export default reducer;
