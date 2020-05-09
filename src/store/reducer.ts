import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import aisReducer from './ais/reducer';
import roleReducer from './role/reducer';

const reducer = combineReducers({
  auth: authReducer,
  ais: aisReducer,
  role: roleReducer,
});

export default reducer;
