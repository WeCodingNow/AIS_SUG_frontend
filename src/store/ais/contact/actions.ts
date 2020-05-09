import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillContact, fillContacts } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillContact,
    fillContacts,
  },
  store.dispatch,
);
