import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getContact, getContacts } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getContact,
    getContacts,
  },
  store.dispatch,
);
