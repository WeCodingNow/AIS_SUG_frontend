import { bindActionCreators } from 'redux';

import { store } from '../store';
import { login, logout } from './thunks';

export default bindActionCreators(
  {
    login,
    logout,
  },
  store.dispatch,
);
