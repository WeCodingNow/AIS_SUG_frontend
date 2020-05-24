import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import aisReducer from './ais/reducer';
import meReducer from './me/reducer';
import adminReducer from './admin/reducers';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  blacklist: ['tokenSet'],
  storage,
};

const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ais: aisReducer,
  me: meReducer,
  admin: adminReducer,
});

export default reducer;
