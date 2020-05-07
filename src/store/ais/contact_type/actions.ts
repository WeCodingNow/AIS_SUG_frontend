import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getContactType, getContactTypes } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getContactType,
    getContactTypes,
  },
  store.dispatch,
);
