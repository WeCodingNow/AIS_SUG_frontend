import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillControlEventType, fillControlEventTypes } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillControlEventType,
    fillControlEventTypes,
  },
  store.dispatch,
);
