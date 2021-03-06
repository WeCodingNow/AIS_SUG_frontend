import { bindActionCreators } from 'redux';

import { store } from '../store';
import { tokenSetSuccess } from './creators';
import { login, logout } from './thunks';

export default bindActionCreators(
  {
    tokenSetSuccess,
    login,
    logout,
  },
  store.dispatch,
);
