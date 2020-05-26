import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import headmanViewsReducer from './headman/reducers';
import studentViewsReducer from './student/reducers';

const headmanPersistConfig = {
  key: 'head',
  blacklist: ['own'],
  storage,
};

const headmanReducer = persistReducer(
  headmanPersistConfig,
  combineReducers({
    students: headmanViewsReducer,
  }),
);

const viewsPersistorConfig = {
  key: 'views',
  blacklist: ['headman'],
  storage,
};

const studentPersistConfig = {
  key: 'stud',
  blacklist: ['own'],
  storage,
};

const studentReducer = persistReducer(studentPersistConfig, combineReducers({ university: studentViewsReducer }));

const viewsReducer = persistReducer(
  viewsPersistorConfig,
  combineReducers({
    headman: headmanReducer,
    student: studentReducer,
    // headman: persistReducer(headmanPersistConfig, headmanViewsReducer),
  }),
);

export default viewsReducer;
