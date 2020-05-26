import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/reducers';
import aisReducer from './ais/reducer';
import meReducer from './me/reducer';
import adminReducer from './admin/reducers';

import viewsReducer from './views/reducer';

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
  view: viewsReducer,
});

export default reducer;
