import { combineReducers } from 'redux';

import headmanViewsReducer from './headman/reducers';

const viewsReducer = combineReducers({
  headman: headmanViewsReducer,
});

export default viewsReducer;
