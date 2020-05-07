import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getContacts } from './thunks';
// import * as thunks from './thunks';
// import * as creators from './creators';

export default bindActionCreators(
  {
    getContacts,
  },
  store.dispatch,
);
