import { bindActionCreators } from 'redux';

import { store } from '../store';
// import * as thunks from './thunks';
import { login, logout } from './thunks';
// import { logout } from './creators';

// creators.
export default bindActionCreators(
  {
    login,
    logout,
  },
  store.dispatch,
);
