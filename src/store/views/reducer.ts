import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import headmanViewsReducer from './headman/reducers';

const headmanPersistConfig = {
  key: 'head',
  blacklist: ['own'],
  storage,
};

const viewsReducer = combineReducers({
  headman: persistReducer(headmanPersistConfig, headmanViewsReducer),
});

export default viewsReducer;
