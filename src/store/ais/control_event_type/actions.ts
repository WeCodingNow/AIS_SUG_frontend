import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getControlEventType, getControlEventTypes } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getControlEventType,
    getControlEventTypes,
  },
  store.dispatch,
);
