import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getContacts } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getContacts,
  },
  store.dispatch,
);
